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

export const HOVERCRAFT_ROLE =
  'My role: designed and redesigned most of the craft in SolidWorks, and did most of the pre-processing of files into gcode for the printers. My partner designed the motor mounts and got the electronics working.';
