// Sourced from References/David Trick Resume.md — Education section. Projects
// render as expandable entries (see AboutPage.tsx's SchoolingTab, which reuses
// the same EntryList component as Work Experience) so each can carry its full
// account rather than the one-line project-list blurb.
import type { Entry } from './entry';
import { PROJECTS } from './projects';
import { HOVERCRAFT_SUMMARY, HOVERCRAFT_ROLE, ECOCAR_SUMMARY } from './engineeringWork';

function projectByTitle(title: string) {
  const project = PROJECTS.find((p) => p.title === title);
  if (!project) throw new Error(`Missing project: ${title}`);
  return project;
}

export interface Degree {
  id: string;
  university: string;
  degree: string;
  period: string;
  homepage: string;
  projects?: Entry[];
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
    projects: [
      {
        id: 'ecocar-capstone',
        title: projectByTitle('EcoCar Capstone').title,
        period: projectByTitle('EcoCar Capstone').period,
        sections: [{ intro: ECOCAR_SUMMARY }],
        href: 'https://trickyddesign.wordpress.com/2016/02/15/ecocar3/',
      },
      {
        id: 'uw-hyperloop-test-cell',
        title: projectByTitle('UW Hyperloop Test Cell').title,
        period: projectByTitle('UW Hyperloop Test Cell').period,
        sections: [{ intro: projectByTitle('UW Hyperloop Test Cell').description }],
        href: 'https://trickyddesign.wordpress.com/2016/03/30/hyperloop/',
      },
      {
        // Originally built across two classes here, not a personal project —
        // moved from Hobbies' old "Personal Projects" section.
        id: 'hovercraft-prototype',
        title: projectByTitle('3D-Printed Hovercraft Prototype').title,
        period: projectByTitle('3D-Printed Hovercraft Prototype').period,
        sections: [{ intro: `${HOVERCRAFT_SUMMARY} ${HOVERCRAFT_ROLE}` }],
        href: 'https://trickyddesign.wordpress.com/2016/02/08/hovercraft/',
      },
    ],
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
