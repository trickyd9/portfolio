import type { PersonaId } from './personas';

// Widget registry — see ../../PersonaWidgetSpec.md §2 for the source catalog.
// Actual content lives in widgetContent.ts (compact/expanded blocks rendered by the
// single shared Widget component, ../widgets/Widget.tsx) — this file only holds the
// structural facts: which personas see it, its full-page route, and its default
// size/mode. See ../../WIDGET-TRACKER.md for status.

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
  /** Route path for this widget's dedicated full page — undefined if it has none. */
  fullPagePath?: string;
  personas: PersonaId[] | 'universal';
  columnSpan: 1 | 2 | 3 | 4;
  /** Rows the widget takes by default — a JSON layout's `size` can override this per persona.
   * Board enforces a hard minimum of 2 regardless of this value, so 1 and 2 render identically. */
  defaultRowSpan: 1 | 2 | 3 | 4 | 5;
  /** Which form best showcases this widget's content by default — the user can still toggle it. */
  defaultMode: 'compact' | 'expanded';
}

export const WIDGETS: Record<WidgetId, WidgetDefinition> = {
  'about-me': {
    id: 'about-me',
    title: 'About Me',
    fullPagePath: '/',
    personas: 'universal',
    columnSpan: 2,
    defaultRowSpan: 5,
    defaultMode: 'expanded',
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    personas: 'universal',
    columnSpan: 1,
    defaultRowSpan: 1,
    defaultMode: 'compact',
  },
  'resume-download': {
    id: 'resume-download',
    title: 'Resume / Download',
    personas: 'universal',
    columnSpan: 1,
    defaultRowSpan: 1,
    defaultMode: 'compact',
  },
  'featured-projects': {
    id: 'featured-projects',
    title: 'Featured Projects',
    fullPagePath: '/projects',
    personas: ['hiring-manager', 'ux-professional', 'technical-peer', 'other'],
    columnSpan: 2,
    defaultRowSpan: 4,
    defaultMode: 'compact',
  },
  'persona-research-showcase': {
    id: 'persona-research-showcase',
    title: 'Persona-Driven Research Showcase',
    fullPagePath: '/persona-research',
    personas: ['ux-professional', 'hiring-manager'],
    columnSpan: 2,
    defaultRowSpan: 1,
    defaultMode: 'compact',
  },
  'design-systems-standards': {
    id: 'design-systems-standards',
    title: 'Design Systems & Standards',
    fullPagePath: '/design-systems',
    personas: ['ux-professional', 'hiring-manager'],
    columnSpan: 2,
    defaultRowSpan: 1,
    defaultMode: 'compact',
  },
  'ai-augmented-build': {
    id: 'ai-augmented-build',
    title: 'AI-Augmented Build',
    fullPagePath: '/ai-augmented-build',
    personas: ['technical-peer', 'hiring-manager'],
    columnSpan: 2,
    defaultRowSpan: 1,
    defaultMode: 'compact',
  },
  'skills-tools-matrix': {
    id: 'skills-tools-matrix',
    title: 'Skills / Tools Matrix',
    personas: ['technical-peer', 'recruiter'],
    columnSpan: 1,
    defaultRowSpan: 1,
    defaultMode: 'compact',
  },
  'career-timeline': {
    id: 'career-timeline',
    title: 'Career Timeline',
    personas: ['recruiter', 'hiring-manager'],
    columnSpan: 1,
    defaultRowSpan: 3,
    defaultMode: 'compact',
  },
  'education-certifications': {
    id: 'education-certifications',
    title: 'Education & Certifications',
    personas: ['recruiter'],
    columnSpan: 1,
    defaultRowSpan: 1,
    defaultMode: 'compact',
  },
  'art-visual-portfolio': {
    id: 'art-visual-portfolio',
    title: 'University Visual Portfolio',
    fullPagePath: '/art-portfolio',
    personas: ['other'],
    columnSpan: 1,
    defaultRowSpan: 4,
    defaultMode: 'compact',
  },
  recommendations: {
    id: 'recommendations',
    title: 'Recommendations',
    personas: ['hiring-manager', 'recruiter'],
    columnSpan: 1,
    defaultRowSpan: 3,
    defaultMode: 'compact',
  },
  'looking-for': {
    id: 'looking-for',
    title: "What I'm Looking For",
    personas: ['recruiter'],
    columnSpan: 1,
    defaultRowSpan: 1,
    defaultMode: 'compact',
  },
};

export function allWidgetIds(): WidgetId[] {
  return Object.keys(WIDGETS) as WidgetId[];
}

export function widgetsWithFullPages(): Array<WidgetDefinition & { fullPagePath: string }> {
  return allWidgetIds()
    .map((id) => WIDGETS[id])
    .filter((def): def is WidgetDefinition & { fullPagePath: string } => Boolean(def.fullPagePath));
}
