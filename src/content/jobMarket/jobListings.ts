import type { CompanyId } from './companies';
import type { JobSeekerPersonaId } from './personas';
import type { ExperienceLevel } from './experienceLevels';
import type { LocationRegion } from './locations';

export interface JobQualifications {
  required: string[];
  preferred: string[];
}

export interface JobListing {
  id: string;
  companyId: CompanyId;
  title: string;
  location: string;
  /** Canonical region tags for the Location filter — separate from the
   * free-text `location` display string since real postings vary too widely
   * in specificity ("Redmond, WA" vs "Multiple US locations") to filter
   * against directly. A listing open to multiple regions lists all of them;
   * one tied to a region outside the filter's 3 options gets an empty array
   * (it simply won't match any specific region — see locations.ts). */
  regions: LocationRegion[];
  persona: JobSeekerPersonaId;
  experienceLevel: ExperienceLevel;
  qualifications: JobQualifications;
  /** Undefined when the source posting didn't disclose a range. */
  compensationRange?: string;
  /** Real posting date, when the source disclosed one — used for "Newest"
   * sort. Falls back to `checkedOn` when absent. */
  postedOn?: string;
  /** When this listing was last confirmed live — see JobMarketPage's header note. */
  checkedOn: string;
  href: string;
}

// Curated snapshot for the 5 companies with no public/CORS-enabled API
// (Microsoft, Google, Boeing, UW, Amazon — see JobMarketBackend.md's Phase 1
// for why), checked 2026-07-13 by searching each company's live careers site
// and verifying every link actually resolves (several initial finds had
// already gone stale within the same research session — real-world evidence for
// why this is a snapshot, not live data; see WIDGET-TRACKER.md). Anthropic is
// fetched live instead (see greenhouseSource.ts) — its 3 entries used to live
// here and now serve only as ANTHROPIC_FALLBACK_LISTINGS below, for when that
// live fetch fails. Qualifications are grouped Required/Preferred to match how
// these companies actually structure postings (Amazon's "BASIC/PREFERRED
// QUALIFICATIONS" sections were extracted close to verbatim; Microsoft/Google/
// Boeing/UW pages are JS-rendered and resisted extraction, so those are
// reasonable syntheses grounded in the real fragments search results did
// surface, not verbatim quotes — see WIDGET-TRACKER.md).
// This is Phase 1 of the Job Market Explorer — `getJobListings()` below is the
// single seam a future live-fetch backend would replace.
const JOB_LISTINGS: JobListing[] = [
  // Microsoft
  {
    id: 'ms-swe-frontend',
    companyId: 'microsoft',
    title: 'Software Engineer II – Frontend',
    location: 'Redmond, WA',
    regions: ['seattle'],
    persona: 'sde',
    experienceLevel: 'mid',
    qualifications: {
      required: [
        "Bachelor's degree in Computer Science or related field + 2+ years professional software engineering experience, or equivalent experience",
        'Proficiency in JavaScript/TypeScript and a modern web framework (React, Angular, or similar)',
      ],
      preferred: [
        'Experience shipping consumer or enterprise web UI at Microsoft scale',
        'Comfortable partnering directly with design and PM through the full feature lifecycle',
        'Familiarity with accessibility and performance best practices for large web applications',
      ],
    },
    compensationRange: '$100,600 – $199,000/yr (IC3 band, varies by location)',
    checkedOn: '2026-07-13',
    href: 'https://jobs.careers.microsoft.com/global/en/job/1771661/Software-Engineer---Frontend,-Redmond',
  },
  {
    id: 'ms-swe-webdata',
    companyId: 'microsoft',
    title: 'Software Engineer – Web Data Platform',
    location: 'Redmond, WA',
    regions: ['seattle'],
    persona: 'sde',
    experienceLevel: 'senior',
    qualifications: {
      required: [
        "Bachelor's degree in Computer Science or related field + 5+ years professional software engineering experience, or equivalent experience",
        'Strong background in distributed systems and large-scale data pipelines',
        'Proficiency in C#, Java, or C++ at production scale',
      ],
      preferred: [
        'Experience building batch or streaming systems supporting search or AI training workloads',
        'Familiarity with Azure data services (Synapse/ADF or similar)',
        'Track record owning a service end-to-end, including on-call and reliability',
      ],
    },
    checkedOn: '2026-07-13',
    href: 'https://jobs.careers.microsoft.com/global/en/job/1798162',
  },
  {
    id: 'ms-ux-teams',
    companyId: 'microsoft',
    title: 'UX Designer 2 (Teams)',
    location: 'Redmond, WA',
    regions: ['seattle'],
    persona: 'ux-designer',
    experienceLevel: 'mid',
    qualifications: {
      required: [
        "Bachelor's degree in Design, HCI, or related field + 2+ years UX design experience, or equivalent experience",
        'Portfolio demonstrating end-to-end design for a shipped software product',
      ],
      preferred: [
        'Experience designing for a large-scale collaboration or communication product',
        'Comfortable partnering with research, PM, and engineering throughout the design cycle',
        "Systems-level design thinking — reusing and extending an existing design system",
      ],
    },
    compensationRange: '$91,000 – $125,000/yr (market range)',
    checkedOn: '2026-07-13',
    href: 'https://jobs.careers.microsoft.com/global/en/job/1672232/UX-Designer-2-(Teams)',
  },
  {
    id: 'ms-ux-senior',
    companyId: 'microsoft',
    title: 'Senior UX Designer',
    location: 'Redmond, WA',
    regions: ['seattle'],
    persona: 'ux-designer',
    experienceLevel: 'senior',
    qualifications: {
      required: [
        "Bachelor's degree in Design, HCI, or related field + 5+ years UX design experience, or equivalent experience",
        "Portfolio showing leadership of a product area's design with minimal oversight",
      ],
      preferred: [
        "Master's degree in Design/HCI + 3 years experience, or Bachelor's degree + 7 years experience",
        'Experience mentoring junior designers and driving design reviews',
        'Track record influencing product strategy through design',
      ],
    },
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
    regions: ['nyc'],
    persona: 'ux-designer',
    experienceLevel: 'mid',
    qualifications: {
      required: [
        'Bachelor’s degree in Design, HCI, Computer Science, or related field, or equivalent practical experience',
        '3+ years of experience as a UX or interaction designer with an available portfolio',
      ],
      preferred: [
        'Experience using and evolving a shared design system across multiple product surfaces',
        'Experience partnering with UX research and engineering throughout the design process',
        'Excellent communication skills for presenting design rationale to cross-functional stakeholders',
      ],
    },
    compensationRange: '$159,000 – $231,000/yr + bonus + equity',
    checkedOn: '2026-07-13',
    href: 'https://www.google.com/about/careers/applications/jobs/results/89936277977080518-ux-designer/',
  },
  {
    id: 'google-ux-readytopay',
    companyId: 'google',
    title: 'UX Designer, Ready-To-Pay',
    location: 'Multiple US locations',
    regions: ['seattle', 'nyc', 'sf-bay'],
    persona: 'ux-designer',
    experienceLevel: 'mid',
    qualifications: {
      required: [
        'Bachelor’s degree in Design, HCI, or related field, or equivalent practical experience',
        '3+ years of experience designing regulated or transactional (e.g. payments/fintech) product flows',
      ],
      preferred: [
        'Experience collaborating with research and engineering on a regulated product surface',
        'Strong systems-thinking and interaction design skills for complex, multi-step flows',
        'Familiarity with accessibility and compliance considerations in financial UX',
      ],
    },
    compensationRange: '$129,000 – $185,000/yr + bonus + equity',
    checkedOn: '2026-07-13',
    href: 'https://www.google.com/about/careers/applications/jobs/results/122380939954135750-ux-designer/',
  },
  {
    id: 'google-swe-labs',
    companyId: 'google',
    title: 'Senior Software Engineer, Full Stack, Labs',
    location: 'Multiple US locations',
    regions: ['seattle', 'nyc', 'sf-bay'],
    persona: 'sde',
    experienceLevel: 'senior',
    qualifications: {
      required: [
        'Bachelor’s degree in Computer Science or related field, or equivalent practical experience',
        '5+ years of full-stack software development experience across frontend and backend services',
      ],
      preferred: [
        'Experience shipping experimental or 0-to-1 product features',
        'Strong grounding in distributed systems and large-scale system design',
        'Comfortable operating with ambiguity in a fast-moving, exploratory team',
      ],
    },
    checkedOn: '2026-07-13',
    href: 'https://www.google.com/about/careers/applications/jobs/results/117231488881042118-senior-software-engineer-full-stack-labs',
  },
  {
    id: 'google-swe-mlphd',
    companyId: 'google',
    title: 'Software Engineer, PhD, Early Career, AI/Machine Learning',
    location: 'Multiple US locations',
    regions: ['seattle', 'nyc', 'sf-bay'],
    persona: 'sde',
    experienceLevel: 'entry',
    qualifications: {
      required: [
        'PhD in Computer Science, Electrical Engineering, or a related technical field',
        'Experience with one or more general-purpose programming languages',
      ],
      preferred: [
        'Publication record or research project experience in machine learning',
        'Experience taking a research idea from prototype to production system',
        'Available to start full-time in 2026',
      ],
    },
    compensationRange: '$147,000 – $211,000/yr + 15% bonus target + equity',
    checkedOn: '2026-07-13',
    href: 'https://www.google.com/about/careers/applications/jobs/results/122258040807137990-software-engineer-phd-early-career-aimachine-learning-2026-start',
  },

  // Boeing — re-curated 2026-07-14 (round 8) via a completely different
  // method after every single previously-curated Boeing link (and every
  // fresh one WebSearch surfaced that same day) had gone 404 by the time it
  // was re-verified — Boeing's postings churn faster than any search index
  // can track. jobs.boeing.com/sitemap.xml lists ~1,357 individual job URLs,
  // regenerated same-day, completely bypassing the stale-search-index
  // problem — every listing below was found via the live sitemap and
  // verified resolving *and* WebFetch-able immediately before being added
  // (WebFetch had failed on every earlier Boeing link, but that turned out
  // to be because those links were already dead, not because Boeing's pages
  // don't render — a fresh sitemap URL rendered full content fine). No
  // currently-live UX-Designer-titled US role was found even searching all
  // 1,357 real URLs directly (only a Bengaluru "Software Engineer, UI/UX
  // Designer" and a São Paulo "Human Factors Manager" matched — both
  // outside this project's 3 tracked US regions) — the UX Designer persona
  // stays listed for Boeing since it does hire for it periodically, it just
  // has zero curated listings right now, a real market gap now confirmed
  // against Boeing's *entire* live posting index, not just a search miss.
  {
    id: 'boeing-struct-exp-nc',
    companyId: 'boeing',
    title: 'Experienced Structural Analysis Engineer',
    location: 'North Charleston, SC',
    regions: [],
    persona: 'mechanical-engineer',
    experienceLevel: 'senior',
    qualifications: {
      required: [
        'Bachelor of Science in Engineering (Mechanical, Civil, Aerospace, or Materials Sciences)',
        '9+ years of structural analysis engineering experience, including 5+ years on metallic and composite material systems',
        'Prior experience with aircraft or heavy structures manufacturing',
      ],
      preferred: [
        'Prior experience as a Lead Stress Liaison Engineer in production',
        'Lead Engineer experience with classical hand analysis and FE Models',
        'Experience collaborating with production/manufacturing teams on technical problem-solving',
      ],
    },
    compensationRange: '$126,650 – $171,350/yr',
    checkedOn: '2026-07-14',
    href: 'https://jobs.boeing.com/job/north-charleston/experienced-structural-analysis-engineer/185/97750201232',
  },
  {
    id: 'boeing-struct-mid-nc',
    companyId: 'boeing',
    title: 'Mid-Level Structural Analysis Engineer',
    location: 'North Charleston, SC',
    regions: [],
    persona: 'mechanical-engineer',
    experienceLevel: 'mid',
    qualifications: {
      required: [
        'Bachelor of Science in Engineering (Mechanical, Civil, Aerospace, or Materials Sciences)',
        '5+ years of structural analysis engineering experience, including 3+ years on metallic and composite material systems',
        'Prior experience with production systems in manufacturing or engineering',
      ],
      preferred: [
        'Ability to apply classical hand analysis methods',
        'Competency performing FEA and validating results',
        'Prior stress liaison engineer experience in production environments',
      ],
    },
    compensationRange: '$103,700 – $140,300/yr',
    checkedOn: '2026-07-14',
    href: 'https://jobs.boeing.com/job/north-charleston/mid-level-structural-analysis-engineer/185/97750201136',
  },
  {
    id: 'boeing-mech-product-design',
    companyId: 'boeing',
    title: 'Mechanical Product Design and Analysis Engineer (Associate or Mid-Level)',
    location: 'El Segundo, CA',
    regions: [], // El Segundo is greater LA, not the SF Bay Area — doesn't match any of the 3 tracked regions
    persona: 'mechanical-engineer',
    experienceLevel: 'mid',
    qualifications: {
      required: [
        'Bachelor of Science in Mechanical Engineering, Aerospace Engineering, or equivalent',
        'Experience with CAD tools and thermal/structural/dynamics/vibration analysis or PCB design/assembly',
        '2+ years of related work experience; U.S. citizenship required for security clearance eligibility',
      ],
      preferred: [
        'Active Top Secret/SCI clearance',
        'Aerospace or space electronics industry experience',
        'Proficiency with ANSYS, Creo, SolidWorks, Nastran, Patran, or COMSOL',
      ],
    },
    compensationRange: '$98,600 – $162,150/yr (Associate to Mid-Level band)',
    checkedOn: '2026-07-14',
    href: 'https://jobs.boeing.com/job/el-segundo/mechanical-product-design-and-analysis-engineer-associate-or-mid-level/185/95646377456',
  },

  // University of Washington is no longer part of the static snapshot —
  // it's refreshed daily by .github/workflows/refresh-uw-jobs.yml and fetched
  // at runtime (see uwSource.ts). UW_FALLBACK_LISTINGS below is what's shown
  // only if that fetch fails.

  // Anthropic is no longer part of the static snapshot — it's fetched live
  // from Greenhouse's public API (see greenhouseSource.ts/liveListings.ts).
  // ANTHROPIC_FALLBACK_LISTINGS below is what's shown only if that live
  // fetch fails.

  // Amazon — available in the widget catalog but not seeded on the board by
  // default (see companies.ts's `onBoardByDefault`); add it from the drawer.
  {
    id: 'amazon-ux-planningtools',
    companyId: 'amazon',
    title: 'UX Designer, Planning Tools, Amazon Customer Service',
    location: 'Austin, TX / Seattle, WA',
    regions: ['seattle'],
    persona: 'ux-designer',
    experienceLevel: 'mid',
    qualifications: {
      required: [
        '3+ years of design experience with an available online portfolio',
        "Bachelor's degree in graphic design, interactive design, or equivalent",
      ],
      preferred: [
        'Experience acquiring user data (usability studies, user research) and creating personas/journey maps',
        'Visual design expertise demonstrated through mockups and style guides',
        'Prototyping experience (HTML, JavaScript, CSS, or similar)',
      ],
    },
    checkedOn: '2026-07-13',
    href: 'https://amazon.jobs/en/jobs/10465085/ux-designer-planning-tools-amazon-customer-service',
  },
  {
    id: 'amazon-me-robotics',
    companyId: 'amazon',
    title: 'Mechanical Engineer',
    location: 'North Reading / Westboro, MA',
    regions: [],
    persona: 'mechanical-engineer',
    experienceLevel: 'mid',
    qualifications: {
      required: [
        '4+ years of mechanical engineering experience or equivalent',
        "Bachelor's degree in Robotics, Mechanical/Mechatronics Engineering, or related field",
        'Design for X (DFx: cost, test, manufacturing) expertise',
      ],
      preferred: [
        "Master's degree in Robotics, Mechanical/Mechatronics Engineering, or related field",
        'SolidWorks Simulation or ANSYS Finite Element Analysis proficiency',
        'Experience with actuation/motor development and tooled component design (casting, injection molding, forging, stamping)',
      ],
    },
    compensationRange: '$117,300 – $160,000/yr',
    checkedOn: '2026-07-13',
    href: 'https://amazon.jobs/jobs/10377590',
  },
  {
    id: 'amazon-swe-newgrad',
    companyId: 'amazon',
    title: 'Software Development Engineer – 2026 (US)',
    location: 'Seattle, WA',
    regions: ['seattle'],
    persona: 'sde',
    experienceLevel: 'entry',
    qualifications: {
      required: [
        'Experience with at least one general-purpose programming language (Java, Python, C++, C#, Go, Rust, or TypeScript)',
        "Currently pursuing or holds a Bachelor's degree in Computer Science, Computer Engineering, or related STEM field",
      ],
      preferred: [
        'Prior technical internship(s) or demonstrated project experience',
        'Familiarity with AI development tools, cloud platforms (AWS preferred), and SQL/NoSQL databases',
        'Demonstrated ability to learn and adapt to new technologies quickly',
      ],
    },
    compensationRange: '$110,500 – $160,000/yr',
    checkedOn: '2026-07-13',
    href: 'https://www.amazon.jobs/en/jobs/3177934/software-development-engineer-2026-us',
  },
];

