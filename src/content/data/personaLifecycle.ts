// The persona lifecycle shown on the AWS Persona page's lead tab (2026-08-17).
//
// Sourced from References/David Trick - Project List.md, "Persona-Driven Research
// & Design (specialization)". The three stages are not a new taxonomy: they are
// the page's own three detail tabs (Persona Framework / Validation & Feedback /
// Dashboards & Vision) read as a sequence, which is how the resume already
// describes the work — "generation of new persona candidates, structured
// validation with customers, and incorporation into shipped product".
//
// The loop is real, not decoration. Field feedback is extracted from interviews
// and written back into the persona file, the validation questions, and the
// landing-page mockup, so stage 03 returns to stage 01 rather than ending.
//
// House rules carried over from content/data/aiBuildStack.ts, which David set on
// 2026-08-16 and which apply to visible copy generally:
//  - No em dashes. Use a colon where one introduced an explanation, or a second
//    sentence where it was parenthetical.
//  - Link blue is only for links.
//
// `blurb` is deliberately SHORT. These popovers exist so a reader can identify a
// project without leaving the diagram; the full project text lives in the tab
// named in `tab`, and duplicating it here would give the page two copies of the
// same paragraph to keep in sync.

import type { PopoverProject } from './entry';

export interface LifecycleStage {
  /** '01'–'03', in order. */
  number: string;
  /** Short all-caps name, used in the diagram and the table. */
  name: string;
  /** The eyebrow beside the number. */
  role: string;
  /** Diagram body, one line per array entry. Kept to ~40 characters a line. */
  lines: string[];
  /** The diagram's count strip, monospaced. */
  count: string;
  /** The table's "What happens" cell. */
  happens: string;
  projects: PopoverProject[];
}

export const PERSONA_LIFECYCLE_INTRO =
  'Personas here are not a document that gets written once and filed. They are generated, proven against evidence, and then built into the product as default sorts, default columns, conditional widgets and role detection. Each stage feeds the next, and what comes back from the field re-enters at the beginning.';

// The second sentence exists because the tint was unexplained (David, 2026-08-17,
// on the equivalent tint in the AI build stack): an encoding a reader has to
// reverse-engineer is decoration until something on the page labels it.
export const PERSONA_LIFECYCLE_CAPTION =
  'The loop is the part that matters: verbatim field feedback is written back into the persona file, the validation questions, and the landing-page mockup, so a persona keeps earning its place rather than ageing quietly in a wiki. Stage 02 is filled because it is the load-bearing one: without the evidence, the other two stages are assertion.';

