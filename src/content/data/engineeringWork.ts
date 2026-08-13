// Engineering project media — same watermarked, web-res, metadata-stripped
// treatment as the creative work (see creativeWork.ts), kept in its own file
// because it isn't artwork and doesn't carry the human-made note.
//
// Images and captions come from the source portfolio's own post attachments
// via the WordPress posts API, so the captions here are the engineer's, not
// derived from filenames.
import type { ArtworkPiece } from './creativeWork';

// Ordered to follow the project's own narrative: the CAD model first, then the
// printed version, then the later revisions — which is how the original write-up
// walks through it.
export const HOVERCRAFT: ArtworkPiece[] = [
  {
    src: 'art/hovercraft/hovercraftmodel.jpg',
    title: 'SolidWorks model — top',
    caption: 'The CAD model of the top of the hovercraft.',
  },
  {
    src: 'art/hovercraft/hovercraftmodelbottom.jpg',
    title: 'SolidWorks model — bottom',
    caption: 'The CAD model of the underside.',
  },
  {
    src: 'art/hovercraft/hovercraft-drawing.jpg',
    title: 'Exploded view',
    caption: 'A fully defined drawing showing every piece of the assembly.',
  },
  {
    src: 'art/hovercraft/hovercraft-drawing2.jpg',
    title: 'Assembly drawing',
    caption: 'The full hovercraft as a dimensioned drawing.',
  },
  {
    src: 'art/hovercraft/3dprintedhovercraft.jpg',
    title: '3D-printed craft',
    caption: 'The printed version, assembled.',
  },
  {
    src: 'art/hovercraft/hovercraftprintedmodeltop.jpg',
    title: 'Printed — top',
    caption: 'The printed version, top full.',
  },
  {
    src: 'art/hovercraft/hovercraftprintedmodelbot.jpg',
    title: 'Printed — bottom',
    caption: 'The printed version, underside.',
  },
  {
    src: 'art/hovercraft/hovercraftprintedfront.jpg',
    title: 'Printed — front half',
    caption: 'The front half of the printed craft.',
  },
  {
    src: 'art/hovercraft/hovercraftprintedairintake.jpg',
    title: 'Printed — air intake',
    caption: 'The air intake, the part the quieter-design goal turned on.',
  },
  { src: 'art/hovercraft/v2.jpg', title: 'Revision 2 — model' },
  { src: 'art/hovercraft/v2connections.jpg', title: 'Revision 2 — connections' },
  { src: 'art/hovercraft/v2printed.jpg', title: 'Revision 2 — printed' },
  { src: 'art/hovercraft/v2printedpieces.jpg', title: 'Revision 2 — printed pieces' },
  { src: 'art/hovercraft/v2-5-2.jpg', title: 'Revision 2.5' },
  { src: 'art/hovercraft/v2-5-3.jpg', title: 'Revision 2.5 — detail' },
  { src: 'art/hovercraft/v2-5-bot.jpg', title: 'Revision 2.5 — underside' },
];

// Written from the project's own account, including the parts that didn't
// work. Kept that way deliberately: the research behind this dashboard found
// engineers read a case study with no visible friction or compromise as a
// sales pitch, and trust the ones that show what actually happened.
export const HOVERCRAFT_SUMMARY =
  'A hovercraft designed to run quieter than usual, built across two classes — modelled in SolidWorks for one, 3D-printed for the other. The quieter design worked. Lift mostly did not: the blade was modelled after a compressor, and the printed version was too heavy for the motor to spin fast enough to generate much of it. The electronics all functioned and air moved through the craft, but it barely rose. As a first encounter with 3D printing the structure also came out far thicker and sturdier than it needed to be, and there was only time for one full modification and production cycle.';

