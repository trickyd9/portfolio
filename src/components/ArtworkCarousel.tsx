import { useState } from 'react';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import type { ArtworkPiece } from '../content/data/creativeWork';

// One piece at a time with prev/next, rather than a scrolling strip of
// thumbnails: the research behind the Persona Dashboard found presentation
// quality can outrank execution for an art audience, and a row of small
// thumbnails is the opposite of that. Images are watermarked previews — see
// content/data/creativeWork.ts.
export function ArtworkCarousel({ pieces }: { pieces: ArtworkPiece[] }) {
  const [index, setIndex] = useState(0);
  if (pieces.length === 0) return <Box color="text-status-inactive">No pieces to show.</Box>;

  const piece = pieces[index];
  const go = (delta: number) => setIndex((i) => (i + delta + pieces.length) % pieces.length);

  return (
    <SpaceBetween size="xs">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 240,
          maxHeight: 460,
          overflow: 'hidden',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}${piece.src}`}
          alt={piece.title}
          loading="lazy"
          style={{ maxWidth: '100%', maxHeight: 460, objectFit: 'contain' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <Button variant="icon" iconName="angle-left" ariaLabel="Previous piece" onClick={() => go(-1)} />
        <Box variant="small" color="text-body-secondary" textAlign="center">
          {piece.title} · {index + 1} of {pieces.length}
        </Box>
        <Button variant="icon" iconName="angle-right" ariaLabel="Next piece" onClick={() => go(1)} />
      </div>
    </SpaceBetween>
  );
}

// Animations stay on YouTube (see creativeWork.ts). youtube-nocookie keeps the
// embed from setting tracking cookies for visitors who only ever look at it.
export function AnimationPlayer({ pieces }: { pieces: Array<{ youtubeId: string; title: string }> }) {
  const [index, setIndex] = useState(0);
  if (pieces.length === 0) return <Box color="text-status-inactive">No animations to show.</Box>;

  const piece = pieces[index];
  const go = (delta: number) => setIndex((i) => (i + delta + pieces.length) % pieces.length);

  return (
    <SpaceBetween size="xs">
      {/* aspectRatio rather than the padding-top ratio hack: inside a
          SpaceBetween/BoardItem the padded wrapper collapsed and the embed
          rendered at thumbnail size in the corner. */}
      <div style={{ width: '100%', aspectRatio: '16 / 9', minHeight: 180 }}>
        <iframe
          key={piece.youtubeId}
          src={`https://www.youtube-nocookie.com/embed/${piece.youtubeId}`}
          title={piece.title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: 'block', width: '100%', height: '100%', border: 0 }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <Button variant="icon" iconName="angle-left" ariaLabel="Previous animation" onClick={() => go(-1)} />
        <Box variant="small" color="text-body-secondary" textAlign="center">
          {piece.title} · {index + 1} of {pieces.length}
        </Box>
        <Button variant="icon" iconName="angle-right" ariaLabel="Next animation" onClick={() => go(1)} />
      </div>
    </SpaceBetween>
  );
}
