// Live data source for Anthropic — Greenhouse's public Job Board API, called
// directly from the browser. Verified 2026-07-14: both endpoints below send
// `access-control-allow-origin: *`, so this needs no proxy/backend at all
// (see JobMarketBackend.md §Phase 1 for the verification notes and why the
// other 5 companies can't do this — no public/CORS-enabled API exists for
// them). This is genuinely the seam `getJobListings()` was built for, just
// scoped to the one company where a real live fetch is actually possible today.
import type { JobListing, JobQualifications } from './jobListings';
import type { JobSeekerPersonaId } from './personas';
import type { ExperienceLevel } from './experienceLevels';
import type { LocationRegion } from './locations';

const BOARD_TOKEN = 'anthropic';
const LIST_URL = `https://boards-api.greenhouse.io/v1/boards/${BOARD_TOKEN}/jobs`;
const jobDetailUrl = (id: number) => `https://boards-api.greenhouse.io/v1/boards/${BOARD_TOKEN}/jobs/${id}?content=true`;

// The list endpoint alone is ~300KB; with `content=true` on every job it's
// ~6MB (measured directly) — too heavy to fetch on every page load. Fetch the
// lightweight list first, classify by title, then fetch full content only for
// a bounded number of matches per persona.
const MAX_CANDIDATES_PER_PERSONA = 8;

interface GreenhouseListJob {
  id: number;
  title: string;
  absolute_url: string;
  location: { name: string };
  first_published?: string;
}

interface GreenhouseJobDetail extends GreenhouseListJob {
  content: string;
}

function classifyPersona(title: string): JobSeekerPersonaId | null {
  const t = title.toLowerCase();
  // Anthropic has no Mechanical Engineer roles — that persona intentionally
  // never matches here, same as the curated fallback data.
  if (t.includes('software engineer')) return 'sde';
  if (t.includes('product designer') || t.includes('ux designer')) return 'ux-designer';
  return null;
}

function classifyExperienceLevel(title: string): ExperienceLevel {
  const t = title.toLowerCase();
  if (t.includes('staff') || t.includes('principal')) return 'staff';
  if (t.includes('senior') || /\bsr\.?\b/.test(t)) return 'senior';
  if (t.includes('entry') || t.includes('new grad') || t.includes('intern')) return 'entry';
  return 'mid';
}

function classifyRegions(locationName: string): LocationRegion[] {
  const lower = locationName.toLowerCase();
  const regions: LocationRegion[] = [];
  if (lower.includes('san francisco') || lower.includes('bay area')) regions.push('sf-bay');
  if (lower.includes('new york')) regions.push('nyc');
  if (lower.includes('seattle')) regions.push('seattle');
  return regions;
}

/** Anthropic's postings use "You might be a good fit if..." / "Strong
 * candidates may also have..." headings followed by a `<ul>` — not literal
 * "Required"/"Preferred" the way Amazon's postings do. Walks a few siblings
 * past the matched heading looking for the first list, since a handful of
 * job templates wrap the list in an extra `<div>` first. Returns an empty
 * array (not a throw) when a section isn't found — some listings genuinely
 * only have the "good fit" list and no separate preferred one. */
function bulletsAfterHeading(doc: Document, headingMatch: string): string[] {
  const headings = Array.from(doc.querySelectorAll('h2, h3'));
  const heading = headings.find((h) => h.textContent?.toLowerCase().includes(headingMatch));
  if (!heading) return [];
  let el: Element | null = heading;
  for (let i = 0; i < 4 && el; i++) {
    el = el.nextElementSibling;
    const list = el?.tagName === 'UL' ? el : el?.querySelector('ul');
    if (list) {
      // `:scope > li` only — some postings nest a sub-`<ul>` inside one
      // `<li>` (e.g. a parenthetical list of tools under one bullet);
      // `querySelectorAll('li')` would flatten those in too, producing a
      // run-on bullet followed by its own children repeated as siblings.
      return Array.from(list.querySelectorAll(':scope > li'))
        .map((li) => li.textContent?.trim() ?? '')
        .filter(Boolean);
    }
  }
  return [];
}

