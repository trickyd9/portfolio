import { useSearchParams } from 'react-router-dom';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Tabs from '@cloudscape-design/components/tabs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Table from '@cloudscape-design/components/table';
import Divider from '@cloudscape-design/components/divider';
import {
  colorBackgroundCellShaded,
  colorBorderDividerDefault,
  borderRadiusContainer,
} from '@cloudscape-design/design-tokens';
import { TENETS_AUDIT, STANDARDS_WIKI, STANDARDS_WEBSITE, ROADMAP_ENABLEMENT } from '../content/data/designSystemsFull';
import { UX_PROCESS_CAPTION, UX_PROCESS_INTRO, UX_PROCESS_NOTE, UX_PROCESS_STAGES } from '../content/data/uxProcess';
import { EntryGroupTab } from '../components/EntrySection';
import { UxProcessSummary } from '../components/UxProcessSummary';
import Widget from '../widgets/Widget';

/** The `?tab=` value that opens the Design Process tab — imported by the About
 *  page so the link and the tab id can't drift apart. */
export const DESIGN_PROCESS_TAB_ID = 'design-process';

function DesignProcessTab() {
  return (
    <Container header={<Header variant="h2">Design Process</Header>}>
      <SpaceBetween size="l">
        <Box variant="p">{UX_PROCESS_INTRO}</Box>
        <UxProcessSummary />
        <Box variant="small" color="text-body-secondary">
          {UX_PROCESS_CAPTION}
        </Box>
        <Divider />
        {/* `variant="embedded"` because this table already sits inside a
            Container — the site's no-container-in-container rule. */}
        <Table
          variant="embedded"
          header={<Header variant="h3">Stage detail</Header>}
          items={UX_PROCESS_STAGES}
          columnDefinitions={[
            { id: 'stage', header: 'Stage', cell: (item) => item.stage, width: 100 },
            { id: 'activity', header: 'Activity', cell: (item) => <Box variant="strong">{item.activity}</Box>, width: 230 },
            { id: 'who', header: "Who's in the room", cell: (item) => item.who, width: 220 },
            { id: 'movesOn', header: 'Moves on when', cell: (item) => item.movesOn },
          ]}
        />
        {/* Same shaded-container treatment the Persona Dashboard uses for its
            lead paragraph: reads as commentary rather than as another panel of
            content. Values are Cloudscape design tokens, never hand-picked. */}
        <Container
          style={{
            root: {
              background: colorBackgroundCellShaded,
              borderColor: colorBorderDividerDefault,
              borderRadius: borderRadiusContainer,
              borderWidth: '1px',
              boxShadow: 'none',
            },
          }}
        >
          <SpaceBetween size="s">
            <Box variant="h4" padding="n">
              {UX_PROCESS_NOTE.heading}
            </Box>
            {UX_PROCESS_NOTE.paragraphs.map((paragraph) => (
              <Box variant="p" key={paragraph.slice(0, 40)}>
                {paragraph}
              </Box>
            ))}
          </SpaceBetween>
        </Container>
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
// Design Process (2026-08-16) is the one tab here that isn't a project — it's
// how the work gets done rather than what was delivered. It sits on this page
// because process and standards are the same conversation, and the About page's
// Overview links straight to it.
//
// Tabs on this page are URL-addressable (`#/design-systems?tab=design-process`)
// so that link can land on the right tab. Cloudscape Tabs are uncontrolled by
// default and hold the active tab in component state alone, which no incoming
// link can reach. This is the only page that needs it so far; generalize to the
// other tabbed pages if a second link ever has to point at a specific tab.
export default function DesignSystemsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = [
    {
      id: 'design-systems',
      label: 'Design Systems & Standards',
      content: (
        <Container header={<Header variant="h2">Design Systems & Standards</Header>}>
          <Widget widgetId="design-systems-standards" mode="expanded" />
        </Container>
      ),
    },
    {
      id: DESIGN_PROCESS_TAB_ID,
      label: 'Design Process',
      content: <DesignProcessTab />,
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
