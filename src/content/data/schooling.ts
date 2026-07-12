// Sourced from References/David Trick Resume.md — Education section. Project
// descriptions reuse content/data/projects.ts rather than duplicating them.
import { PROJECTS } from './projects';

function projectByTitle(title: string) {
  const project = PROJECTS.find((p) => p.title === title);
  if (!project) throw new Error(`Missing project: ${title}`);
  return { title: project.title, description: project.description };
}

export interface Degree {
  id: string;
  university: string;
  degree: string;
  period: string;
  homepage: string;
  projects?: Array<{ title: string; description: string }>;
  note?: string;
  portfolioHref?: string;
  recommendation?: { text: string; attribution: string };
}

export const DEGREES: Degree[] = [
  {
    id: 'uw',
    university: 'University of Washington',
    degree: 'BS, Mechanical Engineering',
    period: '2014 – 2016, GPA 3.42',
    homepage: 'https://www.washington.edu/',
    projects: [projectByTitle('EcoCar Capstone'), projectByTitle('UW Hyperloop Test Cell')],
    recommendation: {
      text: 'David is a talented mechanical engineer. He is responsible, hard-working, and a team-player. His passion for engineering learning goes beyond the classroom.',
      attribution: 'Nate Sniadecki, Professor at University of Washington (Nov 2016)',
    },
  },
  {
    id: 'ua',
    university: 'University of Arizona',
    degree: 'BFA, Visual Communications — Graphic Design',
    period: '2002 – 2008, GPA 3.84, Magna Cum Laude',
    homepage: 'https://www.arizona.edu/',
    note: 'Additional emphasis in Motion Graphics. Member of IEEE.',
    portfolioHref: 'https://trickyddesign.wordpress.com/',
  },
];

export const CERTIFICATIONS = [
  { title: 'Figma Essential Training: The Basics', issuer: 'LinkedIn Learning, April 2022' },
  { title: 'Revit: MEP Families', issuer: 'LinkedIn Learning, August 2021' },
  { title: 'Cert Prep: Revit Architecture Certified Professional', issuer: 'LinkedIn Learning' },
];