function parseCompensationRange(doc: Document): string | undefined {
  const payRange = doc.querySelector('.pay-range');
  if (!payRange) return undefined;
  const amounts = Array.from(payRange.querySelectorAll('span'))
    .map((s) => s.textContent?.trim() ?? '')
    .filter((s) => s.startsWith('$'));
  if (amounts.length >= 2) return `${amounts[0]} – ${amounts[1]}`;
  if (amounts.length === 1) return `${amounts[0]}/yr`;
  return undefined;
}

/** Greenhouse's `content` field comes back HTML-entity-encoded as a plain
 * string — e.g. the literal characters `&lt;h2&gt;`, not a real `<h2>`
 * element. Feeding that straight to `DOMParser` produces a document with no
 * actual elements at all (confirmed while debugging why every parsed listing
 * came back with zero qualifications — `querySelectorAll` was correctly
 * finding nothing, because there was nothing to find). Routing the string
 * through a `<textarea>`'s `innerHTML`/`value` is the standard entity-decode
 * trick: the browser decodes entities while treating the content as inert
 * text, so real tags-as-text (`<h2>`) come out the other side, without
 * risking executing anything. *Then* it's real markup `DOMParser` can use. */
function decodeHtmlEntities(encoded: string): string {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = encoded;
  return textarea.value;
}

function parseQualifications(contentHtml: string): { qualifications: JobQualifications; compensationRange?: string } {
  const doc = new DOMParser().parseFromString(decodeHtmlEntities(contentHtml), 'text/html');
  return {
    qualifications: {
      required: bulletsAfterHeading(doc, 'good fit'),
      preferred: bulletsAfterHeading(doc, 'strong candidate'),
    },
    compensationRange: parseCompensationRange(doc),
  };
}

/** Fetches Anthropic's current openings live, client-side, no backend. Throws
 * on network/shape failure — callers (see liveListings.ts) are expected to
 * fall back to the curated snapshot rather than show a broken board. */
export async function fetchAnthropicListings(): Promise<JobListing[]> {
  const listRes = await fetch(LIST_URL);
  if (!listRes.ok) throw new Error(`Greenhouse list fetch failed: ${listRes.status}`);
  const listData = (await listRes.json()) as { jobs: GreenhouseListJob[] };

  const candidatesByPersona = new Map<JobSeekerPersonaId, GreenhouseListJob[]>();
  for (const job of listData.jobs) {
    const persona = classifyPersona(job.title);
    if (!persona) continue;
    const bucket = candidatesByPersona.get(persona) ?? [];
    if (bucket.length < MAX_CANDIDATES_PER_PERSONA) {
      bucket.push(job);
      candidatesByPersona.set(persona, bucket);
    }
  }
  const candidates = Array.from(candidatesByPersona.entries()).flatMap(([persona, jobs]) =>
    jobs.map((job) => ({ persona, job })),
  );

  const checkedOn = new Date().toISOString().slice(0, 10);

  const results = await Promise.all(
    candidates.map(async ({ persona, job }): Promise<JobListing | null> => {
      const detailRes = await fetch(jobDetailUrl(job.id));
      if (!detailRes.ok) return null;
      const detail = (await detailRes.json()) as GreenhouseJobDetail;
      const { qualifications, compensationRange } = parseQualifications(detail.content);
      return {
        id: `gh-anthropic-${job.id}`,
        companyId: 'anthropic',
        title: job.title,
        location: job.location.name.replace(/\s*\|\s*/g, ' / '),
        regions: classifyRegions(job.location.name),
        persona,
        experienceLevel: classifyExperienceLevel(job.title),
        qualifications,
        compensationRange,
        postedOn: job.first_published?.slice(0, 10),
        checkedOn,
        href: job.absolute_url,
      };
    }),
  );

  return results.filter((r): r is JobListing => r !== null);
}