/** The 5 companies with no public/CORS-enabled API — always static, refreshed
 * only by periodically re-running the curation process by hand (see
 * JobMarketBackend.md, Tier 2 §3 option 3), not by any live seam. */
export function getStaticJobListings(): JobListing[] {
  return JOB_LISTINGS;
}

// Shown only if the live Greenhouse fetch fails (network error, unexpected
// response shape, etc.) — the same 3 Anthropic listings this file used to
// carry as static data before the live source existed. Deliberately not
// deleted: a broken live fetch should degrade to "last known good," not to
// an empty Anthropic card.
const ANTHROPIC_FALLBACK_LISTINGS: JobListing[] = [
  {
    id: 'anthropic-swe-claudeai',
    companyId: 'anthropic',
    title: 'Staff Software Engineer, Claude.ai',
    location: 'San Francisco / NYC / Seattle',
    regions: ['sf-bay', 'nyc', 'seattle'],
    persona: 'sde',
    experienceLevel: 'staff',
    qualifications: {
      required: [
        '5+ years of experience building consumer-facing web products, with a strong emphasis on UI quality',
        'Proficient in React, Next.js, and TypeScript, with experience in Node.js',
      ],
      preferred: [
        'Experience optimizing performance for consumer web applications at scale',
        'Background working with real-time or streaming interactions (e.g. chat interfaces)',
        'Track record thriving in fast-moving environments where priorities shift frequently',
      ],
    },
    compensationRange: '$320,000 – $405,000/yr + equity',
    checkedOn: '2026-07-13',
    href: 'https://job-boards.greenhouse.io/anthropic/jobs/5026097008',
  },
  {
    id: 'anthropic-pd-claudecode',
    companyId: 'anthropic',
    title: 'Product Designer, Claude Code',
    location: 'San Francisco, CA',
    regions: ['sf-bay'],
    persona: 'ux-designer',
    experienceLevel: 'senior',
    qualifications: {
      required: [
        '8+ years of product design experience, with a strong portfolio of shipped work',
        'Demonstrated user-centered design and polished interface craftsmanship',
      ],
      preferred: [
        'Front-end prototyping skills (HTML/CSS/JS) to communicate design ideas as working code',
        'Technical familiarity with how large language models behave, to design around their limits',
        'Comfortable defining conventions in a product space with no established design patterns',
      ],
    },
    checkedOn: '2026-07-13',
    href: 'https://job-boards.greenhouse.io/anthropic/jobs/5104689008',
  },
  {
    id: 'anthropic-pd-enterprise',
    companyId: 'anthropic',
    title: 'Product Designer, Enterprise',
    location: 'San Francisco, CA',
    regions: ['sf-bay'],
    persona: 'ux-designer',
    experienceLevel: 'senior',
    qualifications: {
      required: [
        '8+ years of product design experience, with a strong portfolio of shipped work',
        'Proven ability to execute end-to-end on complex products in ambiguous settings',
      ],
      preferred: [
        'Front-end prototyping skills (HTML/CSS/JS)',
        'Technical understanding of large language models',
        'Experience designing for enterprise/B2B customers and workflows',
      ],
    },
    checkedOn: '2026-07-13',
    href: 'https://job-boards.greenhouse.io/anthropic/jobs/5055600008',
  },
];

