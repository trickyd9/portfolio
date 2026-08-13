import ExpandableSection from '@cloudscape-design/components/expandable-section';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';
import type { ArtCategory } from '../content/data/artPortfolio';

export interface Thumbnail {
  thumbSrc: string;
  title: string;
}

// One category = one expandable section: description, then a thumbnail grid.
// Every thumbnail links to the same place — the category's own post on the
// source site (David's choice: post/gallery page, not the raw original file,
// to keep the same watermark/resolution protection everywhere except that
// one linked-out post). Falls back to a plain link when thumbnails for a
// category aren't ready yet, rather than blocking the whole section.
export function ArtCategorySection({
  category,
  thumbnails,
  defaultExpanded,
}: {
  category: ArtCategory;
  thumbnails?: Thumbnail[];
  defaultExpanded?: boolean;
}) {
  return (
    <ExpandableSection variant="default" headerText={category.title} defaultExpanded={defaultExpanded}>
      <SpaceBetween size="s">
        <Box variant="p">{category.description}</Box>
        {thumbnails ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 12 }}>
            {thumbnails.map((piece) => (
              <a
                key={piece.thumbSrc}
                href={category.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${piece.title} — view on trickyddesign.wordpress.com`}
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <img
                  src={piece.thumbSrc}
                  alt={piece.title}
                  title={piece.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 120,
                    objectFit: 'cover',
                    borderRadius: 4,
                    border: '1px solid rgba(128, 128, 128, 0.3)',
                  }}
                />
                <Box variant="small" color="text-body-secondary" textAlign="center" padding={{ top: 'xxs' }}>
                  {piece.title}
                </Box>
              </a>
            ))}
          </div>
        ) : (
          <Link href={category.href} external>
            View on trickyddesign.wordpress.com
          </Link>
        )}
      </SpaceBetween>
    </ExpandableSection>
  );
}
