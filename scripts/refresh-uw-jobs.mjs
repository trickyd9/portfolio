#!/usr/bin/env node
// Refreshes UW's job listings for the Job Market Explorer — runs in
// .github/workflows/refresh-uw-jobs.yml (scheduled + manually dispatchable),
// never in the browser. UW's Workday `cxs` API has no CORS headers (verified
// 2026-07-14 — see JobMarketBackend.md §3), so a client-side fetch is
// blocked; running this server-side in a GitHub Action sidesteps that
// entirely, since CORS only restricts browsers. Writes data/uw-jobs.json,
// which the deployed site fetches at runtime from
// raw.githubusercontent.com (confirmed CORS-open for public repos) — see
// site/src/content/jobMarket/uwSource.ts.
//
// Node 20+ (global fetch). No npm dependencies — HTML parsing here is
// regex-based rather than a real DOM parser, since this is a small
// self-contained script, not the main site bundle. Known limitation: won't
// handle every posting template perfectly, same tradeoff already accepted
// for the Anthropic/Greenhouse parser (see greenhouseSource.ts).

import { writeFile, mkdir } from 'node:fs/promises';

const TENANT = 'uw';
const SITE = 'UWHires';
const SEARCH_URL = `https://${TENANT}.wd5.myworkdayjobs.com/wday/cxs/${TENANT}/${SITE}/jobs`;
const detailUrl = (externalPath) => `https://${TENANT}.wd5.myworkdayjobs.com/wday/cxs/${TENANT}/${SITE}${externalPath}`;
const OUTPUT_PATH = new URL('../data/uw-jobs.json', import.meta.url);

// Raised from 5, and from one query per persona to several (2026-07-14, round
// 8) — UW's search is a fuzzy full-text match keyed to the exact phrase sent,
// so a single query ("product designer") misses real roles like "Design
// Technologist" or "UX Researcher" entirely. Multiple queries per persona,
// merged and deduped by req ID, get closer to "everything relevant" instead
// of one narrow slice.
const MAX_PER_PERSONA = 15;
const PERSONA_QUERIES = {
  sde: ['software engineer', 'systems engineer'],
  'ux-designer': ['product designer', 'ux designer', 'design technologist', 'user experience'],
};

async function searchJobs(searchText, limit) {
  const res = await fetch(SEARCH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ appliedFacets: {}, limit, offset: 0, searchText }),
  });
  if (!res.ok) throw new Error(`UW search failed for "${searchText}": ${res.status}`);
  const data = await res.json();
  return data.jobPostings ?? [];
}

async function fetchDetail(externalPath) {
  const res = await fetch(detailUrl(externalPath));
  if (!res.ok) throw new Error(`UW detail fetch failed for ${externalPath}: ${res.status}`);
  const data = await res.json();
  return data.jobPostingInfo;
}

function classifyExperienceLevel(title) {
  const t = title.toLowerCase();
  if (t.includes('director') || t.includes('principal')) return 'staff';
  if (t.includes('senior') || /\bsr\.?\b/.test(t)) return 'senior';
  if (t.includes('entry') || t.includes('intern') || t.includes('temporary')) return 'entry';
  return 'mid';
}

