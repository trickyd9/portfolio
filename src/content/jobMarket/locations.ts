// Location filter for the Job Market Explorer — kept as a simple 3-region set
// (plus "All") rather than free-text matching against each listing's display
// location, since those vary wildly in specificity ("Redmond, WA" vs "Multiple
// US locations"). TODO(live backend): default should come from the visitor's
// IP-derived location instead of a hardcoded value once there's a backend to
// resolve it — static GitHub Pages has no way to do that today, so this
// defaults to Greater Seattle Area per David (also where he's based).
export type LocationRegion = 'seattle' | 'nyc' | 'sf-bay';
export type LocationOptionId = LocationRegion | 'all';

export const LOCATION_OPTIONS: Array<{ id: LocationOptionId; label: string }> = [
  { id: 'seattle', label: 'Greater Seattle Area' },
  { id: 'nyc', label: 'New York' },
  { id: 'sf-bay', label: 'San Francisco Bay Area' },
  { id: 'all', label: 'All locations' },
];

export const DEFAULT_LOCATION_ID: LocationOptionId = 'seattle';
