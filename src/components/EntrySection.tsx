import ExpandableSection from '@cloudscape-design/components/expandable-section';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';
import type { Entry, EntrySection } from '../content/data/entry';

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
      {items.map((item) => (
        <li key={item}>
          <Box variant="p">{item}</Box>
        </li>
      ))}
    </ul>
  );
}

export function EntryContent({ sections }: { sections: EntrySection[] }) {
  return (
    <SpaceBetween size="m">
      {sections.map((section, index) => (
        <div key={index}>
          {section.heading && (
            <Box variant="h4" padding={{ top: index === 0 ? 'n' : 's' }}>
              {section.heading}
            </Box>
          )}
          {section.intro && <Box variant="p">{section.intro}</Box>}
          {section.bullets && <BulletList items={section.bullets} />}
        </div>
      ))}
    </SpaceBetween>
  );
}

// `variant="default"` renders with no border/box of its own — this is only ever
// used nested inside a parent Container, so we never get a container nested
// inside another container (see WIDGET-TRACKER.md).
//
// `headerDescription` is a plain string (Cloudscape's ExpandableSection API
// doesn't accept a ReactNode there), so an entry with an `href` builds its own
// period + link row inside `headerText` instead — `headerText` does accept a
// ReactNode — to put the link next to the period rather than at the bottom of
// the expanded content.
export function EntrySectionItem({ entry, defaultExpanded }: { entry: Entry; defaultExpanded?: boolean }) {
  const headerText = entry.href ? (
    <>
      {entry.title}
      <Box variant="small" color="text-body-secondary" display="block">
        {entry.period} · <Link href={entry.href} external>{entry.hrefLabel ?? 'See full project'}</Link>
      </Box>
    </>
  ) : (
    entry.title
  );
  const content = entry.thumbnailSrc ? (
    // `flexWrap: 'wrap'` with a min basis on the text column is what drops the
    // thumbnail below the text on narrow viewports, no media query needed for
    // that part — but capping the text to ~half width (`.entry-thumbnail-text`
    // in index.css) only makes sense once the row hasn't wrapped, which does
    // need one; see that rule's comment.
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start' }}>
      <img
        src={`${import.meta.env.BASE_URL}${entry.thumbnailSrc}`}
        alt={entry.thumbnailAlt ?? entry.title}
        loading="lazy"
        style={{
          flex: '0 0 auto',
          width: 180,
          // ~6 lines of body text tall, per David's sizing.
          height: 140,
          objectFit: 'cover',
          borderRadius: 4,
          border: '1px solid rgba(128, 128, 128, 0.3)',
        }}
      />
      <div className="entry-thumbnail-text" style={{ flex: '1 1 260px', minWidth: 0 }}>
        <EntryContent sections={entry.sections} />
      </div>
    </div>
  ) : (
    <EntryContent sections={entry.sections} />
  );
  return (
    <ExpandableSection
      variant="default"
      headerText={headerText}
      headerDescription={entry.href ? undefined : entry.period}
      defaultExpanded={defaultExpanded}
    >
      {content}
    </ExpandableSection>
  );
}

// The first entry in any list always opens by default — everywhere a group of
// Entries is rendered, use this instead of hand-mapping EntrySectionItem so the
// rule stays automatic and can't drift per page.
export function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <SpaceBetween size="xs">
      {entries.map((entry, index) => (
        <EntrySectionItem key={entry.id} entry={entry} defaultExpanded={index === 0} />
      ))}
    </SpaceBetween>
  );
}

// The common "one tab = a Container of Entries" shape used by every full page
// built on this pattern (Persona Research, Design Systems, AI-Augmented Build,
// Featured Projects) — avoids redefining the same wrapper in each page file.
export function EntryGroupTab({ entries }: { entries: Entry[] }) {
  return (
    <Container>
      <EntryList entries={entries} />
    </Container>
  );
}
