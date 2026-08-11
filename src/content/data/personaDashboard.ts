// Persona Dashboard — the content model behind /persona-dashboard.
//
// The point of this dashboard is to demonstrate persona-driven UX with real
// content: pick who you are, get a layout built for how *you* read, then
// change it. Defaults come from the Career Persona Research findings
// (careerPersonaResearch.ts), not from guesswork.
//
// The key design decision: personas differ less by TOPIC than by what kind of
// evidence they trust. So each item carries both a content `category` (used by
// the "add a widget" menu) and a per-persona `weight`. Weight drives three
// things at once — whether an item is in the default layout, how large it
// starts, and whether it opens compact or expanded. That last one is the
// concrete form of the research's sharpest finding: several personas want the
// *same* content at genuinely different depths, so this is a depth rule rather
// than a show/hide rule wherever possible.
//
// VOICE RULE applies here as in careerPersonaResearch.ts: every string below is
// read by a visitor with no access to the research or the project's history.
import type { WidgetId } from '../widgets';
import type { ResearchPersonaId } from './careerPersonaResearch';

export type DashboardCategory =
  | 'Orientation'
  | 'Professional practice'
  | 'Built artifacts'
  | 'Creative work'
  | 'Engineering roots';

export const DASHBOARD_CATEGORIES: DashboardCategory[] = [
  'Orientation',
  'Professional practice',
  'Built artifacts',
  'Creative work',
  'Engineering roots',
];

/** 0 = leave it out of this persona's default layout; 3 = lead with it. */
export type PersonaWeight = 0 | 1 | 2 | 3;

export interface DashboardItemDefinition {
  id: string;
  title: string;
  category: DashboardCategory;
  /** One line a visitor sees in the "add a widget" list — what this shows. */
  summary: string;
  /** Renders via the shared Widget component when this maps to an existing widget. */
  widgetId?: WidgetId;
  weight: Record<ResearchPersonaId, PersonaWeight>;
  /** Columns out of 4 when this item is in a default layout. */
  columnSpan: 1 | 2 | 3 | 4;
  rowSpan: number;
}

export const DASHBOARD_ITEMS: DashboardItemDefinition[] = [
  {
    id: 'about-me',
    title: 'About Me',
    category: 'Orientation',
    summary: 'Who I am, what I do now, and the background behind it.',
    widgetId: 'about-me',
    // The one item every persona wants. The research found orientation and
    // working contact details to be genuinely universal — the only thing that
    // varies is how much of it each persona reads before moving on, which is
    // handled by depth (below) rather than by hiding it from anyone.
    weight: {
      'hiring-manager': 3,
      recruiter: 3,
      'ux-professional': 2,
      'technical-peer': 2,
      'product-manager': 2,
      'artist-digital-artist': 1,
    },
    columnSpan: 2,
    rowSpan: 5,
  },
  {
    id: 'fine-art',
    title: 'Fine Art',
    category: 'Creative work',
    summary: 'Drawings and paintings — a body of hand-made work, shown one piece at a time.',
    // The clearest persona split on the board. An artist visitor came for
    // exactly this and gets it first; a product manager almost certainly
    // did not, so it stays off their default layout rather than being
    // shown small. Hiring managers and design peers get it at low weight —
    // it reads as craft and range without displacing the professional work.
    weight: {
      'hiring-manager': 1,
      recruiter: 1,
      'ux-professional': 1,
      'technical-peer': 0,
      'product-manager': 0,
      'artist-digital-artist': 3,
    },
    columnSpan: 2,
    rowSpan: 5,
  },
  {
    id: 'animation',
    title: 'Animation',
    category: 'Creative work',
    summary: 'Motion and animation work, including Maya and Flash pieces.',
    // Weighted slightly for the technical peer as well as the artist: the
    // Maya and Flash work is as much a tooling artifact as an artistic one.
    weight: {
      'hiring-manager': 1,
      recruiter: 0,
      'ux-professional': 1,
      'technical-peer': 1,
      'product-manager': 0,
      'artist-digital-artist': 3,
    },
    columnSpan: 2,
    rowSpan: 5,
  },
];

export function dashboardItemById(id: string): DashboardItemDefinition | undefined {
  return DASHBOARD_ITEMS.find((item) => item.id === id);
}

/** Items a persona sees by default, strongest weight first. */
export function defaultItemsFor(personaId: ResearchPersonaId): DashboardItemDefinition[] {
  return DASHBOARD_ITEMS.filter((item) => item.weight[personaId] > 0).sort(
    (a, b) => b.weight[personaId] - a.weight[personaId],
  );
}

// Depth, not visibility: a recruiter scanning in seconds and a hiring manager
// reading for two minutes want the same items in different amounts. Only the
// two fast-scanning personas start compact.
const COMPACT_BY_DEFAULT: ResearchPersonaId[] = ['recruiter', 'artist-digital-artist'];

export function defaultDetailFor(personaId: ResearchPersonaId): 'compact' | 'expanded' {
  return COMPACT_BY_DEFAULT.includes(personaId) ? 'compact' : 'expanded';
}

/** Shown above the board — why this particular layout, for this persona. */
export const PERSONA_LAYOUT_RATIONALE: Record<ResearchPersonaId, string> = {
  'hiring-manager':
    'Set up for a first pass of a couple of minutes: the work in depth, with outcomes and my specific contribution stated rather than implied.',
  recruiter:
    'Set up for a fast, complete scan: everything labeled and visible at a glance, opening compact rather than deep, since this read is about fit and completeness before craft.',
  'ux-professional':
    'Set up for method: how decisions were made and why a particular approach was chosen, with the design-systems work foregrounded rather than summarized.',
  'technical-peer':
    'Set up for things you can check: shipped, working artifacts and the constraints they were built under, rather than polish presented on its own.',
  'product-manager':
    'Set up around consequence: what problem the work solved, what was traded off to ship it, and what changed as a result.',
  'artist-digital-artist':
    'Set up visually: bodies of creative work first, presented as series rather than as case studies, since this read is about the work itself and not about hiring anyone.',
};
