import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Tabs from '@cloudscape-design/components/tabs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';
import { LAUNCHES_PROJECTS, EARLIER_CONTROLS_PROJECTS, PERSONAL_PROJECTS_FULL } from '../content/data/featuredProjectsFull';
import { EntryGroupTab, EntryList } from '../components/EntrySection';
import Widget from '../widgets/Widget';

// Featured Projects full page. Design Systems, Persona Research, and
// AI-Augmented Build projects already have their own dedicated pages with real
// depth (multiple tabs each) — this page doesn't repeat that content, just
// links to it. Launches is folded into Overview (a single entry — too thin to
// justify its own tab); Earlier (Controls) and Personal keep their own tabs
// since they have real multi-entry content. See WIDGET-TRACKER.md.
export default function FeaturedProjectsPage() {
  return (
    <ContentLayout header={<Header variant="h1">Featured Projects</Header>}>
      <Tabs
        tabs={[
          {
            id: 'overview',
            label: 'Overview',
            content: (
              <SpaceBetween size="l">
                <Container header={<Header variant="h2">Featured Projects</Header>}>
                  <Widget widgetId="featured-projects" mode="expanded" />
                </Container>
                <Container header={<Header variant="h2">2025 Platform Launches</Header>}>
                  <EntryList entries={LAUNCHES_PROJECTS} />
                </Container>
                <Container header={<Header variant="h2">More on these categories</Header>}>
                  <SpaceBetween size="s">
                    <Box variant="p">
                      Design Systems, Persona Research, and AI-Augmented Build projects each have their own full page:
                    </Box>
                    <Link href="#/design-systems">Design Systems & Standards</Link>
                    <Link href="#/persona-research">Persona-Driven Research Showcase</Link>
                    <Link href="#/ai-augmented-build">AI-Augmented Build</Link>
                  </SpaceBetween>
                </Container>
              </SpaceBetween>
            ),
          },
          { id: 'earlier-controls', label: 'Earlier (Controls)', content: <EntryGroupTab entries={EARLIER_CONTROLS_PROJECTS} /> },
          { id: 'personal', label: 'Personal', content: <EntryGroupTab entries={PERSONAL_PROJECTS_FULL} /> },
        ]}
      />
    </ContentLayout>
  );
}
