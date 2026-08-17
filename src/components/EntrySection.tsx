import type { ReactNode } from 'react';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';
import type { Entry, EntrySection } from '../content/data/entry';

// `items` is ReactNode rather than string so a caller can emphasize part of a
// bullet (AiBuildStackPage does) without every list on the site growing its own
// <ul>. Plain strings still work unchanged, which is what every other caller
// passes. Keyed by index because a node isn't a usable key and these lists are
// static — nothing reorders, inserts, or removes.
export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
      {items.map((item, index) => (
        <li key={index}>
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

// The flat "project line" treatment used across the project pages: bold title,
// body directly below, no accordion, no period line, no per-project link.
// Defined here once so Featured Projects (whose data is plain
// {title, description}) and the three specialization pages (whose data is
// Entry) can't drift apart visually — they render through the same primitive.
export function ProjectLine({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <Box variant="strong" display="block">
        {title}
      </Box>
      {children}
    </div>
  );
}

// Entry-shaped projects rendered as flat lines rather than accordions — the
// standard for the project pages as of 2026-08-13. `EntryContent` still does
// the section rendering, so an entry with headings or bullets keeps them; what
// goes away is the ExpandableSection wrapper and the period line, matching how
// Featured Projects presents the same kind of content.
export function EntryLines({ entries }: { entries: Entry[] }) {
  return (
    <SpaceBetween size="l">
      {entries.map((entry) => (
        <ProjectLine key={entry.id} title={entry.title}>
          <EntryContent sections={entry.sections} />
        </ProjectLine>
      ))}
    </SpaceBetween>
  );
}

// The first entry in any list always opens by default — everywhere a group of
// Entries is rendered, use this instead of hand-mapping EntrySectionItem so the
// rule stays automatic and can't drift per page.
//
// Still the right component for long-form, genuinely expandable content (the
// About page's Work Experience and Schooling tabs). The project pages use
// EntryLines above instead.
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
//
// `header` is optional only so this stays a drop-in for any call site that
// hasn't been given one yet; every current caller passes it. A tab whose
// container has no header leaves the panel opening straight into content with
// nothing naming it, which is the gap the project pages were standardized to
// close (2026-08-13).
export function EntryGroupTab({ entries, header }: { entries: Entry[]; header?: string }) {
  return (
    <Container header={header ? <Header variant="h2">{header}</Header> : undefined}>
      <EntryLines entries={entries} />
    </Container>
  );
}
