import type { JobSeekerPersonaId } from './personas';

// Extensible — "add companies as we go" per David. Each company lists which
// job-seeker personas it realistically hires for (e.g. Anthropic has no
// Mechanical Engineer roles; Boeing has no currently-tracked UX openings but
// does hire UX designers periodically, so it stays listed for that persona
// even with zero current listings — see JobMarketPage's empty state).
export type CompanyId = 'microsoft' | 'google' | 'boeing' | 'uw' | 'anthropic';

export interface Company {
  id: CompanyId;
  name: string;
  personas: JobSeekerPersonaId[];
  /** General live careers search — used as the "view all openings" link and
   * as the empty-state fallback when a persona has zero curated listings. */
  careersUrl: string;
}

export const COMPANIES: Company[] = [
  { id: 'microsoft', name: 'Microsoft', personas: ['sde', 'ux-designer'], careersUrl: 'https://careers.microsoft.com/' },
  { id: 'google', name: 'Google', personas: ['sde', 'ux-designer'], careersUrl: 'https://www.google.com/about/careers/applications/' },
  { id: 'boeing', name: 'Boeing', personas: ['mechanical-engineer', 'ux-designer'], careersUrl: 'https://jobs.boeing.com/' },
  { id: 'uw', name: 'University of Washington', personas: ['sde', 'ux-designer'], careersUrl: 'https://wd5.myworkdaysite.com/recruiting/uw/UWHires' },
  { id: 'anthropic', name: 'Anthropic', personas: ['sde', 'ux-designer'], careersUrl: 'https://www.anthropic.com/careers/jobs' },
];
