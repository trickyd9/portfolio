import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Table from '@cloudscape-design/components/table';
import Divider from '@cloudscape-design/components/divider';
import {
  colorBackgroundCellShaded,
  colorBorderDividerDefault,
  borderRadiusContainer,
} from '@cloudscape-design/design-tokens';
import { UX_PROCESS_CAPTION, UX_PROCESS_INTRO, UX_PROCESS_NOTE, UX_PROCESS_STAGES } from '../content/data/uxProcess';
import { UxProcessSummary } from '../components/UxProcessSummary';

// Design Process was a tab on Design Systems & Standards until 2026-08-16, when
// David moved it out to a page of its own directly under Home in the nav. The
// reasoning that had kept it on that page — process and standards are the same
// conversation — is true but made it the one tab there that wasn't a project,
// buried four tabs deep. It's how the work gets done, which is the thing a
// hiring manager wants first, so it now sits second in the menu.
//
// This is a standalone page, not a widget full page: there's no dashboard card
// behind it, so it's routed explicitly and titled via STANDALONE_PAGE_TITLES in
// App.tsx rather than through the widget registry (which would manufacture a
// dashboard card that shouldn't exist).
//
// Content is unchanged from the tab. The h1 comes from ContentLayout and the
// Container carries no header of its own — on the tabbed page the h2 was what
// named the tab's panel; here the page title already does that job, and
// repeating it would read as a heading stutter.
export default function DesignProcessPage() {
  return (
    <ContentLayout header={<Header variant="h1">Design Process</Header>}>
      <Container>
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
    </ContentLayout>
  );
}
