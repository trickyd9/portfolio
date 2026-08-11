import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Tabs from '@cloudscape-design/components/tabs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Table from '@cloudscape-design/components/table';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import type { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';
import Link from '@cloudscape-design/components/link';
import {
  CAREER_PERSONA_RESEARCH,
  METHODOLOGY,
  APPLICATIONS,
  OVERVIEW_HIGHLIGHTS,
  CONFIDENCE_TIER_LABEL,
  careerPersonaResearchPath,
  rollupConfidence,
  type ConfidenceTier,
} from '../content/data/careerPersonaResearch';
import { EntryList } from '../components/EntrySection';
import { StatGrid } from '../components/StatGrid';

const TIER_STATUS_TYPE: Record<ConfidenceTier, StatusIndicatorProps.Type> = {
  'single-voice': 'pending',
  substantiated: 'info',
  verified: 'success',
};

// "Career Persona Research" — a new page under the top-level Persona nav
// section, alongside the renamed AWS Persona page. Distinct project from AWS
// Persona: this is desk research on how *portfolio visitors* (not AWS
// customers) evaluate UX portfolios — see careerPersonaResearch.ts's header
// comment. Not a widget's full page (no dashboard card), so it isn't routed
// through widgetsWithFullPages() — hand-specified in App.tsx like /job-market.
export default function CareerPersonaResearchPage() {
  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="Research into how six different kinds of visitor actually read a design portfolio — and what that means for building one"
        >
          Career Persona Research
        </Header>
      }
    >
      <Tabs
        tabs={[
          {
            id: 'overview',
            label: 'Overview',
            content: (
              <SpaceBetween size="l">
                <Container header={<Header variant="h2">{METHODOLOGY[0].title}</Header>}>
                  <Box variant="p">{METHODOLOGY[0].sections[0].intro}</Box>
                </Container>
                <Container header={<Header variant="h2">By the numbers</Header>}>
                  <StatGrid stats={OVERVIEW_HIGHLIGHTS} />
                </Container>
                <Container>
                  <EntryList entries={METHODOLOGY.slice(1)} />
                </Container>
              </SpaceBetween>
            ),
          },
          {
            id: 'personas',
            label: 'Personas',
            content: (
              <Table
                variant="container"
                header={
                  <Header
                    variant="h2"
                    counter={`(${CAREER_PERSONA_RESEARCH.length})`}
                    description="Select any persona for the full findings — what they look for, what loses them, what catches their eye, and how AI is changing their read."
                  >
                    The six visitor types
                  </Header>
                }
                columnDefinitions={[
                  {
                    id: 'persona',
                    header: 'Persona',
                    cell: (item) => <Link href={`#${careerPersonaResearchPath(item.id)}`}>{item.label}</Link>,
                    width: 220,
                  },
                  {
                    id: 'confidence',
                    header: 'Confidence',
                    cell: (item) => {
                      const { tier, breakdown } = rollupConfidence(item.confidence);
                      return (
                        <SpaceBetween size="xxs">
                          <StatusIndicator type={TIER_STATUS_TYPE[tier]}>{CONFIDENCE_TIER_LABEL[tier]}</StatusIndicator>
                          <Box variant="small" color="text-body-secondary" display="block">
                            {breakdown} (of 5 questions)
                          </Box>
                        </SpaceBetween>
                      );
                    },
                    width: 220,
                  },
                  {
                    id: 'factoids',
                    header: 'How they read',
                    cell: (item) => (
                      <ul style={{ margin: 0, paddingLeft: '18px' }}>
                        {item.factoids.map((f) => (
                          <li key={f}>
                            <Box variant="small">{f}</Box>
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                ]}
                items={CAREER_PERSONA_RESEARCH}
              />
            ),
          },
          {
            id: 'applications',
            label: 'Applications',
            content: (
              <Container>
                <EntryList entries={APPLICATIONS} />
              </Container>
            ),
          },
        ]}
      />
    </ContentLayout>
  );
}
