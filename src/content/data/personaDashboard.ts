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
  /** Route to the full write-up, shown as a "read more" link on the card. */
  detailPath?: string;
  /** Label for that link — says what's actually on the other end. */
  detailLabel?: string;
  /**
   * Always render this item's widget in compact mode on the board, regardless
   * of the persona's overall depth preference. Set on items whose `expanded`
   * content (widgetContent.ts) was sized for a full page rather than a board
   * card — forcing it open here overflows the card's fixed `rowSpan` instead
   * of showing more. Same rule widgets.ts already applies via `defaultMode`.
   */
  forceCompact?: boolean;
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
      // Kept on the artist's default board despite the creative work leading:
      // the research found this audience wants some authentic presence behind
      // the work, not just the images.
      'artist-digital-artist': 2,
    },
    columnSpan: 2,
    rowSpan: 5,
  },
  // ---- Professional practice (AWS). Each card summarizes and links to the
  // page where that work is covered properly, rather than repeating it here.
  {
    id: 'design-systems',
    title: 'Design Systems & Standards',
    category: 'Professional practice',
    summary: 'The tenets, standards and audit program behind a platform used by 20+ teams.',
    widgetId: 'design-systems-standards',
    detailPath: '/design-systems',
    detailLabel: 'Read the full write-up',
    // The single strongest card for both design peers and engineers — the
    // research found design-system work is the one artifact type that reads
    // as design judgment and engineering thinking at the same time.
    weight: {
      'hiring-manager': 2,
      recruiter: 1,
      'ux-professional': 3,
      'technical-peer': 3,
      'product-manager': 1,
      'artist-digital-artist': 0,
    },
    columnSpan: 2,
    rowSpan: 4,
  },
  {
    id: 'aws-persona-work',
    title: 'Persona-Driven Research',
    category: 'Professional practice',
    summary: 'A 20-persona system with confidence scoring, validation interviews and dashboards.',
    widgetId: 'persona-research-showcase',
    detailPath: '/persona-research',
    detailLabel: 'Read the full write-up',
    weight: {
      'hiring-manager': 2,
      recruiter: 1,
      'ux-professional': 3,
      'technical-peer': 1,
      'product-manager': 2,
      'artist-digital-artist': 0,
    },
    columnSpan: 2,
    rowSpan: 4,
  },
  {
    id: 'ai-augmented-build',
    title: 'AI-Augmented Build',
    category: 'Professional practice',
    summary: 'Agents, audit tooling and a Figma-to-React pipeline used to ship standards-compliant work.',
    widgetId: 'ai-augmented-build',
    detailPath: '/ai-augmented-build',
    detailLabel: 'Read the full write-up',
    // Deliberately absent for the artist, and mid-weight rather than lead for
    // the engineer: the research found both are the audiences most skeptical
    // of AI-assisted work presented without visible verification.
    weight: {
      'hiring-manager': 2,
      recruiter: 1,
      'ux-professional': 1,
      'technical-peer': 2,
      'product-manager': 2,
      'artist-digital-artist': 0,
    },
    columnSpan: 2,
    rowSpan: 4,
  },
  {
    id: 'featured-projects',
    title: 'Project List',
    category: 'Professional practice',
    summary: 'The full set of projects, filterable by category.',
    widgetId: 'featured-projects',
    detailPath: '/projects',
    detailLabel: 'See all projects',
    // Expanded content is an 8-item filterable list sized for the full
    // /projects page, not this card's rowSpan — see forceCompact doc above.
    forceCompact: true,
    // Leads for the recruiter: this is the only persona the research found
    // wants breadth over depth, and this card is breadth in one place.
    weight: {
      'hiring-manager': 2,
      recruiter: 3,
      'ux-professional': 1,
      'technical-peer': 1,
      // On by default for the PM: the breadth of shipped work is the closest
      // thing on the board to "what actually got delivered and why".
      'product-manager': 2,
      'artist-digital-artist': 0,
    },
    columnSpan: 2,
    rowSpan: 4,
  },

  // ---- Résumé-derived cards.
  {
    id: 'skills',
    title: 'Skills & Tools',
    category: 'Orientation',
    summary: 'Design, engineering and tooling skills, grouped by type.',
    widgetId: 'skills-tools-matrix',
    weight: {
      'hiring-manager': 1,
      recruiter: 3,
      'ux-professional': 1,
      'technical-peer': 2,
      'product-manager': 1,
      'artist-digital-artist': 0,
    },
    columnSpan: 1,
    rowSpan: 4,
  },
  {
    id: 'career-timeline',
    title: 'Career Timeline',
    category: 'Orientation',
    summary: 'Roles and dates, most recent first.',
    widgetId: 'career-timeline',
    // Expanded content appends the pre-AWS roles on top of the AWS timeline —
    // roughly double length, sized for a full page — see forceCompact doc above.
    forceCompact: true,
    weight: {
      'hiring-manager': 2,
      recruiter: 3,
      'ux-professional': 0,
      'technical-peer': 0,
      'product-manager': 1,
      'artist-digital-artist': 0,
    },
    columnSpan: 1,
    rowSpan: 4,
  },
  {
    id: 'education',
    title: 'Education & Certifications',
    category: 'Orientation',
    summary: 'A BFA in Graphic Design, a BS in Mechanical Engineering, and certifications since.',
    widgetId: 'education-certifications',
    // Kept for the artist unlike the other résumé cards — the BFA is the
    // part of this background that audience is most likely to care about.
    weight: {
      'hiring-manager': 1,
      recruiter: 2,
      'ux-professional': 0,
      'technical-peer': 0,
      'product-manager': 0,
      'artist-digital-artist': 1,
    },
    columnSpan: 1,
    rowSpan: 3,
  },
  {
    id: 'looking-for',
    title: "What I'm Looking For",
    category: 'Orientation',
    summary: 'The kind of role and team this is aimed at.',
    widgetId: 'looking-for',
    // Expanded content is a 4-item list with a secondary line each — far
    // longer than this card's small rowSpan — see forceCompact doc above.
    forceCompact: true,
    weight: {
      'hiring-manager': 2,
      recruiter: 3,
      'ux-professional': 0,
      'technical-peer': 0,
      'product-manager': 0,
      'artist-digital-artist': 0,
    },
    columnSpan: 1,
    rowSpan: 2,
  },
  {
    id: 'contact',
    title: 'Contact',
    category: 'Orientation',
    summary: 'How to get in touch.',
    widgetId: 'contact',
    // The one card every persona gets. The research was unambiguous that
    // working contact details are universal across all six.
    weight: {
      'hiring-manager': 3,
      recruiter: 3,
      'ux-professional': 2,
      'technical-peer': 2,
      'product-manager': 2,
      'artist-digital-artist': 2,
    },
    columnSpan: 1,
    rowSpan: 2,
  },
  {
    id: 'recommendations',
    title: 'Recommendations',
    category: 'Orientation',
    summary: 'What people who have worked with me have said.',
    widgetId: 'recommendations',
    weight: {
      'hiring-manager': 2,
      recruiter: 2,
      'ux-professional': 0,
      'technical-peer': 0,
      'product-manager': 1,
      'artist-digital-artist': 0,
    },
    // 2, not 1: "Recommendations" is a single word with no natural break
    // point, and at 1 column it force-wraps mid-word ("Recommend"/"ations").
    columnSpan: 2,
    rowSpan: 3,
  },

  // ---- Creative work.
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
    // Taller than the other cards on purpose: the pieces are portrait-format
    // drawings, and at a shorter default the image was being squeezed to the
    // point that the carousel controls were what you noticed first.
    rowSpan: 7,
  },
  {
    id: 'posters',
    title: 'Posters',
    category: 'Creative work',
    summary: 'Typographic and concept posters, including type-specimen work.',
    // Weighted up for the design peer as well as the artist — poster and
    // type work is craft this audience reads closely, and it predates the
    // enterprise work that dominates the rest of the board.
    weight: {
      'hiring-manager': 1,
      recruiter: 1,
      'ux-professional': 2,
      'technical-peer': 0,
      'product-manager': 0,
      'artist-digital-artist': 3,
    },
    columnSpan: 2,
    rowSpan: 6,
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    category: 'Creative work',
    summary: 'Identity and print work — logos, brand systems, menus, pamphlets and layouts.',
    weight: {
      'hiring-manager': 1,
      recruiter: 1,
      'ux-professional': 2,
      'technical-peer': 0,
      'product-manager': 0,
      'artist-digital-artist': 3,
    },
    columnSpan: 2,
    rowSpan: 6,
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

/** Weight needed to earn a place on a persona's *default* board. Anything
 * below this is still offered in the "add to the board" list — it just isn't
 * pushed at a visitor who probably didn't come for it. The threshold is what
 * keeps the defaults curated: without it every persona with a non-zero weight
 * got nearly every card, which is the opposite of the point (and specifically
 * wrong for the hiring manager, who the research says wants a few things in
 * depth rather than everything at once). */
const DEFAULT_LAYOUT_THRESHOLD: PersonaWeight = 2;

/** Items a persona sees by default, strongest weight first. */
export function defaultItemsFor(personaId: ResearchPersonaId): DashboardItemDefinition[] {
  return DASHBOARD_ITEMS.filter((item) => item.weight[personaId] >= DEFAULT_LAYOUT_THRESHOLD).sort(
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