// Ordered design-first, then machining, then result — the logo is dropped
// (it's a club mark, not the work).
export const ECOCAR: ArtworkPiece[] = [
  {
    src: 'art/ecocar3/processfile1-drawing.jpg',
    title: 'Drawing for the 2-axis mill',
    caption: 'A SolidWorks drawing using distances calculated to program a 2-axis mill.',
  },
  {
    src: 'art/ecocar3/processfile2-2axis.jpg',
    title: 'Process — from block to bracket',
    caption: 'The steps taking this bracket from an initial block of aluminium to the finished part.',
  },
  {
    src: 'art/ecocar3/processfile3-2axis.jpg',
    title: 'Process — continued',
    caption: 'The remaining machining steps for the same bracket.',
  },
  {
    src: 'art/ecocar3/hsmworks.jpg',
    title: 'Toolpathing in HSMExpress',
    caption: 'Using the SolidWorks add-on HSMExpress to generate toolpaths.',
  },
  {
    src: 'art/ecocar3/solidworkssetup.jpg',
    title: 'Gear mounting brackets — setup',
    caption: 'Gear mounting brackets being set up for 3-axis milling.',
  },
  {
    src: 'art/ecocar3/wp_20160113_001.jpg',
    title: 'On the machine',
    caption: 'The same brackets set up for 3-axis milling, using HSMWorks.',
  },
  {
    src: 'art/ecocar3/bracket.jpg',
    title: 'Finished bracket',
    caption: 'One of the brackets I made, showing the surface finish.',
  },
  {
    src: 'art/ecocar3/assembly.jpg',
    title: 'Cradle assembly — one side',
    caption: 'Part of the cradle assembly.',
  },
  {
    src: 'art/ecocar3/assembly2.jpg',
    title: 'Cradle assembly — other side',
    caption: 'The other part of the cradle assembly.',
  },
];

export const ECOCAR_SUMMARY =
  'Part work on EcoCAR3, a four-year intercollegiate competition to re-engineer a production car’s powertrain. My contribution was the manufacturing end: modelling gear mounting brackets and a cradle assembly in SolidWorks, generating toolpaths with HSMExpress, and machining the parts on 2- and 3-axis mills — through to the surface finish on the delivered brackets.';

/** Video is on the source portfolio and verified still playable. */
export const ECOCAR_VIDEO = { youtubeId: '_FOyEBtyZ-c', title: '2-Axis Milling of a Bracket' };

// Hyperloop has no dashboard card — its own write-up describes work that had
// only just started on a design not expected to be final, so it isn't shown as
// a project there. These two exist for the Schooling tab's thumbnail, which is
// a different job: illustrating a real entry on the résumé rather than
// presenting the work as a finished piece.
export const HYPERLOOP_THUMBNAIL: ArtworkPiece = {
  // The post's own featured image — the landscape crop that appears at the top
  // of the article, so the site matches what the source shows.
  src: 'art/hyperloop/testcell.jpg',
  title: 'Rotor lift, thrust and torque test cell',
  caption: 'The test cell built to measure the lift, thrust and torque a rotor puts on a piece of test track.',
};

/** The same photo uncropped and taller — WordPress cropped the version above
 * to landscape for its featured slot. Use this one where a portrait frame
 * suits better; it is not what appears at the top of the post. */
export const HYPERLOOP_THUMBNAIL_UNCROPPED: ArtworkPiece = {
  src: 'art/hyperloop/testcell-full.jpg',
  title: HYPERLOOP_THUMBNAIL.title,
  caption: HYPERLOOP_THUMBNAIL.caption,
};

export const GYROTONIC_VIDEO = {
  youtubeId: 'y9cnIXjKwP0',
  title: 'Linear actuator prototype lifting the bench',
  caption: 'The working prototype raising the bench, from the ME 395 final project.',
};

export const GYROTONIC_SUMMARY =
  'The final project for Introduction to Engineering Design (ME 395), a pre-capstone design/build course — a mechanism to raise a Gyrotonic exercise bench. Ours was the only team on the course to build a complete working prototype of its concept. It had to cost under $500 (this came in around $250), lift the bench six inches, fit the existing aesthetics, make no permanent modification to it, and sit no more than half an inch off the ground when retracted. The finished prototype gave an infinitely adjustable six-inch lift and sat at exactly that half inch.';

export const GYROTONIC_ROLE =
  'My role: researched a possible hydraulic approach, contributed to the final design, and did all the wiring and testing of the actuators and the two up/off/down switches driving them. I also helped with the carpentry and assembly, co-wrote the final report, and presented with the team.';

export const HOVERCRAFT_ROLE =
  'My role: designed and redesigned most of the craft in SolidWorks, and did most of the pre-processing of files into gcode for the printers. My partner designed the motor mounts and got the electronics working.';
