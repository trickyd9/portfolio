// Widget registry — the list of named content pieces the site knows about, and
// which of them have a dedicated page.
//
// Three things read this file: App.tsx (routes, nav hrefs, search entries,
// breadcrumb titles), WidgetFullPage.tsx (the generic fallback page), and
// widgetContent.ts (which is keyed by WidgetId). Actual copy lives in
// widgetContent.ts as content blocks, rendered by the single shared Widget
// component (../widgets/Widget.tsx).
//
// What this file deliberately does NOT hold: per-persona layout. Which cards a
// persona sees, how large they start, and whether they open compact or expanded
// are all derived from the per-persona `weight` in data/personaDashboard.ts.
// This registry used to carry `personas`/`columnSpan`/`defaultRowSpan`/
// `defaultMode` fields for the retired persona-switching board; they were read
// by nothing once that board was replaced and were removed 2026-08-13. Don't
// reintroduce sizing here — personaDashboard.ts is the one place that decides
// it. See ../../WIDGET-TRACKER.md for per-widget status.

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
}

export const WIDGETS: Record<WidgetId, WidgetDefinition> = {
  'about-me': {
    id: 'about-me',
    title: 'About Me',
    // Also the site's landing page, which is why the side nav labels it "Home".
    fullPagePath: '/',
  },
  contact: {
    id: 'contact',
    title: 'Contact',
  },
  'resume-download': {
    id: 'resume-download',
    title: 'Resume / Download',
  },
  'featured-projects': {
    id: 'featured-projects',
    title: 'Featured Projects',
    fullPagePath: '/projects',
  },
  'persona-research-showcase': {
    id: 'persona-research-showcase',
    title: 'AWS Persona',
    fullPagePath: '/persona-research',
  },
  'design-systems-standards': {
    id: 'design-systems-standards',
    title: 'Design Systems & Standards',
    fullPagePath: '/design-systems',
  },
  'ai-augmented-build': {
    id: 'ai-augmented-build',
    title: 'AI-Augmented Build',
    fullPagePath: '/ai-augmented-build',
  },
  'skills-tools-matrix': {
    id: 'skills-tools-matrix',
    title: 'Skills / Tools Matrix',
  },
  'career-timeline': {
    id: 'career-timeline',
    title: 'Career Timeline',
  },
  'education-certifications': {
    id: 'education-certifications',
    title: 'Education & Certifications',
  },
  // No `fullPagePath` as of 2026-08-12 — the standalone page and its nav entry
  // were removed because this work is now covered better elsewhere: the About
  // page's Graphic Design and Artwork tabs show it with real thumbnails, and
  // the Persona Dashboard's creative cards show it in context. Same treatment
  // career-timeline and recommendations got when their pages became redundant:
  // the widget and its content stay, only the page goes. `/art-portfolio` now
  // falls through to the catch-all redirect home.
  'art-visual-portfolio': {
    id: 'art-visual-portfolio',
    title: 'University Visual Portfolio',
  },
  recommendations: {
    id: 'recommendations',
    title: 'Recommendations',
  },
  'looking-for': {
    id: 'looking-for',
    title: "What I'm Looking For",
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
