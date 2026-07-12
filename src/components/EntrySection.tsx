import ExpandableSection from '@cloudscape-design/components/expandable-section';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
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
export function EntrySectionItem({ entry, defaultExpanded }: { entry: Entry; defaultExpanded?: boolean }) {
  return (
    <ExpandableSection variant="default" headerText={entry.title} headerDescription={entry.period} defaultExpanded={defaultExpanded}>
      <EntryContent sections={entry.sections} />
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
