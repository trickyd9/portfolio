// Maps each widget to its compact and expanded block content — the data
// Widget.tsx (the single shared component) renders. See WIDGET-TRACKER.md.
import type { Block } from '../widgets/blocks';
import type { WidgetId } from './widgets';
import { CONTACT } from './contact';
import { AWS_TIMELINE, EARLY_TIMELINE } from './data/careerTimeline';
import { CORE_COMPETENCIES, SKILL_CATEGORIES } from './data/skills';
import { PROJECTS, type ProjectCategory } from './data/projects';
import { ART_CATEGORIES } from './data/artPortfolio';

// Categories with their own dedicated full page — a project's title links
// there. Launches/Earlier (Controls)/Personal have no page of their own (see
// FeaturedProjectsPage.tsx), so those titles render as plain text.
const CATEGORY_PAGE: Partial<Record<ProjectCategory, string>> = {
  'Design Systems': '#/design-systems',
  'Persona Research': '#/persona-research',
  'AI-Augmented Build': '#/ai-augmented-build',
};

function projectToListItem(project: (typeof PROJECTS)[number]) {
  return {
    primary: project.title,
    secondary: `${project.category} · ${project.period} — ${project.description}`,
    href: CATEGORY_PAGE[project.category],
    category: project.category,
  };
}

const PROJECT_CATEGORIES = Array.from(new Set(PROJECTS.map((p) => p.category)));

