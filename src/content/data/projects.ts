// Sourced from References/David Trick - Project List.md — companion artifact to the
// resume, organized by the same categories used here for the Featured Projects filter.
export type ProjectCategory = 'Design Systems' | 'Persona Research' | 'AI-Augmented Build' | 'Launches' | 'Earlier (Controls)' | 'Personal';

export interface Project {
  title: string;
  category: ProjectCategory;
  role: string;
  period: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'UX Tenets & Standards Document',
    category: 'Design Systems',
    role: 'Owner',
    period: '2026',
    description:
      '3-layer reference for how the platform should look, behave, and evolve: 15 design tenets → 19 standard tenets → 17 component specs, every rule traceable to a tenet.',
  },
  {
    title: 'UX Audit Program — Tenet-Based Schema V2',
    category: 'Design Systems',
    role: 'Owner',
    period: '2026',
    description:
      'Schema v2.5.1 with 103 machine-checkable rules across 13 page types + 15 documented exceptions, each traceable to a design tenet. Full platform coverage — all 42 pages audited, ~112 findings across 28 pages, 14 clean.',
  },
  {
    title: 'UX Standards & Requirements Wiki',
    category: 'Design Systems',
    role: 'Owner',
    period: '2026',
    description:
      'Consolidated the platform’s UX guidance — standards, audit rules, audit results, page types and components, accessibility requirements — into a single maintained entry point, replacing a purpose-built standalone site as the thing the team maintains.',
  },
  {
    title: 'UX Standards Website',
    category: 'Design Systems',
    role: 'Owner',
    period: '2026 — content since consolidated into the wiki',
    description:
      'Standalone reference site documenting platform UX standards and providing a customer-interactive mockup for persona-based landing-page dashboards — the sandbox that let the persona vision be clicked through rather than read about.',
  },
  {
    title: 'UX Roadmap & Task Hierarchy',
    category: 'Design Systems',
    role: 'Owner',
    period: '2026',
    description:
      '5 workstreams (UX Vision & Standards, Persona-Based Interaction Design, Mockups & Design Deliverables, Scaling & Tooling, Training & Enablement), a manager-facing framework doc, and 5 initiative one-pagers — presented to skip-level and direct manager, securing Q2 direction with persona-driven design as the execution focus.',
  },
  {
    title: 'Cross-Org Terminology Standardization',
    category: 'Design Systems',
    role: 'Owner',
    period: '2026',
    description:
      'Led a terminology standardization effort across 4 organizations for verification/validation UI labels — coordinated meetings, surfaced naming conflicts, and produced 6 naming decisions adopted platform-wide, plus a repeatable process for future terminology questions.',
  },
  {
    title: 'UI Code Review Gatekeeper',
    category: 'Design Systems',
    role: 'Ongoing role contribution',
    period: 'Ongoing',
    description:
      'De facto UI/UX approval authority for the platform team — 200+ design-feedback messages across cross-team code reviews: design-system compliance checks, usability callouts, and persona-impact flags.',
  },
  {
    title: 'Drift Notification UX Standard',
    category: 'Design Systems',
    role: 'Owner',
    period: '2026',
    description:
      'Defined the UX standard for drift/deviation notifications in data tables, extending color-only indicators to color + icon for accessibility — reviewed iterations with the implementing developer through to final approval.',
  },
  {
    title: '20-Persona Documentation System',
    category: 'Persona Research',
    role: 'Owner',
    period: '2026',
    description: '20 personas across 6 job-family categories, each with source references, a review checklist, and a persona↔feature dependency map (20 × 30+ × 9).',
  },
  {
    title: 'Sub-Persona Promotion Framework',
    category: 'Persona Research',
    role: 'Owner',
    period: '2026',
    description: 'Single-voice → substantiated → verified promotion model so role variants graduate as customer evidence accumulates, without persona fatigue or explosion.',
  },
  {
    title: 'Customer Validation Program',
    category: 'Persona Research',
    role: 'Owner',
    period: '2026',
    description:
      '6 review documents, ~112 non-jargon questions, an unbiased feedback channel — 18 form responses, 10 recorded interviews and 1 async exchange across 4 job families and 4 operating contexts. All 4 launch personas moved Low/Medium → High confidence; 8 sub-persona variants fully verified.',
  },
  {
    title: 'Operational-Evidence Cross-Check',
    category: 'Persona Research',
    role: 'Owner',
    period: '2026',
    description:
      'Cross-checked interview findings against the ticketing system of record rather than taking them at face value — 6 structured evidence scrapes producing per-persona corroboration hit-rates of 1.0, 0.90, 0.833, and 0.727. Moved the persona set from anecdotal to evidenced.',
  },
  {
    title: '4 Persona Landing-Page Dashboards',
    category: 'Persona Research',
    role: 'Owner',
    period: '2026',
    description: 'Interactive React dashboards with draggable widget layouts and operational variants per persona — presented live to leadership.',
  },
  {
    title: 'Persona Confidence Scoring & Outreach Prioritization',
    category: 'Persona Research',
    role: 'Owner',
    period: '2026',
    description:
      'Added confidence scoring (High/Medium/Low) to all 20 personas, keyed to validation source quality — customer voice count, recency, regional and deployment-model spread. Default sort by confidence surfaced quality gaps and directly drove the customer outreach plan, including identifying the two highest-usage, lowest-confidence personas as top targets.',
  },
  {
    title: 'North-Star Design Vision',
    category: 'Persona Research',
    role: 'Owner',
    period: '2026',
    description:
      'Authored the platform’s north-star design document — widget-based atomic units → persona-templated dashboards → deep-dive experiences — mapping all 20 personas to default dashboard templates with a defined customization lifecycle (default → user-customized → reset).',
  },
  {
    title: 'Q2/Q3 Persona Experience Execution Plan',
    category: 'Persona Research',
    role: 'Owner',
    period: '2026',
    description:
      'Strategic plan defining how the platform determines what pages, widgets, and navigation to show based on job role — 3 architecture decisions (hybrid approach, experiences + widgets coexistence, phased priority order), 5 milestones, 16 mockup requirements, a collaboration model, and success criteria.',
  },
  {
    title: 'Leadership Preview — Persona Vision as a Working UX Model',
    category: 'Persona Research',
    role: 'Owner',
    period: '2026',
    description:
      'Presented the 4 persona landing-page dashboards live to leadership — the first exposure to the persona-driven UX vision as a working interactive model (role detection, draggable widgets, operational variants) rather than static mockups, followed by a Q3+ roadmap discussion.',
  },
  {
    title: 'Customer Requirements Sessions & Field Feedback Loop',
    category: 'Persona Research',
    role: 'Owner',
    period: '2026',
    description:
      'A 6-session customer working-session program across two workstreams and six customer/engineering groups, each session distilled into a consistent user-story capture so delivery gets one traceable requirements artifact instead of scattered notes. The same loop runs on field interviews — verbatim feedback fed back into the persona file, the review questions, and the landing-page mockup.',
  },
  {
    title: 'AI Development Agents Package',
    category: 'AI-Augmented Build',
    role: 'Owner',
    period: '2026',
    description: '39 validated capabilities (16 skills, 1 agent, 3 SOPs, 19 context files); unified audit-aware page generator producing standards-compliant React/Cloudscape.',
  },
  {
    title: 'Figma Make → React Rapid Prototyping Pipeline',
    category: 'AI-Augmented Build',
    role: 'Owner',
    period: '2026',
    description: '6 AI-generated mockups translated into 4 interactive persona dashboard implementations — first concrete artifacts for the persona-driven UX direction.',
  },
  {
    title: 'AI-Powered Page Auditing Agent',
    category: 'AI-Augmented Build',
    role: 'Owner',
    period: '2026',
    description: 'Custom AI agent for automated platform-page auditing; established the audit-as-CI pattern the broader agents package now extends.',
  },
  {
    title: 'AI-Powered Sprint Management System',
    category: 'AI-Augmented Build',
    role: 'Owner',
    period: '2026',
    description:
      'Designed a sprint management system operated through AI agents — sprint structure, punt pattern, and rules, documented as reusable configuration. Agents manage sprint boards, create punt clones, and track velocity; human-in-the-loop confirmation on agent-generated comments keeps oversight in place.',
  },
  {
    title: '2025 Platform Launches',
    category: 'Launches',
    role: 'Team member',
    period: '2025',
    description:
      'Full-text search GA and the v1 → v2 platform migration — contributed as a team member on both. Primarily back-end initiatives; involvement was heavier on the configuration-tooling migration, which carried the UX interactions.',
  },
  {
    title: 'Global Automation Controls Graphics Deployment Program',
    category: 'Earlier (Controls)',
    role: 'Owner',
    period: '2017 – 2022',
    description: 'Built the cross-team workflow for creating, reviewing, and deploying HMI artwork worldwide from the ground up; 3 ticketing templates still in active use.',
  },
  {
    title: 'Controls GUI Style Guide',
    category: 'Earlier (Controls)',
    role: 'Co-author',
    period: '2017 – 2022',
    description: 'Grayscale graphics standards package establishing visual consistency across all AWS data centers globally — still in active use 8+ years later.',
  },
  {
    title: 'Modular EPMS Graphical Interface',
    category: 'Earlier (Controls)',
    role: 'Owner',
    period: '2017 – 2022',
    description: 'Graphical interface for a modular electrical distribution system with a 10-inch touchscreen EPMS, submitted for global production reproduction.',
  },
  {
    title: '3D-Printed Hovercraft Prototype',
    category: 'Personal',
    role: 'Personal',
    period: '2015 – 2017',
    description: 'Iterated V1 → V2 → V2.5: prove viability rough, then redesign smaller/lighter, then refine clip-fit tolerances and add directional motors with safety cages.',
  },
  {
    title: 'UW Hyperloop Test Cell',
    category: 'Personal',
    role: 'University Research',
    period: '2016',
    description: 'Test cell apparatus for magnetic-levitation thrust vector measurement using strain gauges; CAD models and engineering drawings.',
  },
  {
    title: 'EcoCar Capstone',
    category: 'Personal',
    role: 'University',
    period: '2015 – 2016',
    description: 'Machined connective components (brackets, mounts, gears, cradles, crossbars, frames) for the UW capstone EcoCar; SolidWorks drawings, NX programming.',
  },
];
