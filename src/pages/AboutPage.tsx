import { useState } from 'react';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Tabs from '@cloudscape-design/components/tabs';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import Table from '@cloudscape-design/components/table';
import Badge from '@cloudscape-design/components/badge';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';
import Button from '@cloudscape-design/components/button';
import Divider from '@cloudscape-design/components/divider';
import { CONTACT } from '../content/contact';
import { PROJECTS } from '../content/data/projects';
import { DEGREES, CERTIFICATIONS } from '../content/data/schooling';
import { PROFESSIONAL_ROLES, ACADEMIC_GROUP, ACADEMIC_STANDALONE_ROLES } from '../content/data/experience';
import { VOLUNTEER_ROLES } from '../content/data/hobbies';
import { ART_CATEGORIES } from '../content/data/artPortfolio';
import { SKILL_CATEGORIES } from '../content/data/skills';
import { EntryList } from '../components/EntrySection';
import headshot from '../assets/david-headshot.jpg';

const RESUME_PDF = `${import.meta.env.BASE_URL}David-Trick-Resume.pdf`;
const RESUME_MD = `${import.meta.env.BASE_URL}David-Trick-Resume.md`;
const PROJECT_LIST_PDF = `${import.meta.env.BASE_URL}David-Trick-Project-List.pdf`;
const PROJECT_LIST_MD = `${import.meta.env.BASE_URL}David-Trick-Project-List.md`;

const CALLOUT = 'Leader, collaborator, and driving force for intuitive, clear design.';

const PERSONAL_PROJECTS = PROJECTS.filter((p) => p.category === 'Personal');

function DownloadLinks() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <SpaceBetween size="l" direction="horizontal">
        <Button variant="inline-link" href={PROJECT_LIST_PDF} download="David-Trick-Project-List.pdf">
          AWS Project List (.pdf)
        </Button>
        <Button variant="inline-link" href={PROJECT_LIST_MD} download="David-Trick-Project-List.md">
          AWS Project List (.md)
        </Button>
        <Button variant="inline-link" href={RESUME_PDF} download="David-Trick-Resume.pdf">
          Resume (.pdf)
        </Button>
        <Button variant="inline-link" href={RESUME_MD} download="David-Trick-Resume.md">
          Resume (.md)
        </Button>
      </SpaceBetween>
    </div>
  );
}

function OverviewTab() {
  return (
    <SpaceBetween size="l">
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <img src={headshot} alt="David Trick" style={{ flex: '0 0 220px', width: '220px', height: 'auto' }} />
        <div style={{ flex: '1 1 320px' }}>
          <SpaceBetween size="s">
            <div>
              <Box variant="strong" display="block">
                Design Technologist
              </Box>
              <Box variant="small" display="block" color="text-body-secondary">
                <em>User Experience, Design, Programming, AI integration, Persona Development</em>
              </Box>
            </div>
            <div>
              <Box variant="strong" display="block">
                Mechanical Engineer
              </Box>
              <Box variant="small" display="block" color="text-body-secondary">
                <em>System Dynamics, 3D modeling, Rapid Prototyping, Sustainable Energy Production</em>
              </Box>
            </div>
            <Box variant="p">
              I have over 9 years of experience as a Software UX Designer at AWS, standardizing and creating
              intuitive user experiences for a data center monitoring platform. Our current product is used and
              supported by 20+ teams across 200+ AWS data center sites globally. I am the sole UX designer
              responsible for the platform's vision, standards, design systems, research, and cross-team UX
              coordination.
            </Box>
            <Box variant="p">
              I specialize in persona-driven research and design as the method for taking a multi-role industrial
              product from one-size-fits-all toward role-specific interface logic. This was accomplished by
              generating persona candidates, validating with field customers, and incorporating the results into
              shipped pages.
            </Box>
          </SpaceBetween>
        </div>
      </div>
      <Divider />
      <DownloadLinks />
    </SpaceBetween>
  );
}

function SchoolingTab() {
  return (
    <SpaceBetween size="l">
      {DEGREES.map((degree, index) => (
        <ExpandableSection
          key={degree.id}
          variant="container"
          headerText={degree.university}
          headerDescription={`${degree.degree} — ${degree.period}`}
          defaultExpanded={index === 0}
        >
          <SpaceBetween size="m">
            {degree.note && <Box variant="p">{degree.note}</Box>}
            {degree.portfolioHref && (
              <Link href={degree.portfolioHref} external>
                Portfolio of work from this time
              </Link>
            )}
            {degree.projects && (
              <div>
                <Box variant="h4" padding="n">
                  Projects from this time
                </Box>
                <SpaceBetween size="s">
                  {degree.projects.map((project) => (
                    <div key={project.title}>
                      <Box variant="strong" display="block">
                        {project.title}
                      </Box>
                      <Box variant="p">{project.description}</Box>
                    </div>
                  ))}
                </SpaceBetween>
              </div>
            )}
            {degree.recommendation && (
              <div style={{ borderLeft: '3px solid rgba(128, 128, 128, 0.4)', paddingLeft: '12px' }}>
                <Box variant="p" fontSize="heading-s">
                  “{degree.recommendation.text}”
                </Box>
                <Box variant="small" display="block" color="text-body-secondary">
                  — {degree.recommendation.attribution}
                </Box>
              </div>
            )}
            <Divider />
            <Link href={degree.homepage} external>
              {degree.university} homepage
            </Link>
          </SpaceBetween>
        </ExpandableSection>
      ))}
      <ExpandableSection variant="container" headerText="Certifications">
        <SpaceBetween size="s">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.title}>
              <Box variant="strong" display="block">
                {cert.title}
              </Box>
              <Box variant="small" display="block" color="text-body-secondary">
                {cert.issuer}
              </Box>
            </div>
          ))}
        </SpaceBetween>
      </ExpandableSection>
    </SpaceBetween>
  );
}

