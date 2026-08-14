// Sourced from References/David Trick Resume.md — Professional Experience +
// Earlier Experience. Full long-form bullets (not the condensed one-liners in
// careerTimeline.ts, which feed the dashboard's Career Timeline widget instead).
//
// On 2026-08-13 David replaced both source documents within about 20 minutes of
// each other — the project list at 17:50, then the resume at 18:10 — and this
// file was updated against both. They agree on everything that matters: the audit
// schema moved v1.7.0/39 rules → v2.5.1/103 rules with all 42 pages covered,
// "6 rules promoted to CI enforcement" became "recommended (pending)", the Mobile
// Beta launch was dropped, the ~4,600h/~$730K remediation sizing came out as
// unsubstantiated, and "200+ AWS data center sites" became "AWS's global data
// center fleet". Two figures the resume deliberately KEEPS and the project list
// simply doesn't mention — the 1MW EPMS and the grayscale style guide — are not
// contradictions, so they stay. Where the two genuinely disagree (the floorplan
// workflow: "PDF-based" in the resume, "image-based" in the project list) the
// newer doc wins, which is the resume.
import type { Entry } from './entry';

export const PROFESSIONAL_ROLES: Entry[] = [
  {
    id: 'design-technologist-ii',
    title: 'Design Technologist II — Amazon Web Services',
    period: 'Aug 2022 – Present',
    sections: [
      {
        intro:
          "Sole UX designer for AWS's data center infrastructure monitoring platform. Responsible for all user experience design, design systems, research, and cross-team UX coordination for a multi-persona product used by operations engineers, field technicians, controls engineers, deployment engineers, and operations leaders.",
      },
      {
        heading: 'UX Vision, Standards & Design Systems',
        bullets: [
          'Authored 3-layer UX tenets and standards document — 15 design tenets → 19 standard tenets → 17 component specs — synthesized from 6 source documents as the platform\'s single source of truth',
          'Completed UX Audit Program — full platform coverage, all 42 pages audited against tenet-based Schema v2.5.1 (103 machine-checkable rules across 13 page types + 15 documented exceptions, every rule traceable to a specific design tenet); 6 rules recommended for promotion to CI enforcement',
          'Built a standalone UX Standards Website (React/Cloudscape) deployed to production with custom domain, SSL, and CDN — first dedicated UX standards reference for the platform and a sandbox vehicle for persona-based dashboards; its documentation content has since been consolidated into the UX Standards & Requirements Wiki, a single maintained entry point with no separate application to own',
          'Led cross-organization terminology standardization across 4 organizations; 6 naming decisions adopted platform-wide',
          "Team's UI/UX approver on cross-team code reviews — design-system compliance, accessibility, and persona-impact callouts as a recurring contribution",
          'Defined the complete UX roadmap (5 workstreams, 19 epics) and presented to leadership; secured Q2 direction with persona-driven design as the execution focus',
        ],
      },
      {
        heading: 'Persona-Driven Research & Design (specialization)',
        intro:
          'End-to-end persona lifecycle for the platform — generation of new persona candidates, structured validation with customers, and incorporation into shipped product. Treats personas not as documents but as the substrate that drives default sort orders, conditional widgets, role-detection logic, and the bidirectional persona ↔ feature dependency map.',
        bullets: [
          'Documented 20 personas across 6 job-family categories with confidence scoring (High/Medium/Low) keyed to validation source quality; default sort surfaces gaps and prioritizes outreach',
          'Defined a sub-persona promotion framework (single-voice → substantiated → verified) so role variants from different regions, deployment models, or operational contexts can be tracked and graduated as customer evidence accumulates',
          'Ran a structured customer validation program — 6 review documents, ~112 non-jargon questions, an unbiased feedback channel (engineering excluded); drove multiple platform-wide design decisions including status display preferences and terminology choices',
          'Built a page-level change matrix mapping current platform pages to per-persona behavior (default sort, default columns, hidden vs. visible elements, surfaced metadata, conditional widgets); each row tied to a specific verified pain point and tier',
          'Built 4 interactive persona landing-page dashboards with draggable widget layouts and operational variants',
          'Authored north-star design vision: widget-based atomic units → persona-templated dashboards → deep-dive experiences, with all 20 personas mapped to default templates and a defined customization lifecycle',
          'Presented the dashboards live on the reference-site sandbox to immediate leadership — first leadership exposure to the persona-driven UX vision as a working UX model rather than static mockups',
          'Cross-checked interview findings against the ticketing system of record — 6 structured evidence scrapes with per-persona corroboration hit-rates of 1.0, 0.90, 0.833, and 0.727, moving the persona set from anecdotal to evidenced',
        ],
      },
      {
        heading: 'AI-Augmented Design-to-Build',
        bullets: [
          'Built an AI development agents package with 39 validated capabilities (16 skills, 1 agent, 3 SOPs, 19 context files) approved by the team; created a unified audit-aware page generator producing standards-compliant React/Cloudscape from natural-language descriptions',
          'Pioneered Figma Make → React rapid prototyping pipeline; 6 AI-generated mockups translated into 4 interactive persona dashboard implementations',
          'Designed an AI-powered sprint management system where agents autonomously manage boards, create punt clones, and track velocity',
          'Standards violations now affect code reviews with persona feedback shipping as non-blocking advisory cards',
        ],
      },
      {
        heading: 'Cross-Team Enablement',
        bullets: [
          'Authored 3 formal training modules and delivered an in-person 2.5-hour Figma training to a partner graphics engineering team to distribute basic design capability',
          'Contributed to 2025 platform launches as team member: full-text search GA and the v1 → v2 platform migration',
        ],
      },
    ],
  },
  {
    id: 'controls-design-engineer',
    title: 'Controls Design Engineer — Amazon Web Services',
    period: 'Apr 2017 – Aug 2022',
    sections: [
      {
        intro:
          'Hired as Graphics Engineer; promoted to L5 in December 2018; progressed through multiple levels of Controls Design Engineering before transitioning to Design Technologist.',
        bullets: [
          'Built the global automation controls graphics deployment program from the ground up — the cross-team workflow for creating, reviewing, and deploying SVG artwork for AWS data center HMIs worldwide; 3 ticketing templates still in active use',
          'Co-created the Controls GUI Style Guide — the grayscale graphics standards package that established visual consistency across all AWS data centers globally; still in active use 8+ years later',
          'Established the centralized Graphics Repository for completed SVG artwork across all sites and authored the definitive SVG floorplan annotation runbook (shared 7+ times to onboard team members)',
          'Audited BMS graphics across all legacy US data centers against 62 graphical standard elements, scoring every site and writing a one-pager per site; produced an ROI-ranked 3-phase remediation plan sized at a multi-work-year effort and pitched the program to senior leadership with a test-site proposal',
          'Automated the floorplan creation pipeline by replacing the PDF-based workflow with direct CAD file processing, self-teaching the CAD toolchain to do it — 60% reduction in average generation time across two optimization phases',
          'Designed the graphical interface for a 1MW modular electrical distribution system with 10-inch touchscreen EPMS, submitted to manufacturer for global production reproduction',
          'Designed and built a 7-page colocation HMI template adopted for international colocation site deployments',
          'Reviewed BMS and power-monitoring vendor graphic submittals for global sites (US, Europe, Asia-Pacific) against AWS controls standards',
        ],
      },
    ],
  },
  {
    id: 'syncopated-design',
    title: 'Freelance Designer — Syncopated Design',
    period: 'May 2010 – Sep 2017',
    sections: [
      {
        intro:
          'Provided full-spectrum design services across logo design and branding, typography, journal and book design, website creation and maintenance, animation, and user interface/experience design for clients across diverse industries. Created and owned Syncopated Design until September 2014.',
      },
    ],
  },
];

