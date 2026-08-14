// Sourced verbatim from References/David Trick - Project List.md — "Persona-Driven
// Research & Design (specialization)" section. Grouped into the Persona Research
// full page's tabs (see src/pages/PersonaResearchPage.tsx); the dashboard widget's
// condensed pitch lives separately in widgetContent.ts.
import type { Entry } from './entry';

export const PERSONA_FRAMEWORK: Entry[] = [
  {
    id: '20-persona-system',
    title: '20-Persona Documentation System',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          "Built the platform's persona registry — 20 personas across 6 job-family categories. Each persona has inline source references, a quarterly review checklist, and explicit feature dependencies with routes. Role-specific interviews verify each persona, surfacing insight beyond what desk research can capture; once verified, a 1-page human-readable wrap sheet is published as the canonical reference. Companion artifacts: a 25-link source references document, a developer-facing usage guide, and a bidirectional persona ↔ feature dependency map (20 personas × 30+ features × 9 critical paths) with gap-detection rules.",
      },
    ],
  },
  {
    id: 'confidence-scoring',
    title: 'Persona Confidence Scoring & Outreach Prioritization',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Added confidence scoring (High/Medium/Low) to all 20 personas keyed to validation source quality (number of customer voices, recency, regional spread, deployment-model spread). Default sort by confidence surfaces quality gaps and directly drove the prioritized customer outreach plan — including the identification of the two highest-usage personas with lowest confidence as the top outreach targets.',
      },
    ],
  },
  {
    id: 'sub-persona-framework',
    title: 'Sub-Persona Promotion Framework',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Defined a sub-persona model so role variants from different regions, deployment models, or operational contexts can be tracked alongside their parent persona. Promotion rules graduate variants through three tiers — single-voice → substantiated → verified — as customer evidence accumulates from interviews and form responses. Prevents "persona fatigue" (one big bucket per role) and "persona explosion" (every variation gets its own page).',
      },
    ],
  },
];

// Three entries, not four: the project list's "Customer Requirements Working
// Sessions" is merged into the field-feedback entry below rather than added
// alongside it (David's direction, 2026-08-13). Both describe the same thing —
// customer input captured live and turned into a downstream artifact — so they
// read as one capability instead of two thin adjacent ones. Every sentence in
// the merged entry still traces to its own paragraph in the source doc; nothing
// was synthesized across them.
export const VALIDATION_FEEDBACK: Entry[] = [
  {
    id: 'customer-validation-program',
    title: 'Customer Validation Program',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Designed and ran the customer-facing validation program: 6 review documents covering all 20 personas with ~112 targeted, non-jargon questions written for non-technical audiences. Established an unbiased feedback channel and a customer-interaction template. Multiple polls and interview cycles drove platform-wide design decisions including status-display preferences, terminology choices, and dashboard widget composition. Collected 18 form responses alongside 10 recorded interviews and 1 async written exchange, reaching 4 job families across 4 operating contexts (Americas, Asia-Pacific, EMEA, and colocation deployments). All 4 launch personas moved from Low/Medium to High confidence, with 8 sub-persona variants promoted to fully verified.',
      },
    ],
  },
  {
    id: 'operational-evidence-cross-check',
    title: 'Operational-Evidence Cross-Check',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Cross-checked interview findings against the ticketing system of record rather than accepting them at face value — 6 structured evidence scrapes producing per-persona corroboration hit-rates of 1.0, 0.90, 0.833, and 0.727. Moved the persona set from anecdotal to evidenced, and independently validated the underlying data models as a side effect. The strongest credibility signal in the persona program: the claims are checkable against system data.',
      },
    ],
  },
  {
    id: 'requirements-and-field-feedback',
    title: 'Customer Requirements Sessions & Field Feedback Loop',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Ran a 6-session customer working-session program across two workstreams — AI-assisted site and page configuration, and trending/charting/multi-metric UX — spanning six distinct customer and engineering groups. Each session distills into a consistent user-story capture (As a… I want… so that… with priority and source), giving downstream delivery a single traceable requirements artifact instead of scattered meeting notes. Extended with async written follow-ups for invitees who could not attend live.',
      },
      {
        intro:
          'The same loop runs on individual field interviews: verbatim feedback extracted and incorporated into the persona file, the validation review questions (3 new questions added), and the persona landing-page mockup (new data widgets). Pattern reused across subsequent customer interviews.',
      },
    ],
  },
];

export const DASHBOARDS_VISION: Entry[] = [
  {
    id: 'persona-dashboards',
    title: '4 Persona Landing-Page Dashboards',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Built 4 interactive React dashboards covering the launch persona set with draggable widget layouts and operational variants per persona. Includes a contextual drawer for per-user widget customization. Implementations are interactive prototypes, originally deployed to the reference-site sandbox.',
      },
    ],
  },
  {
    id: 'north-star-vision',
    title: 'North-Star Design Vision',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Authored the platform\'s north-star design document: widget-based atomic units → persona-templated dashboards → deep-dive experiences. Mapped all 20 personas to default dashboard templates with a defined customization lifecycle (default → user-customized → reset). Synthesized existing vision docs with the new widget/dashboard/experience model.',
      },
    ],
  },
  {
    id: 'q2-q3-execution-plan',
    title: 'Q2/Q3 Persona Experience Execution Plan',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Strategic plan defining how the platform determines what pages, widgets, and navigation to show users based on their job role. 3 architecture decisions (hybrid approach, experiences + widgets coexistence, phased priority order), 5 milestones (vision paper, persona validation, role detection, landing pages, audit rules), 16 mockup requirements, collaboration model, and success criteria.',
      },
    ],
  },
  {
    id: 'leadership-preview',
    title: 'Leadership Preview — Persona Vision as a Working UX Model',
    period: 'Owner, 2026',
    sections: [
      {
        intro:
          'Presented the 4 persona landing-page dashboards live on the reference-site sandbox to immediate leadership. First leadership exposure to the persona-driven UX vision as a working interactive UX model (with role detection, draggable widgets, and operational variants) rather than static mockups or documents. Demo included a Q3+ roadmap discussion.',
      },
    ],
  },
];
