// Creative work shown directly on the site — distinct from artPortfolio.ts,
// which is the link-out list of categories on the older WordPress archive.
//
// Images here are watermarked, web-resolution previews (longest edge capped at
// 1400px, re-encoded to strip all metadata). Originals are deliberately not in
// this repo. Regenerate with scripts/fetch-art.py if the source set changes.
//
// Animations stay on YouTube rather than being copied here: video is the one
// medium where hosting it ourselves costs bandwidth and gains nothing, and the
// titles below are the real ones from the channel, not invented.

export interface ArtworkPiece {
  /** Path under public/, e.g. "art/fine-art/exit.jpg". */
  src: string;
  title: string;
  /** The artist's own description, taken from the original portfolio's caption
   * where one exists. Absent means no caption was recorded for that piece. */
  caption?: string;
}

export interface AnimationPiece {
  youtubeId: string;
  title: string;
  caption?: string;
}

// Titles and captions below are the artist's own, taken from the original
// portfolio rather than derived from filenames.
export const FINE_ART: ArtworkPiece[] = [
  {
    src: 'art/fine-art/glacial-bench.jpg',
    title: 'Glacial Bench',
    caption: 'A drawing of a bench at the Mendenhall Glacier in Juneau, Alaska.',
  },
  {
    src: 'art/fine-art/exit.jpg',
    title: 'The Exit',
    caption: 'A perspective drawing of a hallway at the University of Arizona in Tucson.',
  },
  {
    src: 'art/fine-art/enfoldment.jpg',
    title: 'Enfoldment',
    caption: 'An acrylic painting of a still life.',
  },
  {
    src: 'art/fine-art/swingers.jpg',
    title: 'Swing Cats',
    caption: 'A painting using the club logo of a WSU swing dance club, to practice colour tone.',
  },
  {
    src: 'art/fine-art/spearmansmall.jpg',
    title: 'Spearman',
    caption: 'A figure sketch in charcoal, worked with the use of an eraser.',
  },
  {
    src: 'art/fine-art/the-typist-small.jpg',
    title: 'The Typist',
    caption: 'A quick two-minute character sketch in graphite.',
  },
];

// Order matters: the first entry is what a visitor sees before touching
// anything. Beat Buildup is last deliberately — its audio isn't what should
// greet someone opening the card cold.
export const ANIMATIONS: AnimationPiece[] = [
  {
    youtubeId: '2jynTzqyCX0',
    title: 'Checkers',
    caption:
      'The final animation for the class — a short with sound, bringing some character into ordinary checker pieces.',
  },
  {
    youtubeId: 'Go19RoG__9c',
    title: '3 Bouncing Balls',
    caption: 'A class project showing three different materials through animation technique alone. No sound.',
  },
  { youtubeId: 'AdPwlfof138', title: 'Haiku', caption: 'A Flash animation.' },
  {
    youtubeId: 'l6kXVjkpeyA',
    title: 'Syncopated Design',
    caption: 'A logo animation for Syncopated Design, built in Flash.',
  },
  { youtubeId: 'vvByZ4KeF3g', title: 'Beat Buildup', caption: 'Using common sounds to build up a beat.' },
];

// Only the first image in each of these galleries carried recoverable
// metadata; the rest of the titles are still filename-derived and are waiting
// on the artist's own titles/captions.
export const POSTERS: ArtworkPiece[] = [
  { src: 'art/posters/cochin.jpg', title: 'Cochin' },
  {
    src: 'art/posters/consumption.jpg',
    title: 'Consumption',
    caption: 'A poster on the concept of planned obsolescence, using video gaming systems.',
  },
  { src: 'art/posters/stonesans.jpg', title: 'Stone Sans' },
  { src: 'art/posters/bstower.jpg', title: 'B&S Tower' },
  { src: 'art/posters/scposter.jpg', title: 'SC Poster' },
];

export const GRAPHIC_DESIGN: ArtworkPiece[] = [
  {
    src: 'art/graphic-design/logo.jpg',
    title: 'The Elegant Eclair',
    caption: 'A logo created for a bakery in Mountlake Terrace.',
  },
  { src: 'art/graphic-design/ecoveidman.jpg', title: 'Eco Verdance' },
  { src: 'art/graphic-design/hllogo.jpg', title: 'Heart Blossom — Logo' },
  { src: 'art/graphic-design/hlpamphlet.jpg', title: 'Heart Blossom — Pamphlet' },
  { src: 'art/graphic-design/fusionlogooptions.jpg', title: 'Fusion — Logo Options' },
  { src: 'art/graphic-design/cslogooptions.jpg', title: 'CS — Logo Options' },
  { src: 'art/graphic-design/gmglogo.jpg', title: 'GeoManGear' },
  { src: 'art/graphic-design/syncdblk.jpg', title: "Sync'd" },
  { src: 'art/graphic-design/sdlogo.jpg', title: 'SD Logo' },
  { src: 'art/graphic-design/relogo.jpg', title: 'RE Logo' },
  { src: 'art/graphic-design/cologo.jpg', title: 'CO Logo' },
  { src: 'art/graphic-design/itazlogo.jpg', title: 'ITAZ Logo' },
  {
    src: 'art/graphic-design/lqnplanning.jpg',
    title: 'LQN — Planning',
    caption: 'Layout of content for the Lower Quilceda Neighborhood planning project proposal.',
  },
  { src: 'art/graphic-design/paperworks.jpg', title: 'Paperworks' },
  { src: 'art/graphic-design/atoz.jpg', title: 'A to Z' },
  { src: 'art/graphic-design/breakout.jpg', title: 'Breakout' },
  { src: 'art/graphic-design/bahainews.jpg', title: "Baha'i News" },
  { src: 'art/graphic-design/oemenu.jpg', title: 'OE Menu' },
  { src: 'art/graphic-design/ocmenu.jpg', title: 'OC Menu' },
  { src: 'art/graphic-design/fcmenus.jpg', title: 'FC Menus' },
  { src: 'art/graphic-design/fchandout.jpg', title: 'FC Handout' },
];

