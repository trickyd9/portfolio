import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Tabs from '@cloudscape-design/components/tabs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { AGENTS_AUDITING, PROTOTYPING_PIPELINE, AUTOMATION_TOOLS } from '../content/data/aiAugmentedBuildFull';
import { EntryGroupTab, EntryList } from '../components/EntrySection';
import Widget from '../widgets/Widget';

// AI-Augmented Build full page. Overview reuses the dashboard widget's existing
// pitch, plus the Figma Make → React pipeline folded in (a single entry — too
// thin to justify its own tab). The remaining tabs are the full project-list
// detail behind the pitch (content/data/aiAugmentedBuildFull.ts) — see
// WIDGET-TRACKER.md.
export default function AiAugmentedBuildPage() {
  return (
    <ContentLayout header={<Header variant="h1">AI-Augmented Build</Header>}>
      <Tabs
        tabs={[
          {
            id: 'overview',
            label: 'Overview',
            content: (
              <SpaceBetween size="l">
                <Container header={<Header variant="h2">AI-Augmented Build</Header>}>
                  <Widget widgetId="ai-augmented-build" mode="expanded" />
                </Container>
                <Container header={<Header variant="h2">Figma Make → React Prototyping Pipeline</Header>}>
                  <EntryList entries={[PROTOTYPING_PIPELINE]} />
                </Container>
              </SpaceBetween>
            ),
          },
          { id: 'agents-auditing', label: 'Agents & Auditing', content: <EntryGroupTab entries={AGENTS_AUDITING} /> },
          { id: 'automation-tools', label: 'Automation Tools', content: <EntryGroupTab entries={AUTOMATION_TOOLS} /> },
        ]}
      />
    </ContentLayout>
  );
}
