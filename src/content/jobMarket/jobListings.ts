import type { CompanyId } from './companies';
import type { JobSeekerPersonaId } from './personas';
import type { ExperienceLevel } from './experienceLevels';

export interface JobListing {
  id: string;
  companyId: CompanyId;
  title: string;
  location: string;
  persona: JobSeekerPersonaId;
  experienceLevel: ExperienceLevel;
  requirements: string[];
  /** Undefined when the source posting didn't disclose a range. */
  compensationRange?: string;
  /** When this listing was last confirmed live — see JobMarketPage's header note. */
  checkedOn: string;
  href: string;
}

// Curated snapshot, checked 2026-07-13 by searching each company's live careers
// site and verifying every link actually resolves (several initial finds had
// already gone stale within the same research session — real-world evidence for
// why this is a snapshot, not live data; see WIDGET-TRACKER.md). This is Phase 1
// of the Job Market Explorer — `getJobListings()` below is the single seam a
// future live-fetch backend would replace.
const JOB_LISTINGS: JobListing[] = [
  // Microsoft
  {
    id: 'ms-swe-frontend',
    companyId: 'microsoft',
    title: 'Software Engineer II – Frontend',
    location: 'Redmond, WA',
    persona: 'sde',
    experienceLevel: 'mid',
    requirements: [
      'JavaScript/TypeScript and modern web frameworks',
      'Experience shipping consumer or enterprise web UI at scale',
      'Collaborates closely with design and PM to ship features end-to-end',
    ],
    compensationRange: '$100,600 – $199,000/yr (IC3 band, varies by location)',
    checkedOn: '2026-07-13',
    href: 'https://jobs.careers.microsoft.com/global/en/job/1771661/Software-Engineer---Frontend,-Redmond',
  },
  {
    id: 'ms-swe-webdata',
    companyId: 'microsoft',
    title: 'Software Engineer – Web Data Platform',
    location: 'Redmond, WA',
    persona: 'sde',
    experienceLevel: 'senior',
    requirements: [
      'Builds batch/streaming data systems supporting Bing Search and Microsoft AI training',
      'Strong distributed-systems and data-pipeline background',
      'C#, Java, or C++ at scale',
    ],
    checkedOn: '2026-07-13',
    href: 'https://jobs.careers.microsoft.com/global/en/job/1798162',
  },
  {
    id: 'ms-ux-teams',
    companyId: 'microsoft',
    title: 'UX Designer 2 (Teams)',
    location: 'Redmond, WA',
    persona: 'ux-designer',
    experienceLevel: 'mid',
    requirements: [
      'End-to-end UX design for Microsoft Teams features',
      'Portfolio showing systems-level design thinking',
      'Partners with research, PM, and engineering throughout the design cycle',
    ],
    compensationRange: '$91,000 – $125,000/yr (market range)',
    checkedOn: '2026-07-13',
    href: 'https://jobs.careers.microsoft.com/global/en/job/1672232/UX-Designer-2-(Teams)',
  },
  {
    id: 'ms-ux-senior',
    companyId: 'microsoft',
    title: 'Senior UX Designer',
    location: 'Redmond, WA',
    persona: 'ux-designer',
    experienceLevel: 'senior',
    requirements: [
      '5+ years designing shipped software products',
      'Leads design for a product area with minimal oversight',
      'Mentors junior designers, drives design reviews',
    ],
    compensationRange: '$137,600 – $267,000/yr (Product Design IC5 band, varies by location)',
    checkedOn: '2026-07-13',
    href: 'https://jobs.careers.microsoft.com/us/en/job/973847/Senior-UX-Designer',
  },

  // Google
  {
    id: 'google-ux-core',
    companyId: 'google',
    title: 'UX Designer',
    location: 'New York, NY (hybrid)',
    persona: 'ux-designer',
    experienceLevel: 'mid',
    requirements: [
      'Owns UX design for a core product area end-to-end',
      "Uses and evolves Google's design language/system",
      'Partners with research, engineering, and PM',
    ],
    compensationRange: '$159,000 – $231,000/yr + bonus + equity',
    checkedOn: '2026-07-13',
    href: 'https://www.google.com/about/careers/applications/jobs/results/89936277977080518-ux-designer/',
  },
  {
    id: 'google-ux-readytopay',
    companyId: 'google',
    title: 'UX Designer, Ready-To-Pay',
    location: 'Multiple US locations',
    persona: 'ux-designer',
    experienceLevel: 'mid',
    requirements: [
      'Designs payments/fintech user flows at scale',
      'Collaborates with research and engineering on a regulated product surface',
      'Strong systems-thinking and interaction design skills',
    ],
    compensationRange: '$129,000 – $185,000/yr + bonus + equity',
    checkedOn: '2026-07-13',
    href: 'https://www.google.com/about/careers/applications/jobs/results/122380939954135750-ux-designer/',
  },
  {
    id: 'google-swe-labs',
    companyId: 'google',
    title: 'Senior Software Engineer, Full Stack, Labs',
    location: 'Multiple US locations',
    persona: 'sde',
    experienceLevel: 'senior',
    requirements: [
      'Full-stack engineering across frontend and backend services',
      'Ships experimental product features from Google Labs',
      'Strong CS fundamentals — distributed systems, large-scale system design',
    ],
    checkedOn: '2026-07-13',
    href: 'https://www.google.com/about/careers/applications/jobs/results/117231488881042118-senior-software-engineer-full-stack-labs',
  },
  {
    id: 'google-swe-mlphd',
    companyId: 'google',
    title: 'Software Engineer, PhD, Early Career, AI/Machine Learning',
    location: 'Multiple US locations',
    persona: 'sde',
    experienceLevel: 'entry',
    requirements: ['PhD in CS/EE or related field', 'Research-to-production ML engineering', '2026 start'],
    compensationRange: '$147,000 – $211,000/yr + 15% bonus target + equity',
    checkedOn: '2026-07-13',
    href: 'https://www.google.com/about/careers/applications/jobs/results/122258040807137990-software-engineer-phd-early-career-aimachine-learning-2026-start',
  },

  // Boeing — no currently-live UX listing found (two initial finds had already
  // gone stale by the time they were re-checked minutes later); the UX Designer
  // persona stays listed for Boeing since it does hire for it periodically, it
  // just has zero curated listings right now — see the empty state.
  {
    id: 'boeing-struct-berkeley',
    companyId: 'boeing',
    title: 'Structural Analysis Engineer',
    location: 'Berkeley, MO',
    persona: 'mechanical-engineer',
    experienceLevel: 'mid',
    requirements: [
      'Structural/stress analysis for aerospace hardware',
      'FEA tools (Nastran/Patran or similar)',
      'BS in Mechanical, Aerospace, or Structural Engineering',
    ],
    checkedOn: '2026-07-13',
    href: 'https://jobs.boeing.com/job/berkeley/structural-analysis-engineer/185/97191100400',
  },
  {
    id: 'boeing-struct-midlevel-nc',
    companyId: 'boeing',
    title: 'Mid-Level Structural Analysis Engineer – Systems Stress',
    location: 'North Charleston, SC',
    persona: 'mechanical-engineer',
    experienceLevel: 'mid',
    requirements: [
      'Systems-level stress analysis on commercial airplane structures',
      '3–8 years structural analysis experience',
      "Familiarity with Boeing's structural certification processes",
    ],
    checkedOn: '2026-07-13',
    href: 'https://jobs.boeing.com/job/north-charleston/mid-level-structural-analysis-engineer-systems-stress/185/96360862816',
  },
  {
    id: 'boeing-struct-senior-nc',
    companyId: 'boeing',
    title: 'Senior Structural Analysis Engineer – Systems Stress',
    location: 'North Charleston, SC',
    persona: 'mechanical-engineer',
    experienceLevel: 'senior',
    requirements: [
      '8+ years structural/stress analysis on certified aircraft programs',
      'Leads technical reviews and mentors junior engineers',
      'Deep familiarity with FAA/Boeing certification stress methods',
    ],
    checkedOn: '2026-07-13',
    href: 'https://jobs.boeing.com/job/north-charleston/senior-structural-analysis-engineer-systems-stress/185/96488388912',
  },

  // University of Washington
  {
    id: 'uw-swe',
    companyId: 'uw',
    title: 'Software Engineer (Applied Physics Laboratory)',
    location: 'Seattle, WA',
    persona: 'sde',
    experienceLevel: 'mid',
    requirements: [
      'Real-time systems development supporting UW Applied Physics Laboratory research',
      'C/C++ or similar systems-level language',
      'BS in CS, EE, or related field',
    ],
    checkedOn: '2026-07-13',
    href: 'https://wd5.myworkdaysite.com/en-US/recruiting/uw/UWHires/job/Seattle-Campus/Software-Engineer_REQ-0000123633',
  },
  {
    id: 'uw-product-designer',
    companyId: 'uw',
    title: 'Product Designer (Temporary)',
    location: 'Seattle, WA',
    persona: 'ux-designer',
    experienceLevel: 'mid',
    requirements: [
      'Formative research through high-fidelity design, testing, and post-release evaluation',
      'Portfolio showing end-to-end product design process',
      'Temporary/term appointment',
    ],
    checkedOn: '2026-07-13',
    href: 'https://wd5.myworkdaysite.com/en-US/recruiting/uw/UWHires/job/Product-Designer--Temporary-_REQ-0000126902',
  },
  {
    id: 'uw-sys-engineer',
    companyId: 'uw',
    title: 'Senior Systems Engineer',
    location: 'Seattle, WA',
    persona: 'sde',
    experienceLevel: 'senior',
    requirements: [
      'Central IT infrastructure supporting all three UW campuses and UW Medicine',
      'Systems architecture and reliability engineering',
      '5+ years relevant experience',
    ],
    checkedOn: '2026-07-13',
    href: 'https://wd5.myworkdaysite.com/recruiting/uw/UWHires/job/Seattle-WA/Senior-Systems-Engineer_REQ-0000129139',
  },
  {
    id: 'uw-lxd',
    companyId: 'uw',
    title: 'Learning Experience Designer & Facilitator (Temporary)',
    location: 'Seattle, WA',
    persona: 'ux-designer',
    experienceLevel: 'mid',
    requirements: [
      'Designs and facilitates learning experiences for UW staff/faculty',
      'Instructional/UX design background',
      'Temporary appointment',
    ],
    checkedOn: '2026-07-13',
    href: 'https://uw.wd5.myworkdayjobs.com/en-US/UWHires/job/Learning-Experience-Designer---Facilitator--Temporary-_REQ-0000134006',
  },

  // Anthropic — no Mechanical Engineer roles, so that persona is intentionally absent.
  {
    id: 'anthropic-swe-claudeai',
    companyId: 'anthropic',
    title: 'Staff Software Engineer, Claude.ai',
    location: 'San Francisco / NYC / Seattle',
    persona: 'sde',
    experienceLevel: 'staff',
    requirements: [
      "Product engineering for Claude's consumer web app",
      'Works closely with design/PM to ship end-to-end features',
      'Staff-level scope — technical leadership across a product area',
    ],
    checkedOn: '2026-07-13',
    href: 'https://job-boards.greenhouse.io/anthropic/jobs/5026097008',
  },
  {
    id: 'anthropic-pd-claudecode',
    companyId: 'anthropic',
    title: 'Product Designer, Claude Code',
    location: 'San Francisco, CA',
    persona: 'ux-designer',
    experienceLevel: 'senior',
    requirements: [
      'Design at the intersection of craft, research, and product intuition',
      'Shapes how developers experience AI-assisted coding',
      'Small, high-ownership design team',
    ],
    checkedOn: '2026-07-13',
    href: 'https://job-boards.greenhouse.io/anthropic/jobs/5104689008',
  },
  {
    id: 'anthropic-pd-designsystems',
    companyId: 'anthropic',
    title: 'Product Designer, Design Systems',
    location: 'San Francisco, CA',
    persona: 'ux-designer',
    experienceLevel: 'senior',
    requirements: [
      "Builds and evolves Anthropic's design system and shared components",
      "Partners across product teams to keep Claude's UI coherent at scale",
      'Strong systems/component-library design background',
    ],
    checkedOn: '2026-07-13',
    href: 'https://jobs.menlovc.com/companies/anthropic/jobs/50341716-product-designer-design-systems',
  },
];

/** The one seam a future live-fetch backend would replace — every call site
 * already treats this as "the source of truth," not the array directly. */
export function getJobListings(): JobListing[] {
  return JOB_LISTINGS;
}