export const PERSONA_LIFECYCLE: LifecycleStage[] = [
  {
    number: '01',
    name: 'DEFINITION',
    role: 'WHO EXISTS',
    lines: ['20 personas across 6 job-family', 'categories, each carrying sources, a', 'review checklist and dependencies.'],
    count: '20 PERSONAS · 6 JOB FAMILIES',
    happens:
      'The registry is built and kept honest. Every persona carries inline source references, a quarterly review checklist, and explicit feature dependencies with routes. Confidence scoring (High/Medium/Low) is keyed to the quality of the validating sources, and the default sort by confidence is what surfaces the gaps worth chasing.',
    projects: [
      {
        id: '20-persona-system',
        title: '20-Persona Documentation System',
        period: 'Owner, 2026',
        fullDetailIn: 'Persona Framework tab',
        blurb:
          "The platform's persona registry: 20 personas across 6 job-family categories, each with inline sources, a quarterly review checklist, and feature dependencies. Companion artifacts include a 25-link source document and a bidirectional persona to feature dependency map (20 personas × 30+ features × 9 critical paths).",
      },
      {
        id: 'confidence-scoring',
        title: 'Persona Confidence Scoring & Outreach Prioritization',
        period: 'Owner, 2026',
        fullDetailIn: 'Persona Framework tab',
        blurb:
          'High/Medium/Low confidence on all 20 personas, keyed to validation source quality: number of customer voices, recency, regional spread, deployment-model spread. Sorting by confidence surfaces the gaps, and drove the outreach plan directly, including naming the two highest-usage personas with the lowest confidence as the top targets.',
      },
      {
        id: 'sub-persona-framework',
        title: 'Sub-Persona Promotion Framework',
        period: 'Owner, 2026',
        fullDetailIn: 'Persona Framework tab',
        blurb:
          'A sub-persona model so role variants from different regions, deployment models or operational contexts are tracked against their parent. Promotion runs three tiers as evidence accumulates: single-voice, substantiated, verified. It prevents both persona fatigue (one bucket per role) and persona explosion (a page per variation).',
      },
    ],
  },
  {
    number: '02',
    name: 'EVIDENCE',
    role: 'WHAT IS PROVEN',
    lines: ['Validated with customers, then', 'cross-checked against the ticketing', 'system rather than taken on trust.'],
    count: '18 RESPONSES · 10 INTERVIEWS',
    happens:
      'A customer-facing validation program covering all 20 personas: 6 review documents, ~112 non-jargon questions, and an unbiased feedback channel. 18 form responses, 10 recorded interviews and 1 async exchange reached 4 job families across 4 operating contexts. Findings were then cross-checked against the ticketing system of record in 6 structured evidence scrapes, with per-persona corroboration hit-rates of 1.0, 0.90, 0.833 and 0.727. All 4 launch personas moved to High confidence and 8 sub-persona variants were promoted to verified.',
    projects: [
      {
        id: 'customer-validation-program',
        title: 'Customer Validation Program',
        period: 'Owner, 2026',
        fullDetailIn: 'Validation & Feedback tab',
        blurb:
          '6 review documents covering all 20 personas, with ~112 targeted non-jargon questions written for non-technical audiences, plus an unbiased feedback channel. Drove platform-wide decisions on status display, terminology and dashboard widget composition. All 4 launch personas moved from Low/Medium to High confidence.',
      },
      {
        id: 'operational-evidence-cross-check',
        title: 'Operational-Evidence Cross-Check',
        period: 'Owner, 2026',
        fullDetailIn: 'Validation & Feedback tab',
        blurb:
          'Interview findings checked against the ticketing system of record instead of being accepted at face value: 6 structured evidence scrapes producing per-persona corroboration hit-rates of 1.0, 0.90, 0.833 and 0.727. The strongest credibility signal in the program, because the claims are checkable against system data.',
      },
      {
        id: 'requirements-and-field-feedback',
        title: 'Customer Requirements Sessions & Field Feedback Loop',
        period: 'Owner, 2026',
        fullDetailIn: 'Validation & Feedback tab',
        blurb:
          'A 6-session customer working-session program across two workstreams, each session distilled into a consistent user-story capture so delivery gets one traceable requirements artifact instead of scattered notes. The same loop runs on individual field interviews, whose verbatim feedback is written back into the persona file, the review questions and the mockups.',
      },
    ],
  },
  {
    number: '03',
    name: 'IN THE PRODUCT',
    role: 'WHAT SHIPS',
    lines: ['Personas drive default sorts, columns,', 'conditional widgets and role', 'detection in shipped dashboards.'],
    count: '4 DASHBOARDS · ALL 20 MAPPED',
    happens:
      'Personas stop being a reference and become interface logic. 4 interactive React dashboards cover the launch persona set with draggable widget layouts, operational variants and a contextual drawer for per-user customization. The north-star vision (widget-based atomic units → persona-templated dashboards → deep-dive experiences) maps all 20 personas to default templates, and the Q2/Q3 plan sets out how the platform decides what to show a given role.',
    projects: [
      {
        id: 'persona-dashboards',
        title: '4 Persona Landing-Page Dashboards',
        period: 'Owner, 2026',
        fullDetailIn: 'Dashboards & Vision tab',
        blurb:
          '4 interactive React dashboards covering the launch persona set, with draggable widget layouts, per-persona operational variants, and a contextual drawer for per-user widget customization. Built as interactive prototypes on the reference-site sandbox.',
      },
      {
        id: 'north-star-vision',
        title: 'North-Star Design Vision',
        period: 'Owner, 2026',
        fullDetailIn: 'Dashboards & Vision tab',
        blurb:
          "The platform's north-star document: widget-based atomic units → persona-templated dashboards → deep-dive experiences. All 20 personas are mapped to default dashboard templates, with a defined customization lifecycle of default, user-customized, reset.",
      },
      {
        id: 'q2-q3-execution-plan',
        title: 'Q2/Q3 Persona Experience Execution Plan',
        period: 'Owner, 2026',
        fullDetailIn: 'Dashboards & Vision tab',
        blurb:
          'How the platform decides what pages, widgets and navigation to show based on job role: 3 architecture decisions, 5 milestones (vision paper, persona validation, role detection, landing pages, audit rules), 16 mockup requirements, a collaboration model and success criteria.',
      },
      {
        id: 'leadership-preview',
        title: 'Leadership Preview: Persona Vision as a Working UX Model',
        period: 'Owner, 2026',
        fullDetailIn: 'Dashboards & Vision tab',
        blurb:
          'Presented the 4 dashboards live on the sandbox to immediate leadership: the first exposure to the persona-driven UX vision as a working interactive model, with role detection and draggable widgets, rather than static mockups or documents.',
      },
    ],
  },
];