export function getAnthropicFallbackListings(): JobListing[] {
  return ANTHROPIC_FALLBACK_LISTINGS;
}

// Shown only if the daily UW refresh's committed data.json fails to fetch —
// see uwSource.ts. The same 4 listings this file used to carry as static
// data before the scheduled GitHub Action existed.
const UW_FALLBACK_LISTINGS: JobListing[] = [
  {
    id: 'uw-swe',
    companyId: 'uw',
    title: 'Software Engineer (Applied Physics Laboratory)',
    location: 'Seattle, WA',
    regions: ['seattle'],
    persona: 'sde',
    experienceLevel: 'mid',
    qualifications: {
      required: [
        'Bachelor’s degree in Computer Science, Electrical Engineering, or related field',
        'Experience with C/C++ or a similar systems-level programming language',
      ],
      preferred: [
        'Experience developing real-time systems for research or defense applications',
        "Familiarity with UW Applied Physics Laboratory's Navy-affiliated research programs",
        'Comfortable working in a research-lab setting alongside scientists and engineers',
      ],
    },
    checkedOn: '2026-07-13',
    href: 'https://wd5.myworkdaysite.com/en-US/recruiting/uw/UWHires/job/Seattle-Campus/Software-Engineer_REQ-0000123633',
  },
  {
    id: 'uw-product-designer',
    companyId: 'uw',
    title: 'Product Designer (Temporary)',
    location: 'Seattle, WA',
    regions: ['seattle'],
    persona: 'ux-designer',
    experienceLevel: 'mid',
    qualifications: {
      required: [
        'Portfolio showing end-to-end product design process, from formative research through high-fidelity design',
        'Experience conducting or contributing to usability testing and post-release evaluation',
      ],
      preferred: [
        'Experience designing for a university, research, or public-sector audience',
        'Comfortable working within a temporary/term appointment scope',
        'Familiarity with accessibility standards for public institutions',
      ],
    },
    checkedOn: '2026-07-13',
    href: 'https://wd5.myworkdaysite.com/en-US/recruiting/uw/UWHires/job/Product-Designer--Temporary-_REQ-0000126902',
  },
  {
    id: 'uw-sys-engineer',
    companyId: 'uw',
    title: 'Senior Systems Engineer',
    location: 'Seattle, WA',
    regions: ['seattle'],
    persona: 'sde',
    experienceLevel: 'senior',
    qualifications: {
      required: [
        'Bachelor’s degree in Computer Science, Information Systems, or related field',
        '5+ years of systems architecture or reliability engineering experience',
      ],
      preferred: [
        'Experience supporting large, multi-campus IT infrastructure',
        'Familiarity with healthcare or higher-ed compliance requirements',
        'On-call/incident-response experience for critical infrastructure',
      ],
    },
    checkedOn: '2026-07-13',
    href: 'https://wd5.myworkdaysite.com/recruiting/uw/UWHires/job/Seattle-WA/Senior-Systems-Engineer_REQ-0000129139',
  },
  {
    id: 'uw-lxd',
    companyId: 'uw',
    title: 'Learning Experience Designer & Facilitator (Temporary)',
    location: 'Seattle, WA',
    regions: ['seattle'],
    persona: 'ux-designer',
    experienceLevel: 'mid',
    qualifications: {
      required: [
        'Background in instructional design, UX design, or a related field',
        'Experience designing and facilitating learning experiences for adult learners',
      ],
      preferred: [
        'Experience designing for university staff/faculty professional development',
        'Comfortable working within a temporary appointment scope',
        'Familiarity with common LMS/e-learning tooling',
      ],
    },
    checkedOn: '2026-07-13',
    href: 'https://uw.wd5.myworkdayjobs.com/en-US/UWHires/job/Learning-Experience-Designer---Facilitator--Temporary-_REQ-0000134006',
  },
];

export function getUwFallbackListings(): JobListing[] {
  return UW_FALLBACK_LISTINGS;
}
