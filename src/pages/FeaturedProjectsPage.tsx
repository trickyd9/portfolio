import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Tabs from '@cloudscape-design/components/tabs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';
import { LAUNCHES, EARLIER_CONTROLS_PROJECTS } from '../content/data/featuredProjectsFull';
import { PROJECTS, type ProjectCategory } from '../content/data/projects';
import { EntryGroupTab } from '../components/EntrySection';
import { StatGrid } from '../components/StatGrid';

// Design Systems / Persona Research / AI-Augmented Build each have their own
// dedicated full page — declared here rather than reusing widgetContent.ts's
// CATEGORY_PAGE (private to that file, and this page also needs a display
// label per category, which that map doesn't carry). "Persona Research" shows
// as "AWS Persona" — the page's real title (widgets.ts is the single source
// of truth for that rename); the category string itself stays internal.
const CATEGORY_SECTIONS: Array<{ category: ProjectCategory; label: string; href: string }> = [
  { category: 'Design Systems', label: 'Design Systems & Standards', href: '#/design-systems' },
  { category: 'Persona Research', label: 'AWS Persona', href: '#/persona-research' },
  { category: 'AI-Augmented Build', label: 'AI-Augmented Build', href: '#/ai-augmented-build' },
];

// Featured Projects full page. Design Systems, Persona Research, and
// AI-Augmented Build projects already have their own dedicated pages with real
// depth (multiple tabs each) — this page doesn't repeat that content in full,
// just a bolded-title + description line per project under a single linked
// category heading (no per-project links, no category dropdown — not enough
// volume yet to justify filtering). Launches is folded into Overview; Earlier
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
                  <SpaceBetween size="l">
                    {CATEGORY_SECTIONS.map((section) => (
                      <div key={section.category}>
                        <Header variant="h3">
                          <Link href={section.href}>{section.label}</Link>
                        </Header>
                        <SpaceBetween size="s">
                          {PROJECTS.filter((p) => p.category === section.category).map((project) => (
                            <div key={project.title}>
                              <Box variant="strong" display="block">
                                {project.title}
                              </Box>
                              <Box variant="p">{project.description}</Box>
                            </div>
                          ))}
                        </SpaceBetween>
                      </div>
                    ))}
                  </SpaceBetween>
                </Container>
                <Container header={<Header variant="h2">2025 Platform Launches</Header>}>
                  <SpaceBetween size="xxl">
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
                        <Box padding={{ bottom: 's' }}>
                          <StatGrid stats={launch.stats} size="small" />
                        </Box>
                        <Box variant="p">{launch.description}</Box>
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
