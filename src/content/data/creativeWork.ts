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

export const ANIMATIONS: AnimationPiece[] = [
  { youtubeId: 'vvByZ4KeF3g', title: 'Beat Buildup' },
  { youtubeId: '2jynTzqyCX0', title: 'Checkers' },
  { youtubeId: 'AdPwlfof138', title: 'Haiku' },
  { youtubeId: 'l6kXVjkpeyA', title: 'Flash Syncopation' },
  { youtubeId: 'Go19RoG__9c', title: 'Showing Differences in Maya' },
];

/** Stated plainly because the research found artists read this as meaningful
 * rather than assumed — and this work sits alongside AI-assisted professional
 * work elsewhere on the site, which makes the distinction worth making. */
export const HUMAN_MADE_NOTE = 'All of this work is hand-made — no generative AI was used in any of it.';