// Personal work, shown only to the artist persona. Three sources folded into
// one card as mini-stories rather than three thin cards: the home projects
// (which carry real written stories), the "other work" miscellany, and the
// landscape-architecture coursework. Ordered strongest story first.
//
// The home-project captions are drawn from the artist's own write-ups. The
// other-work titles are filename-derived and still want real ones — the
// landscape and other-work galleries carry no per-piece metadata.
export const HOME_PROJECTS: ArtworkPiece[] = [
  {
    src: 'art/home-projects/greatest-name.jpg',
    title: 'Greatest Name — coffin plate',
    caption:
      'Made in 2016 after my grandmother passed away. As a Bahá’í she wished to be buried in a wooden casket with no metal parts. I could not find a CAD drawing of the Greatest Name anywhere, so I modelled it in SolidWorks from photographs. It sat above her heart, fixed to the coffin with a dowel and epoxy.',
  },
  {
    src: 'art/home-projects/greatestnameprinted.jpg',
    title: 'Greatest Name — the two cuts',
    caption:
      'It was meant to be 3D-printed, but a failed print and a hard deadline meant switching to laser cutting — both of these were cut in about 45 minutes. Plywood on the left, acrylic on the right with its backing still attached. The family chose the plywood.',
  },
  {
    src: 'art/home-projects/greatestnamecad.jpg',
    title: 'Greatest Name — SolidWorks model',
    caption: 'The design model, with the material set as maple.',
  },
  {
    src: 'art/home-projects/modulargreenhouse2.jpg',
    title: 'Modular greenhouse',
    caption:
      'Built in 2011 as a gift for my wife — to save very limited space and give the more tropical plants somewhere more humid. Two stacking modules on a 15in square base, pine, stained and sealed, opened by a door or a velcro flap on top. A rough and blocky first iteration, made with basic tools.',
  },
  {
    src: 'art/home-projects/shrimpsmall.jpg',
    title: 'Self-sustaining aquatic ecosystem',
    caption:
      'Cherry shrimp in a self-sustaining tank, built up in layers of soil and rock, with java moss and larger rocks giving the shrimp places to hide.',
  },
  { src: 'art/home-projects/mysteryambigram.jpg', title: 'Ambigram — “Mystery”' },
  { src: 'art/home-projects/davidambigram.jpg', title: 'Ambigram — “David”' },
  { src: 'art/home-projects/cdcover.jpg', title: 'CD cover' },
  { src: 'art/home-projects/lleheartlady.jpg', title: 'Lucy Loves Ethel — illustration' },
  { src: 'art/home-projects/hlvisor.jpg', title: 'Heart Blossom — visor' },
  { src: 'art/home-projects/sdblogweb.jpg', title: 'Syncopated Design — blog' },
  { src: 'art/home-projects/oweb.jpg', title: 'Web design' },
  { src: 'art/home-projects/apocweb.jpg', title: 'Web design' },
  {
    src: 'art/home-projects/uvill.jpg',
    title: 'University Village — proposal',
    caption:
      'From an Introduction to Landscape Architecture class at the University of Washington — a theoretical proposal for redesigning part of University Village.',
  },
  {
    src: 'art/home-projects/uvilpersps.jpg',
    title: 'University Village — perspectives',
    caption: 'Perspective studies for the same proposal.',
  },
  {
    src: 'art/home-projects/uvilsects.jpg',
    title: 'University Village — sections',
    caption: 'Sections through the proposed scheme.',
  },
  {
    src: 'art/home-projects/ubna.jpg',
    title: 'Union Bay Natural Area — proposal',
    caption: 'A theoretical redesign proposal for the Union Bay Natural Area in Seattle, from the same class.',
  },
];

/** Stated plainly because the research found artists read this as meaningful
 * rather than assumed — and this work sits alongside AI-assisted professional
 * work elsewhere on the site, which makes the distinction worth making. */
export const HUMAN_MADE_NOTE = 'All of this work is hand-made — no generative AI was used in any of it.';
