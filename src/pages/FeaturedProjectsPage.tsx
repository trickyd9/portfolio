import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Tabs from '@cloudscape-design/components/tabs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import { LAUNCHES, EARLIER_CONTROLS_PROJECTS } from '../content/data/featuredProjectsFull';
import { EntryGroupTab } from '../components/EntrySection';
import { StatGrid } from '../components/StatGrid';
import Widget from '../widgets/Widget';

// Featured Projects full page. Design Systems, Persona Research, and
// AI-Augmented Build projects already have their own dedicated pages with real
// depth (multiple tabs each) — this page doesn't repeat that content, and
// doesn't link out to it either (dropped 2026-08 — those pages are already one
// click away via the side nav, and the plain link list read as inconsistent
// with the rest of the site). Launches is folded into Overview; Earlier
// (Controls) keeps its own tab since it has real multi-entry content. Personal
// (Hovercraft/Hyperloop/EcoCar) no longer has a tab here at all — it was a
// thinner duplicate of the real write-ups now on the About page's Schooling
// tab. See WIDGET-TRACKER.md.
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
                  <SpaceBetween size="l">
                    <Box variant="p" color="text-body-secondary">
                      Contributed as a team member to three 2025 launches:
                    </Box>
                    {LAUNCHES.map((launch) => (
                      <div key={launch.id}>
                        <Box variant="h3" padding="n">
                          {launch.title}
                        </Box>
                        <Box variant="small" color="text-body-secondary" display="block" padding={{ bottom: 's' }}>
                          {launch.period}
                        </Box>
                        <Box variant="p" padding={{ bottom: 's' }}>
                          {launch.description}
                        </Box>
                        <StatGrid stats={launch.stats} size="small" />
                      </div>
                    ))}
                  </SpaceBetween>
                </Container>
              </SpaceBetween>
            ),
          },
          { id: 'earlier-controls', label: 'Earlier (Controls)', content: <EntryGroupTab entries={EARLIER_CONTROLS_PROJECTS} /> },
        ]}
      />
    </ContentLayout>
  );
}
