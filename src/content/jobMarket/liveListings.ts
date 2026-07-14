import { fetchAnthropicListings } from './greenhouseSource';
import { getAnthropicFallbackListings, type JobListing } from './jobListings';

export interface LiveFetchResult {
  listings: JobListing[];
  /** 'live' = real-time Greenhouse data; 'fallback' = the fetch failed and
   * this is the last-known-good curated snapshot instead. The UI surfaces
   * this distinction rather than silently mixing the two. */
  status: 'live' | 'fallback';
  fetchedAt: string;
}

/** The Phase 1 live-data seam (see JobMarketBackend.md) — currently just
 * Anthropic, the one company with a public, CORS-enabled API. Never throws:
 * a failed fetch degrades to the curated fallback rather than breaking the
 * board. */
export async function fetchLiveListings(): Promise<LiveFetchResult> {
  try {
    const listings = await fetchAnthropicListings();
    if (listings.length === 0) throw new Error('Greenhouse fetch returned no matching listings');
    return { listings, status: 'live', fetchedAt: new Date().toISOString() };
  } catch (err) {
    console.warn('Live Anthropic fetch failed, showing last-known snapshot instead:', err);
    return { listings: getAnthropicFallbackListings(), status: 'fallback', fetchedAt: new Date().toISOString() };
  }
}
