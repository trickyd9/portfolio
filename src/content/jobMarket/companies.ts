import type { JobSeekerPersonaId } from './personas';

// Extensible — "add companies as we go" per David. Each company lists which
// job-seeker personas it realistically hires for (e.g. Anthropic has no
// Mechanical Engineer roles; Boeing has no currently-tracked UX openings but
// does hire UX designers periodically, so it stays listed for that persona
// even with zero current listings — see JobMarketPage's empty state).
export type CompanyId = 'microsoft' | 'google' | 'boeing' | 'uw' | 'anthropic' | 'amazon';

export interface Company {
  id: CompanyId;
  name: string;
  personas: JobSeekerPersonaId[];
  /** General live careers search — used as the "view all openings" link and
   * as the empty-state fallback when a persona has zero curated listings. */
  careersUrl: string;
  /** Whether this company starts on the board by default. Amazon is
   * available (addable from the drawer) but not seeded — see boardItem.ts. */
  onBoardByDefault: boolean;
}

export const COMPANIES: Company[] = [
  { id: 'microsoft', name: 'Microsoft', personas: ['sde', 'ux-designer'], careersUrl: 'https://careers.microsoft.com/', onBoardByDefault: true },
  { id: 'google', name: 'Google', personas: ['sde', 'ux-designer'], careersUrl: 'https://www.google.com/about/careers/applications/', onBoardByDefault: true },
  { id: 'boeing', name: 'Boeing', personas: ['mechanical-engineer', 'ux-designer'], careersUrl: 'https://jobs.boeing.com/', onBoardByDefault: true },
  { id: 'uw', name: 'University of Washington', personas: ['sde', 'ux-designer'], careersUrl: 'https://wd5.myworkdaysite.com/recruiting/uw/UWHires', onBoardByDefault: true },
  { id: 'anthropic', name: 'Anthropic', personas: ['sde', 'ux-designer'], careersUrl: 'https://www.anthropic.com/careers/jobs', onBoardByDefault: true },
  { id: 'amazon', name: 'Amazon', personas: ['sde', 'ux-designer', 'mechanical-engineer'], careersUrl: 'https://amazon.jobs/', onBoardByDefault: false },
];