export const WIDGET_CONTENT: Record<WidgetId, { compact: Block[]; expanded: Block[] }> = {
  'about-me': {
    compact: [
      { type: 'heading', text: 'David Trick' },
      { type: 'text', text: 'Software UX Designer — Persona-Driven Research, Design Systems, AI-Augmented Build', secondary: true },
      { type: 'text', text: 'Currently: Design Technologist II at Amazon Web Services' },
    ],
    expanded: [
      { type: 'heading', text: 'David Trick' },
      { type: 'text', text: 'Software UX Designer — Persona-Driven Research, Design Systems, AI-Augmented Build', secondary: true },
      { type: 'text', text: 'Currently: Design Technologist II at Amazon Web Services' },
      {
        type: 'text',
        text: 'Software UX designer with 9+ years at AWS leading the user experience for a data center monitoring platform used and supported by 20+ teams across 200+ AWS data center sites globally. Sole UX designer responsible for the platform’s vision, standards, design systems, research, and cross-team UX coordination. Specializes in persona-driven research and design.',
      },
      {
        type: 'text',
        text: 'BFA in Graphic Design + BS in Mechanical Engineering. Works in design systems, software engineering (React/TypeScript, GraphQL, AWS CDK), and AI-augmented workflows — turning design decisions into shipped, standards-compliant code.',
        secondary: true,
      },
    ],
  },

  contact: {
    compact: [
      { type: 'text', text: CONTACT.email },
      { type: 'linkList', items: [{ label: CONTACT.linkedinLabel, href: CONTACT.linkedinHref }] },
      { type: 'button', text: 'Get in touch', href: `mailto:${CONTACT.email}` },
    ],
    expanded: [
      { type: 'text', text: CONTACT.email },
      { type: 'text', text: CONTACT.phone },
      { type: 'linkList', items: [{ label: CONTACT.linkedinLabel, href: CONTACT.linkedinHref }] },
      { type: 'button', text: 'Get in touch', href: `mailto:${CONTACT.email}` },
    ],
  },

  'resume-download': {
    compact: [{ type: 'button', text: 'Download resume (PDF)', href: `${import.meta.env.BASE_URL}David-Trick-Resume.pdf` }],
    expanded: [
      { type: 'button', text: 'Download resume (PDF)', href: `${import.meta.env.BASE_URL}David-Trick-Resume.pdf` },
      { type: 'text', text: 'Single up-to-date resume for now — persona-specific variants may follow later.', secondary: true },
    ],
  },

  'featured-projects': {
    compact: [
      { type: 'filterableList', categories: PROJECT_CATEGORIES, defaultCount: 4, items: PROJECTS.map(projectToListItem) },
    ],
    expanded: [
      { type: 'filterableList', categories: PROJECT_CATEGORIES, defaultCount: 8, items: PROJECTS.map(projectToListItem) },
    ],
  },

  'persona-research-showcase': {
    compact: [
      { type: 'text', text: 'Specializing in persona-driven research — taking a multi-role industrial product from one-size-fits-all toward role-specific interface logic.' },
    ],
    expanded: [
      { type: 'stat', value: '20', label: 'documented personas across 6 job-family categories' },
      {
        type: 'text',
        text: 'A structured customer validation program (6 review documents, ~112 non-jargon questions) and a sub-persona promotion framework (single-voice → substantiated → verified) drove multiple platform-wide design decisions. All 20 personas are mapped to default dashboard templates, with 4 interactive persona landing-page dashboards built and demoed to leadership.',
      },
    ],
  },

  'design-systems-standards': {
    compact: [{ type: 'stat', value: '3-layer tenet system', label: '15 design tenets → 19 standards → 17 component specs' }],
    expanded: [
      { type: 'stat', value: '3-layer tenet system', label: '15 design tenets → 19 standards → 17 component specs' },
      { type: 'stat', value: '6 rules', label: 'promoted to CI enforcement' },
      {
        type: 'text',
        text: 'UX Audit Program (Schema v1.7.0): 39 global rules + page-type exceptions, every rule traceable to a design tenet — covering design-system compliance, accessibility, data states, and visual consistency.',
      },
    ],
  },

  'ai-augmented-build': {
    compact: [{ type: 'stat', value: '39', label: 'AI development agent capabilities (16 skills, 1 agent, 3 SOPs, 19 context files)' }],
    expanded: [
      { type: 'stat', value: '39', label: 'AI development agent capabilities (16 skills, 1 agent, 3 SOPs, 19 context files)' },
      {
        type: 'text',
        text: 'A unified audit-aware page generator produces standards-compliant React/CloudScape from natural-language descriptions. The Figma Make → React pipeline turned 6 AI-generated mockups into 4 interactive persona dashboards. Standards violations now affect code reviews, while persona feedback ships as non-blocking advisory cards.',
      },
    ],
  },

  'skills-tools-matrix': {
    compact: [{ type: 'tags', items: CORE_COMPETENCIES }],
    expanded: SKILL_CATEGORIES.flatMap((category): Block[] => [
      { type: 'heading', text: category.category },
      { type: 'tags', items: category.skills },
    ]),
  },

  'career-timeline': {
    compact: [{ type: 'timeline', items: AWS_TIMELINE.map(({ title, period }) => ({ title, period })) }],
    expanded: [{ type: 'timeline', items: [...AWS_TIMELINE, ...EARLY_TIMELINE] }],
  },

  'education-certifications': {
    compact: [
      {
        type: 'list',
        items: [
          { primary: 'BS, Mechanical Engineering — University of Washington', secondary: '2014 – 2016' },
          { primary: 'BFA, Visual Communications (Graphic Design) — University of Arizona', secondary: '2002 – 2008, Magna Cum Laude' },
        ],
      },
    ],
    expanded: [
      {
        type: 'list',
        items: [
          { primary: 'BS, Mechanical Engineering — University of Washington', secondary: '2014 – 2016, GPA 3.42. Capstone: EcoCar.' },
          { primary: 'BFA, Visual Communications (Graphic Design) — University of Arizona', secondary: '2002 – 2008, GPA 3.84, Magna Cum Laude' },
        ],
      },
      { type: 'heading', text: 'Certifications' },
      {
        type: 'list',
        items: [
          { primary: 'Figma Essential Training: The Basics', secondary: 'LinkedIn Learning, April 2022' },
          { primary: 'Revit: MEP Families', secondary: 'LinkedIn Learning, August 2021' },
          { primary: 'Cert Prep: Revit Architecture Certified Professional', secondary: 'LinkedIn Learning' },
        ],
      },
    ],
  },

  'art-visual-portfolio': {
    compact: [
      {
        type: 'linkList',
        items: ART_CATEGORIES.slice(0, 3).map((c) => ({ label: c.title, href: c.href, description: c.description })),
      },
    ],
    expanded: [
      {
        type: 'linkList',
        items: ART_CATEGORIES.map((c) => ({ label: c.title, href: c.href, description: c.description })),
      },
      { type: 'text', text: 'Archive from a pre-AWS freelance/creative era (Syncopated Design, 2010–2017). A protected in-site gallery is pending an image-hosting decision — linking to the original posts for now.', secondary: true },
    ],
  },

  recommendations: {
    compact: [{ type: 'quote', text: 'David is a talented mechanical engineer. He is responsible, hard-working, and a team-player. His passion for engineering learning goes beyond the classroom.', attribution: 'Nate Sniadecki, Professor at University of Washington (Nov 2016)' }],
    expanded: [
      { type: 'quote', text: 'David is a talented mechanical engineer. He is responsible, hard-working, and a team-player. His passion for engineering learning goes beyond the classroom.', attribution: 'Nate Sniadecki, Professor at University of Washington (Nov 2016)' },
      { type: 'text', text: 'More recommendations pending.', secondary: true },
    ],
  },

  'looking-for': {
    compact: [
      {
        type: 'text',
        text: 'Open to senior/staff-level UX design roles blending persona-driven research, design systems, and AI-augmented, code-adjacent workflows.',
      },
    ],
    expanded: [
      {
        type: 'list',
        items: [
          { primary: 'Persona-driven research & design', secondary: 'Taking multi-role products from one-size-fits-all toward role-specific interface logic.' },
          { primary: 'Design systems & standards ownership', secondary: 'Tenets, audit programs, component specs — as a platform’s single source of truth.' },
          { primary: 'AI-augmented design-to-build', secondary: 'Agentic workflows that ship standards-compliant, production code, not just mockups.' },
          { primary: 'A dual UX + engineering background', secondary: 'React/TypeScript, GraphQL, AWS CDK alongside design craft.' },
        ],
      },
      {
        type: 'text',
        text: 'Inferred from career focus, not a stated target — specific role level and comp criteria haven’t been set yet.',
        secondary: true,
      },
    ],
  },
};
