import { fetchAnthropicListings } from './greenhouseSource';
import { fetchUwListings } from './uwSource';
import { getAnthropicFallbackListings, getUwFallbackListings, type JobListing } from './jobListings';
import type { CompanyId } from './companies';

export interface SourceStatus {
  companyId: CompanyId;
  /** 'live' = fetched fresh just now (Anthropic); 'scheduled' = fetched fresh
   * just now, but the underlying data is only as new as the last scheduled
   * refresh (UW); 'fallback' = the fetch itself failed, showing the
   * last-known-good curated snapshot instead. Three states, not two, because
   * "I just checked" and "the data is current" aren't the same claim for a
   * scheduled source — the UI says so rather than blurring them together. */
  status: 'live' | 'scheduled' | 'fallback';
  refreshedAt: string;
}

export interface LiveFetchResult {
  listings: JobListing[];
  sources: SourceStatus[];
}

async function fetchAnthropicSource(): Promise<{ listings: JobListing[]; status: SourceStatus }> {
  const refreshedAt = new Date().toISOString();
  try {
    const listings = await fetchAnthropicListings();
    if (listings.length === 0) throw new Error('Greenhouse fetch returned no matching listings');
    return { listings, status: { companyId: 'anthropic', status: 'live', refreshedAt } };
  } catch (err) {
    console.warn('Live Anthropic fetch failed, showing last-known snapshot instead:', err);
    return { listings: getAnthropicFallbackListings(), status: { companyId: 'anthropic', status: 'fallback', refreshedAt } };
  }
}

async function fetchUwSource(): Promise<{ listings: JobListing[]; status: SourceStatus }> {
  try {
    const { listings, refreshedAt } = await fetchUwListings();
    if (listings.length === 0) throw new Error('UW snapshot fetch returned no listings');
    return { listings, status: { companyId: 'uw', status: 'scheduled', refreshedAt } };
  } catch (err) {
    console.warn('UW snapshot fetch failed, showing last-known curated data instead:', err);
    return {
      listings: getUwFallbackListings(),
      status: { companyId: 'uw', status: 'fallback', refreshedAt: new Date().toISOString() },
    };
  }
}

/** The Phase 1 live-data seam (see JobMarketBackend.md) — Anthropic is
 * genuinely live (direct client-side fetch); UW is refreshed daily by a
 * GitHub Action and fetched here as a committed snapshot (its own API has no
 * CORS support — see JobMarketBackend.md §3). Neither source ever throws: a
 * failed fetch degrades to that company's curated fallback rather than
 * breaking the board. */
export async function fetchLiveListings(): Promise<LiveFetchResult> {
  const [anthropic, uw] = await Promise.all([fetchAnthropicSource(), fetchUwSource()]);
  return {
    listings: [...anthropic.listings, ...uw.listings],
    sources: [anthropic.status, uw.status],
  };
}