function stripTags(s) {
  return s
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/** UW's `jobDescription` is real embedded HTML (not entity-encoded the way
 * Greenhouse's is), but the heading/list structure varies noticeably by
 * hiring department — confirmed by inspecting two real postings that used
 * different templates. Tries several known heading phrases, and both list
 * structures actually seen: real `<ul><li>` markup, and a "•"-per-line
 * pseudo-list separated by `<br />` (no real list markup at all). Regex-based
 * rather than a DOM parser — this is a small standalone script, not the main
 * site bundle — with the same "best effort, not every template" acceptance
 * already documented for the Anthropic/Greenhouse parser. */
function extractBullets(html, headingPatterns) {
  for (const heading of headingPatterns) {
    const afterHeading = html.match(new RegExp(`${heading}[\\s\\S]{0,20}?<\\/(?:b|strong)>[\\s\\S]{0,20}?<\\/p>([\\s\\S]{0,2000})`, 'i'));
    if (!afterHeading) continue;
    const chunk = afterHeading[1];

    const ulMatch = chunk.match(/^[\s\S]{0,50}?<ul>([\s\S]*?)<\/ul>/i);
    if (ulMatch) {
      const items = [...ulMatch[1].matchAll(/<li>([\s\S]*?)<\/li>/gi)].map(([, inner]) => stripTags(inner)).filter(Boolean);
      if (items.length > 0) return items;
    }

    // Fallback: "•"-prefixed pseudo-bullets separated by <br />, up to the
    // next <b>/<strong> heading (the start of a new section) or <p></p> gap.
    const bulletBlock = chunk.split(/<p>\s*<\/p>|<b>|<strong>/i)[0];
    const bulletItems = bulletBlock
      .split(/<br\s*\/?>/i)
      .map((line) => stripTags(line).replace(/^[•\-*]\s*/, '').trim())
      .filter((line) => line.length > 3);
    if (bulletItems.length > 0) return bulletItems;
  }
  return [];
}

function extractCompensationRange(html) {
  const min = html.match(/Pay Range Minimum:<\/b><\/p>\$?([\d,]+(?:\.\d+)?)/i);
  const max = html.match(/Pay Range Maximum:<\/b><\/p>\$?([\d,]+(?:\.\d+)?)/i);
  if (!min || !max) return undefined;
  const fmt = (n) => `$${Math.round(Number(n.replace(/,/g, ''))).toLocaleString('en-US')}`;
  return `${fmt(min[1])} – ${fmt(max[1])}/yr`;
}

function classifyRegions(location) {
  return location.toLowerCase().includes('seattle') ? ['seattle'] : [];
}

/** UW's search endpoint does fuzzy full-text matching against the whole
 * posting, not the title — broadening the query terms (2026-07-14, round 8)
 * pulled in real noise as a result: "Anatomic Pathology Technologist" and
 * "Nuclear Medicine Tech" matched a "user experience" query (probably
 * "patient experience" somewhere in the body text), "HR Analyst" and
 * "Grounds Supervisor" matched "systems engineer". A title-level filter on
 * top of the search results is what actually keeps this useful instead of
 * just noisier. */
function titleMatchesPersona(title, persona) {
  const t = title.toLowerCase();
  if (persona === 'sde') return /engineer/.test(t);
  if (persona === 'ux-designer') return /designer|\bux\b|user experience|design technologist/.test(t);
  return true;
}

async function main() {
  const listings = [];
  const seenReqIds = new Set();

  for (const [persona, queries] of Object.entries(PERSONA_QUERIES)) {
    let countForPersona = 0;
    for (const query of queries) {
      if (countForPersona >= MAX_PER_PERSONA) break;
      const results = await searchJobs(query, MAX_PER_PERSONA);
      for (const job of results) {
        if (countForPersona >= MAX_PER_PERSONA) break;
        if (!titleMatchesPersona(job.title, persona)) continue;
        const reqIdMatch = job.externalPath.match(/REQ-\d+/);
        const reqId = reqIdMatch ? reqIdMatch[0] : job.externalPath;
        if (seenReqIds.has(reqId)) continue;
        seenReqIds.add(reqId);

        const detail = await fetchDetail(job.externalPath);
        const html = detail.jobDescription ?? '';
        const required = extractBullets(html, ['Requirements:', 'Minimum Qualifications:?', 'Position Qualifications:']);
        const preferred = extractBullets(html, ['Desired Qualifications?:', 'Preferred Qualifications:']);

        listings.push({
          id: `uw-${reqId}`,
          companyId: 'uw',
          title: detail.title,
          location: detail.location,
          regions: classifyRegions(detail.location),
          persona,
          experienceLevel: classifyExperienceLevel(detail.title),
          qualifications: { required, preferred },
          compensationRange: extractCompensationRange(html),
          postedOn: detail.startDate,
          href: detail.externalUrl,
        });
        countForPersona++;
      }
    }
  }

  const output = { fetchedAt: new Date().toISOString(), listings };
  await mkdir(new URL('.', OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n');
  console.log(`Wrote ${listings.length} UW listings to ${OUTPUT_PATH.pathname}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