function WorkExperienceTab() {
  return (
    <SpaceBetween size="l">
      <Container header={<Header variant="h2">Professional</Header>}>
        <EntryList entries={PROFESSIONAL_ROLES} />
      </Container>
      <Container header={<Header variant="h2">Academic</Header>}>
        <SpaceBetween size="xs">
          <EntryList entries={ACADEMIC_STANDALONE_ROLES} />
          <ExpandableSection variant="default" headerText={ACADEMIC_GROUP.title} headerDescription={ACADEMIC_GROUP.period}>
            <EntryList entries={ACADEMIC_GROUP.roles} />
          </ExpandableSection>
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}

function SkillsTab() {
  return (
    <Table
      columnDefinitions={[
        {
          id: 'category',
          header: 'Skill Type',
          cell: (item) => item.category,
          width: 200,
        },
        {
          id: 'skills',
          header: 'Skills',
          cell: (item) => (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {item.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          ),
        },
      ]}
      items={SKILL_CATEGORIES}
      variant="container"
    />
  );
}

function HobbiesTab() {
  return (
    <SpaceBetween size="l">
      <Container header={<Header variant="h2">Volunteer Experience</Header>}>
        <EntryList entries={VOLUNTEER_ROLES} />
      </Container>
      <Container header={<Header variant="h2">Personal Projects</Header>}>
        <SpaceBetween size="xs">
          {PERSONAL_PROJECTS.map((project, index) => (
            <ExpandableSection
              key={project.title}
              variant="default"
              headerText={project.title}
              headerDescription={project.period}
              defaultExpanded={index === 0}
            >
              <Box variant="p">{project.description}</Box>
            </ExpandableSection>
          ))}
        </SpaceBetween>
      </Container>
      <Container header={<Header variant="h2">Art &amp; Design</Header>}>
        <SpaceBetween size="xs">
          {ART_CATEGORIES.map((category, index) => (
            <ExpandableSection key={category.href} variant="default" headerText={category.title} defaultExpanded={index === 0}>
              <SpaceBetween size="xs">
                <Link href={category.href} external>
                  View on trickyddesign.wordpress.com
                </Link>
                <Box variant="p">{category.description}</Box>
              </SpaceBetween>
            </ExpandableSection>
          ))}
        </SpaceBetween>
        <Box variant="small" color="text-body-secondary" padding={{ top: 's' }}>
          Archive from a pre-AWS freelance/creative era (Syncopated Design, 2010–2017). A protected in-site gallery
          is pending an image-hosting decision — linking to the original posts for now.
        </Box>
      </Container>
    </SpaceBetween>
  );
}

// About Me's dedicated full page — tabbed layout (Overview/Schooling/Work
// Experience/Skills/Hobbies) matching David's reference design. All tabs beyond
// Overview are bespoke, full-length content (content/data/*.ts) — richer than
// the dashboard widgets they're loosely related to, so none of them reuse
// Widget here. Every job/degree/project entry uses ExpandableSection
// `variant="default"` when nested inside a Container (no container-in-container
// nesting) or `variant="container"` only at the top level (Schooling's degrees).
export default function AboutPage() {
  const [activeTabId, setActiveTabId] = useState('overview');

  return (
    <ContentLayout
      header={
        <div className="about-header" style={{ padding: '20px 24px' }}>
          <SpaceBetween size="xs">
            <Header variant="h1">{CONTACT.name}</Header>
            <Box variant="p" color="text-body-secondary">
              {CONTACT.phone} &nbsp;|&nbsp; {CONTACT.email} &nbsp;|&nbsp;{' '}
              <Link href={CONTACT.linkedinHref} external>
                {CONTACT.linkedinLabel}
              </Link>
            </Box>
          </SpaceBetween>
        </div>
      }
    >
      <Box variant="h2" padding={{ bottom: 'l' }}>
        {CALLOUT}
      </Box>
      <Tabs
        activeTabId={activeTabId}
        onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
        tabs={[
          { id: 'overview', label: 'Overview', content: <Container><OverviewTab /></Container> },
          { id: 'schooling', label: 'Schooling', content: <SchoolingTab /> },
          { id: 'work-experience', label: 'Work Experience', content: <WorkExperienceTab /> },
          { id: 'skills', label: 'Skills', content: <SkillsTab /> },
          { id: 'hobbies', label: 'Hobbies', content: <HobbiesTab /> },
        ]}
      />
    </ContentLayout>
  );
}