// Curriculum development for a Redmond, WA education company — not a paid
// industry design role like PROFESSIONAL_ROLES, so it lives in Academic instead,
// as a standalone entry alongside the UW Student Assistant group (not nested
// inside it — Blaze Education isn't a University of Washington role).
export const ACADEMIC_STANDALONE_ROLES: Entry[] = [
  {
    id: 'blaze-education',
    title: 'Curriculum Developer & Instructor — Blaze Education, Inc.',
    period: 'Jan 2017 – Mar 2017, Redmond, WA',
    sections: [
      {
        intro:
          'Developed curriculum standards and course materials for Game Development and 3D Printing classes; instructed students on 3D modeling, design thinking, and rapid prototyping.',
      },
    ],
  },
];

export const ACADEMIC_GROUP: { title: string; period: string; roles: Entry[] } = {
  title: 'UW Student Assistant',
  period: 'Sep 2014 – Aug 2016',
  roles: [
    {
      id: 'uw-hyperloop',
      title: 'Design Engineer — UW Hyperloop',
      period: 'Mar 2016 – Aug 2016',
      sections: [
        {
          intro:
            'Designed test cell apparatus for magnetic-levitation thrust vector measurement using strain gauges; created CAD models and engineering drawings; collaborated on conceptual design for the Hyperloop transportation system.',
        },
      ],
    },
    {
      id: 'uw-ta',
      title: 'Teaching Assistant & Lab Assistant — University of Washington, ME Department',
      period: 'Sep 2014 – Dec 2015',
      sections: [
        {
          intro:
            'Lab TA for Mechanical Engineering courses; assigned team design exercises, graded labs, proctored exams; supported Composites, Machine Shop, and Learning Labs.',
        },
      ],
    },
  ],
};
