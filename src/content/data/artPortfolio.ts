// Sourced from https://trickyddesign.wordpress.com/ (David's dormant pre-AWS design
// archive, confirmed his own — see Setup/clarifications.md, 2026-07-11). Linking out
// to the original posts for now rather than copying images into this repo — the
// image-protection approach is still an open decision (WebsiteArchitecture.md §4).
export interface ArtCategory {
  title: string;
  href: string;
  description: string;
}

export const ART_CATEGORIES: ArtCategory[] = [
  {
    title: 'Drawings / Paintings',
    href: 'https://trickyddesign.wordpress.com/2016/03/07/drawingspaintings/',
    description: 'Figure sketches, perspective drawings, and paintings.',
  },
  {
    title: 'Home Projects',
    href: 'https://trickyddesign.wordpress.com/2016/03/07/home-projects/',
    description: 'Baha’i Greatest Name coffin plate, an aquatic ecosystem, and a modular greenhouse.',
  },
  {
    title: 'Other Work',
    href: 'https://trickyddesign.wordpress.com/2013/06/29/other-work/',
    description: 'Websites, ambigrams, and other various design projects.',
  },
  {
    title: 'Printed Matter',
    href: 'https://trickyddesign.wordpress.com/2013/06/27/printed-matter/',
    description: 'Menuboards, pamphlets, books, and more — for clients and from school.',
  },
  {
    title: 'Posters',
    href: 'https://trickyddesign.wordpress.com/2013/06/27/posters/',
    description: 'Posters for clients, competitions, and school projects.',
  },
  {
    title: 'Logos',
    href: 'https://trickyddesign.wordpress.com/2013/06/27/logos/',
    description: 'Logos created and retouched, both for himself and for clients.',
  },
  {
    title: 'Landscape Architecture Classwork',
    href: 'https://trickyddesign.wordpress.com/2013/06/27/landscape-architecture-classwork-projects/',
    description: 'Theoretical redesign proposals for University Village and Union Bay Natural Area, Seattle.',
  },
  {
    title: 'Moving Imagery',
    href: 'https://trickyddesign.wordpress.com/2013/06/28/movingimagery/',
    description: 'Animation and video work.',
  },
];
