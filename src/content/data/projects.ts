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
      'Schema v1.7.0 with 39 global rules + page-type exceptions, each traceable to a design tenet. 6 rules promoted to CI enforcement.',
  },
  {
    title: 'UX Standards Website',
    category: 'Design Systems',
    role: 'Owner',
    period: '2026',
    description:
      'Standalone reference site documenting platform UX standards and providing a customer-interactive mockup for persona-based landing-page dashboards.',
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
    description: '6 review documents, ~112 non-jargon questions, an unbiased feedback channel — drove platform-wide decisions on status display and terminology.',
  },
  {
    title: '4 Persona Landing-Page Dashboards',
    category: 'Persona Research',
    role: 'Owner',
    period: '2026',
    description: 'Interactive React dashboards with draggable widget layouts and operational variants per persona — presented live to leadership.',
  },
  {
    title: 'AI Development Agents Package',
    category: 'AI-Augmented Build',
    role: 'Owner',
    period: '2026',
    description: '39 validated capabilities (16 skills, 1 agent, 3 SOPs, 19 context files); unified audit-aware page generator producing standards-compliant React/CloudScape.',
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
    period: '2024 – Present',
    description: 'Custom AI agent for automated platform-page auditing; established the audit-as-CI pattern the broader agents package now extends.',
  },
  {
    title: '2025 Platform Launches',
    category: 'Launches',
    role: 'Team member',
    period: '2025',
    description:
      'Full-text search GA (85ms p50, 72% adoption), v2 platform migration (10× query performance, zero downtime), and mobile beta (78 users, 4.2★).',
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
    description: 'Graphical interface for a 1MW modular electrical distribution system with a 10-inch touchscreen EPMS, submitted for global production reproduction.',
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
