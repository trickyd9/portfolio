import type { PersonaId } from './personas';

// Widget content registry — see ../../PersonaWidgetSpec.md §2 for the source catalog.
// This is the "static TypeScript/JSON config" called for in PersonaWidgetSpec.md §4.
// Refine one widget at a time by editing its entry here (and swapping in a real
// component via `condensed` once a widget graduates past a placeholder — see
// ../../WIDGET-TRACKER.md for status).

export type WidgetId =
  | 'about-me'
  | 'contact'
  | 'resume-download'
  | 'featured-projects'
  | 'persona-research-showcase'
  | 'design-systems-standards'
  | 'ai-augmented-build'
  | 'skills-tools-matrix'
  | 'career-timeline'
  | 'education-certifications'
  | 'art-visual-portfolio'
  | 'recommendations'
  | 'looking-for';

export interface WidgetDefinition {
  id: WidgetId;
  title: string;
  condensed: string;
  expanded: string;
  fullPage: string;
  /** Route path for this widget's dedicated full page — undefined if it has none (see `fullPage`). */
  fullPagePath?: string;
  personas: PersonaId[] | 'universal';
  columnSpan: 1 | 2 | 3 | 4;
  rowSpan: 1 | 2 | 3;
}

export const WIDGETS: Record<WidgetId, WidgetDefinition> = {
  'about-me': {
    id: 'about-me',
    title: 'About Me',
    condensed: 'Photo, one-line identity, current status ("open to X roles").',
    expanded: 'Short bio.',
    fullPage: 'Full bio + career narrative.',
    fullPagePath: '/about',
    personas: 'universal',
    columnSpan: 2,
    rowSpan: 2,
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    condensed: 'Email, LinkedIn, "get in touch" CTA.',
    expanded: 'Contact form (feeds Lambda/SES).',
    fullPage: 'Form lives in the widget — no separate full page.',
    personas: 'universal',
    columnSpan: 1,
    rowSpan: 1,
  },
  'resume-download': {
    id: 'resume-download',
    title: 'Resume / Download',
    condensed: 'Single "Download resume" button.',
    expanded: 'Choice of variant (1-page / full CV) — open decision, see PersonaWidgetSpec.md §5.2.',
    fullPage: 'No separate full page.',
    personas: 'universal',
    columnSpan: 1,
    rowSpan: 1,
  },
  'featured-projects': {
    id: 'featured-projects',
    title: 'Featured Projects',
    condensed: 'Filter dropdown (by category) + matching project list with short descriptions.',
    expanded: 'Brief overview of a selected project inline.',
    fullPage: 'Full case study page.',
    fullPagePath: '/projects',
    personas: ['hiring-manager', 'ux-professional', 'technical-peer', 'other'],
    columnSpan: 2,
    rowSpan: 2,
  },
  'persona-research-showcase': {
    id: 'persona-research-showcase',
    title: 'Persona-Driven Research Showcase',
    condensed: 'One-line pitch on your specialization.',
    expanded: 'Summary of the AWS persona program (20 personas, validation process, widget-based dashboards).',
    fullPage: 'Full write-up — arguably documents this site as an example.',
    fullPagePath: '/persona-research',
    personas: ['ux-professional', 'hiring-manager'],
    columnSpan: 2,
    rowSpan: 1,
  },
  'design-systems-standards': {
    id: 'design-systems-standards',
    title: 'Design Systems & Standards',
    condensed: 'Headline stat (e.g. "3-layer tenet system, 6 rules -> CI").',
    expanded: 'Summary of the UX audit program.',
    fullPage: 'Full write-up.',
    fullPagePath: '/design-systems',
    personas: ['ux-professional', 'hiring-manager'],
    columnSpan: 2,
    rowSpan: 1,
  },
  'ai-augmented-build': {
    id: 'ai-augmented-build',
    title: 'AI-Augmented Build',
    condensed: 'Headline: "AI development agents, 39 capabilities".',
    expanded: 'Summary of the agent package + Figma Make pipeline.',
    fullPage: 'Full write-up.',
    fullPagePath: '/ai-augmented-build',
    personas: ['technical-peer', 'hiring-manager'],
    columnSpan: 2,
    rowSpan: 1,
  },
  'skills-tools-matrix': {
    id: 'skills-tools-matrix',
    title: 'Skills / Tools Matrix',
    condensed: 'Top 6-8 skills as tags.',
    expanded: 'Full categorized list (Design, Front-End, Cloud, AI, CAD, Industrial).',
    fullPage: 'No separate full page.',
    personas: ['technical-peer', 'recruiter'],
    columnSpan: 1,
    rowSpan: 1,
  },
  'career-timeline': {
    id: 'career-timeline',
    title: 'Career Timeline',
    condensed: 'Compact vertical timeline, role titles + years.',
    expanded: 'Timeline with one-line achievement per role.',
    fullPage: 'Full experience page.',
    fullPagePath: '/career-timeline',
    personas: ['recruiter', 'hiring-manager'],
    columnSpan: 1,
    rowSpan: 2,
  },
  'education-certifications': {
    id: 'education-certifications',
    title: 'Education & Certifications',
    condensed: 'Degrees, one line each.',
    expanded: 'Plus certifications list.',
    fullPage: 'No separate full page.',
    personas: ['recruiter'],
    columnSpan: 1,
    rowSpan: 1,
  },
  'art-visual-portfolio': {
    id: 'art-visual-portfolio',
    title: 'Art / Visual Portfolio',
    condensed: 'Rotating thumbnail gallery (protected images).',
    expanded: 'Larger preview + medium description.',
    fullPage: 'Full gallery page.',
    fullPagePath: '/art-portfolio',
    personas: ['other'],
    columnSpan: 1,
    rowSpan: 2,
  },
  recommendations: {
    id: 'recommendations',
    title: 'Recommendations',
    condensed: 'One quote, rotating.',
    expanded: '2-3 quotes.',
    fullPage: 'Full list.',
    fullPagePath: '/recommendations',
    personas: ['hiring-manager', 'recruiter'],
    columnSpan: 1,
    rowSpan: 1,
  },
  'looking-for': {
    id: 'looking-for',
    title: "What I'm Looking For",
    condensed: 'One-line target role/comp summary.',
    expanded: 'Bullet list of role criteria.',
    fullPage: 'No separate full page.',
    personas: ['recruiter'],
    columnSpan: 1,
    rowSpan: 1,
  },
};

// Default per-persona dashboard order — PersonaWidgetSpec.md §3.
export const PERSONA_DEFAULT_LAYOUT: Record<PersonaId, WidgetId[]> = {
  recruiter: ['about-me', 'looking-for', 'career-timeline', 'skills-tools-matrix', 'resume-download', 'contact'],
  'hiring-manager': ['about-me', 'featured-projects', 'career-timeline', 'recommendations', 'design-systems-standards', 'contact'],
  'ux-professional': ['about-me', 'persona-research-showcase', 'design-systems-standards', 'featured-projects', 'ai-augmented-build', 'contact'],
  'technical-peer': ['about-me', 'ai-augmented-build', 'skills-tools-matrix', 'featured-projects', 'career-timeline', 'contact'],
  other: ['about-me', 'featured-projects', 'art-visual-portfolio', 'contact'],
};

export function allWidgetIds(): WidgetId[] {
  return Object.keys(WIDGETS) as WidgetId[];
}

export function widgetsWithFullPages(): Array<WidgetDefinition & { fullPagePath: string }> {
  return allWidgetIds()
    .map((id) => WIDGETS[id])
    .filter((def): def is WidgetDefinition & { fullPagePath: string } => Boolean(def.fullPagePath));
}
