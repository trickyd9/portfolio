// Sourced from References/David Trick Resume.md — Professional Experience + Earlier Experience.
export interface TimelineEntry {
  title: string;
  period: string;
  detail: string;
}

export const AWS_TIMELINE: TimelineEntry[] = [
  {
    title: 'Design Technologist II — Amazon Web Services',
    period: 'Aug 2022 – Present',
    detail:
      'Sole UX designer for a data center monitoring platform used by 20+ teams across 200+ sites; authored the 3-layer UX tenets/standards system, led the 20-persona research program, and built a 39-capability AI development agents package.',
  },
  {
    title: 'Controls Design Engineer — Amazon Web Services',
    period: 'Apr 2017 – Aug 2022',
    detail:
      'Hired as Graphics Engineer, promoted to L5 (Dec 2018). Built the global automation controls graphics deployment program and co-created the Controls GUI Style Guide, still in active use 8+ years later.',
  },
];

export const EARLY_TIMELINE: TimelineEntry[] = [
  {
    title: 'Curriculum Developer & Instructor — Blaze Education, Inc.',
    period: 'Jan – Mar 2017',
    detail: 'Developed curriculum and instructed Game Development and 3D Printing classes.',
  },
  {
    title: 'Design Engineer — UW Hyperloop',
    period: 'Mar – Aug 2016',
    detail: 'Designed test cell apparatus for magnetic-levitation thrust vector measurement; created CAD models and engineering drawings.',
  },
  {
    title: 'Teaching Assistant & Lab Assistant — University of Washington, ME Department',
    period: 'Sep 2014 – Dec 2015',
    detail: 'Lab TA for Composites, Machine Shop, and Learning Labs courses.',
  },
  {
    title: 'Freelance Designer — Syncopated Design',
    period: 'May 2010 – Sep 2014',
    detail: 'Full-spectrum design services: branding, typography, publication design, websites, animation, UI/UX for clients across industries.',
  },
];
