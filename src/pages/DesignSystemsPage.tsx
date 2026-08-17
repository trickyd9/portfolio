import { useSearchParams } from 'react-router-dom';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Tabs from '@cloudscape-design/components/tabs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Table from '@cloudscape-design/components/table';
import Divider from '@cloudscape-design/components/divider';
import { TENETS_AUDIT, STANDARDS_WIKI, STANDARDS_WEBSITE, ROADMAP_ENABLEMENT } from '../content/data/designSystemsFull';
import { UX_STANDARDS_CAPTION, UX_STANDARDS_INTRO, UX_STANDARDS_LAYERS } from '../content/data/uxStandards';
import { EntryGroupTab } from '../components/EntrySection';
import { UxStandardsStack } from '../components/UxStandardsStack';
import Widget from '../widgets/Widget';

// The lead tab. It used to be the widget alone; the stack diagram was added
// 2026-08-16 so the page opens by *showing* the three-layer structure the widget
// could only assert in a sentence, and — the part no prose on the page carried —
// what each of those layers does to a feature while it is being built.
//
// Order is the same as the Design Process tab below: intro, diagram, caption,
// then the detail. The widget sits last rather than first because it is the
// numbers behind the structure, not the structure itself; it stays in place
// unchanged because the Persona Dashboard renders the same widget.
function StandardsStackTab() {
  return (
    <Container header={<Header variant="h2">Design Systems & Standards</Header>}>
      <SpaceBetween size="l">
        <Box variant="p">{UX_STANDARDS_INTRO}</Box>
        <UxStandardsStack />
        <Box variant="small" color="text-body-secondary">
          {UX_STANDARDS_CAPTION}
        </Box>
        <Divider />
        {/* `variant="embedded"` — already inside a Container, per the site's
            no-container-in-container rule.
            `wrapLines` is load-bearing, not cosmetic: Cloudscape's Table defaults
            it to false, which clips any cell too long for its column rather than
            wrapping it. The two longest rows here (02 and verify) lost the end of
            their sentence in both themes without it.
            Three columns, not four. A "Where a builder meets it" column was tried
            and cut because it restates the diagram's right-hand column — the
            diagram carries what each layer does, this table defines what it is. */}
        <Table
          variant="embedded"
          wrapLines
          header={<Header variant="h3">Layer detail</Header>}
          items={UX_STANDARDS_LAYERS}
          columnDefinitions={[
            { id: 'layer', header: 'Layer', cell: (item) => item.layer, width: 90 },
            {
              id: 'name',
              header: 'What it is',
              width: 200,
              cell: (item) => (
                <>
                  <Box variant="strong" display="block">
                    {item.name}
                  </Box>
                  <Box variant="small" color="text-body-secondary" display="block">
                    {item.countLabel}
                  </Box>
                </>
              ),
            },
            { id: 'decides', header: 'What it decides', cell: (item) => item.decides },
          ]}
        />
        <Divider />
        <Widget widgetId="design-systems-standards" mode="expanded" />
      </SpaceBetween>
    </Container>
  );
}

// Design Systems & Standards full page, on the shared project-page standard
// (2026-08-13, matching Featured Projects): the lead tab is named for its
// content rather than "Overview", every tab's container carries an h2 header,
// and each tab holds one kind of thing. The Standards Website used to be folded
// into the lead tab as a second container; it's a project, so it moved out to a
// tab of its own like the launches did on Featured Projects. That tab became
// "Standards Reference" (2026-08-13) when the UX Standards & Requirements Wiki
// landed: the wiki superseded the website, so the two belong together as one
// progression rather than as two sibling tabs. The grouped tabs are the full
// project-list detail behind the pitch (content/data/designSystemsFull.ts) —
// see WIDGET-TRACKER.md.
//
// Design Process was briefly a tab here (2026-08-16) and moved out to its own
// page the same day — see pages/DesignProcessPage.tsx. It was the one tab that
// wasn't a project, and David wanted it directly under Home rather than four
// tabs deep. Every tab remaining on this page is a project.
//
// Tabs here stay URL-addressable (`#/design-systems?tab=standards-reference`)
// even though the link that needed it has gone with the Design Process tab.
// Cloudscape Tabs are uncontrolled by default and hold the active tab in
// component state alone, which no incoming link can reach; this restores the
// ability to link at a specific tab, and is kept because the next such link is
// more likely than not. Generalize to the other tabbed pages when one appears.
export default function DesignSystemsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = [
    {
      id: 'design-systems',
      label: 'Design Systems & Standards',
      content: <StandardsStackTab />,
    },
    {
      id: 'standards-reference',
      label: 'Standards Reference',
      content: <EntryGroupTab entries={[STANDARDS_WIKI, STANDARDS_WEBSITE]} header="Standards Reference" />,
    },
    {
      id: 'tenets-audit',
      label: 'Tenets & Audit',
      content: <EntryGroupTab entries={TENETS_AUDIT} header="Tenets & Audit" />,
    },
    {
      id: 'roadmap-enablement',
      label: 'Roadmap & Enablement',
      content: <EntryGroupTab entries={ROADMAP_ENABLEMENT} header="Roadmap & Enablement" />,
    },
  ];

  // An unrecognised ?tab= value falls back to the first tab rather than leaving
  // the page with no tab selected at all.
  const requested = searchParams.get('tab');
  const activeTabId = tabs.some((tab) => tab.id === requested) ? requested! : tabs[0].id;

  return (
    <ContentLayout header={<Header variant="h1">Design Systems & Standards</Header>}>
      <Tabs
        activeTabId={activeTabId}
        onChange={({ detail }) => {
          // `replace` so flipping tabs doesn't stack history entries a visitor
          // then has to click Back through. Selecting the default tab drops the
          // param entirely, keeping the page's plain URL clean.
          setSearchParams(detail.activeTabId === tabs[0].id ? {} : { tab: detail.activeTabId }, { replace: true });
        }}
        tabs={tabs}
      />
    </ContentLayout>
  );
}
