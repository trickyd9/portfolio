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
}

export interface AnimationPiece {
  youtubeId: string;
  title: string;
}

export const FINE_ART: ArtworkPiece[] = [
  { src: 'art/fine-art/glacial-bench.jpg', title: 'Glacial Bench' },
  { src: 'art/fine-art/exit.jpg', title: 'Exit' },
  { src: 'art/fine-art/enfoldment.jpg', title: 'Enfoldment' },
  { src: 'art/fine-art/swingers.jpg', title: 'Swingers' },
  { src: 'art/fine-art/spearmansmall.jpg', title: 'Spearman' },
  { src: 'art/fine-art/the-typist-small.jpg', title: 'The Typist' },
];

// Order matters: the first entry is what a visitor sees before touching
// anything. Beat Buildup is last deliberately — its audio isn't what should
// greet someone opening the card cold.
export const ANIMATIONS: AnimationPiece[] = [
  { youtubeId: '2jynTzqyCX0', title: 'Checkers' },
  { youtubeId: 'AdPwlfof138', title: 'Haiku' },
  { youtubeId: 'l6kXVjkpeyA', title: 'Flash Syncopation' },
  { youtubeId: 'Go19RoG__9c', title: 'Showing Differences in Maya' },
  { youtubeId: 'vvByZ4KeF3g', title: 'Beat Buildup' },
];

// Titles below are derived from the source filenames where the gallery didn't
// carry one — worth correcting any that are wrong.
export const POSTERS: ArtworkPiece[] = [
  { src: 'art/posters/cochin.jpg', title: 'Cochin' },
  { src: 'art/posters/consumption.jpg', title: 'Consumption' },
  { src: 'art/posters/stonesans.jpg', title: 'Stone Sans' },
  { src: 'art/posters/bstower.jpg', title: 'B&S Tower' },
  { src: 'art/posters/scposter.jpg', title: 'SC Poster' },
];

export const GRAPHIC_DESIGN: ArtworkPiece[] = [
  { src: 'art/graphic-design/logo.jpg', title: 'The Elegant Eclair' },
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
  { src: 'art/graphic-design/lqnplanning.jpg', title: 'LQN Planning' },
  { src: 'art/graphic-design/paperworks.jpg', title: 'Paperworks' },
  { src: 'art/graphic-design/atoz.jpg', title: 'A to Z' },
  { src: 'art/graphic-design/breakout.jpg', title: 'Breakout' },
  { src: 'art/graphic-design/bahainews.jpg', title: "Baha'i News" },
  { src: 'art/graphic-design/oemenu.jpg', title: 'OE Menu' },
  { src: 'art/graphic-design/ocmenu.jpg', title: 'OC Menu' },
  { src: 'art/graphic-design/fcmenus.jpg', title: 'FC Menus' },
  { src: 'art/graphic-design/fchandout.jpg', title: 'FC Handout' },
];

/** Stated plainly because the research found artists read this as meaningful
 * rather than assumed — and this work sits alongside AI-assisted professional
 * work elsewhere on the site, which makes the distinction worth making. */
export const HUMAN_MADE_NOTE = 'All of this work is hand-made — no generative AI was used in any of it.';
