// Sourced from References/David Trick Resume.md — Education section. Projects
// render as expandable entries (see AboutPage.tsx's SchoolingTab, which reuses
// the same EntryList component as Work Experience) so each can carry its full
// account rather than the one-line project-list blurb.
import type { Entry } from './entry';
import { PROJECTS } from './projects';
import { HOVERCRAFT_SUMMARY, HOVERCRAFT_ROLE, ECOCAR_SUMMARY, HYPERLOOP_THUMBNAIL } from './engineeringWork';
import { POSTERS, GRAPHIC_DESIGN, type ArtworkPiece } from './creativeWork';

function projectByTitle(title: string) {
  const project = PROJECTS.find((p) => p.title === title);
  if (!project) throw new Error(`Missing project: ${title}`);
  return project;
}

function artworkByTitle(pieces: ArtworkPiece[], title: string) {
  const piece = pieces.find((p) => p.title === title);
  if (!piece) throw new Error(`Missing artwork: ${title}`);
  return piece;
}

// Posters/Printed Matter post URLs, same as artPortfolio.ts's ART_CATEGORIES
// entries — not re-imported from there since only the two hrefs are needed.
const POSTERS_POST_URL = 'https://trickyddesign.wordpress.com/2013/06/27/posters/';
const PRINTED_MATTER_POST_URL = 'https://trickyddesign.wordpress.com/2013/06/27/printed-matter/';

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
        // Confirmed against the post's own featured_image via the WordPress
        // REST API, not assumed from array order.
        thumbnailSrc: 'art/ecocar3/processfile1-drawing.jpg',
      },
      {
        id: 'uw-hyperloop-test-cell',
        title: projectByTitle('UW Hyperloop Test Cell').title,
        period: projectByTitle('UW Hyperloop Test Cell').period,
        sections: [{ intro: projectByTitle('UW Hyperloop Test Cell').description }],
        href: 'https://trickyddesign.wordpress.com/2016/03/30/hyperloop/',
        thumbnailSrc: HYPERLOOP_THUMBNAIL.src,
        thumbnailAlt: HYPERLOOP_THUMBNAIL.title,
      },
      {
        // Originally built across two classes here, not a personal project —
        // moved from Hobbies' old "Personal Projects" section.
        id: 'hovercraft-prototype',
        title: projectByTitle('3D-Printed Hovercraft Prototype').title,
        period: projectByTitle('3D-Printed Hovercraft Prototype').period,
        sections: [{ intro: `${HOVERCRAFT_SUMMARY} ${HOVERCRAFT_ROLE}` }],
        href: 'https://trickyddesign.wordpress.com/2016/02/08/hovercraft/',
        // Confirmed the post's real featured_image — it's the exploded-view
        // drawing (array index 2), not the first SolidWorks screenshot.
        thumbnailSrc: 'art/hovercraft/hovercraft-drawing.jpg',
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
    // Descriptions are David's own, supplied directly (not derived from the
    // poster/book itself) — lightly copyedited for spelling/grammar only.
    projects: [
      {
        id: 'cochin-poster',
        title: 'Cochin Font Poster',
        period: '2002 – 2008',
        sections: [
          {
            intro:
              'Set in the shape of a pyramid and using text from the book "The Alchemist," this was a school project to showcase the four different styles (Regular, Bold, Italic, Bold Italic) in the Cochin font family.',
          },
        ],
        href: POSTERS_POST_URL,
        thumbnailSrc: artworkByTitle(POSTERS, 'Cochin').src,
      },
      {
        id: 'consumption-poster',
        title: 'Consumption',
        period: '2002 – 2008',
        sections: [
          {
            intro:
              'Planned obsolescence — the concept that many manufactured items have a purposeful limit to how long they’ll be used for. This poster shows video-game consoles sized by sale amounts, on a timeline from 1972 to 2008.',
          },
        ],
        href: POSTERS_POST_URL,
        thumbnailSrc: artworkByTitle(POSTERS, 'Consumption').src,
      },
      {
        id: 'a-to-z-typography-book',
        title: 'A to Z Typography Book',
        period: '2002 – 2008',
        sections: [
          {
            intro:
              'Photographs were taken of each letter of the alphabet, found in one form or another in and around Tucson. These photos were then set in a book along with excerpts taken from Ellen Lupton’s "Thinking with Type" and other font-based considerations. The book was then printed and produced for the school project.',
          },
        ],
        href: PRINTED_MATTER_POST_URL,
        thumbnailSrc: artworkByTitle(GRAPHIC_DESIGN, 'A to Z').src,
      },
    ],
  },
];

export const CERTIFICATIONS = [
  { title: 'Figma Essential Training: The Basics', issuer: 'LinkedIn Learning, April 2022' },
  { title: 'Revit: MEP Families', issuer: 'LinkedIn Learning, August 2021' },
  { title: 'Cert Prep: Revit Architecture Certified Professional', issuer: 'LinkedIn Learning' },
];
