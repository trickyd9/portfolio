// UW's listings are refreshed daily by a scheduled GitHub Action
// (.github/workflows/refresh-uw-jobs.yml, scripts/refresh-uw-jobs.mjs) that
// runs server-side and commits data/uw-jobs.json — UW's Workday API has no
// CORS headers (verified 2026-07-14, see JobMarketBackend.md §3), so the
// deployed site can't call it directly the way it calls Greenhouse. Instead
// the site fetches the *committed snapshot* at runtime from
// raw.githubusercontent.com, which does send CORS headers for public repos.
// This is "fresh as of the last scheduled run," not truly live — the
// distinction is surfaced in JobMarketPage's status line, not hidden.
import type { JobListing } from './jobListings';

const RAW_DATA_URL = 'https://raw.githubusercontent.com/trickyd9/portfolio/main/data/uw-jobs.json';

interface UwJobsFile {
  fetchedAt: string;
  listings: Omit<JobListing, 'checkedOn'>[];
}

export interface UwFetchResult {
  listings: JobListing[];
  /** When the GitHub Action last actually ran — distinct from "now," since
   * this is a snapshot fetched fresh, not data computed fresh. */
  refreshedAt: string;
}

export async function fetchUwListings(): Promise<UwFetchResult> {
  // Cache-bust — raw.githubusercontent.com caches aggressively (~5 min), and
  // a manual Refresh click should reflect the latest commit even inside that
  // window rather than silently serving a stale cached copy.
  const res = await fetch(`${RAW_DATA_URL}?_=${Date.now()}`);
  if (!res.ok) throw new Error(`UW data fetch failed: ${res.status}`);
  const data = (await res.json()) as UwJobsFile;
  const checkedOn = data.fetchedAt.slice(0, 10);
  return {
    listings: data.listings.map((listing) => ({ ...listing, checkedOn })),
    refreshedAt: data.fetchedAt,
  };
}
