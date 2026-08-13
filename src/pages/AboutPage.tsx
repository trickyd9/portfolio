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
import { DEGREES, CERTIFICATIONS } from '../content/data/schooling';
import { PROFESSIONAL_ROLES, ACADEMIC_GROUP, ACADEMIC_STANDALONE_ROLES } from '../content/data/experience';
import { VOLUNTEER_ROLES } from '../content/data/hobbies';
import { ART_CATEGORIES } from '../content/data/artPortfolio';
import {
  FINE_ART,
  ANIMATIONS,
  POSTERS,
  GRAPHIC_DESIGN,
  HOME_PROJECTS,
  LANDSCAPE_ARCHITECTURE,
} from '../content/data/creativeWork';
import type { ArtworkPiece, AnimationPiece } from '../content/data/creativeWork';
import { SKILL_CATEGORIES } from '../content/data/skills';
import { EntryList } from '../components/EntrySection';
import { ArtCategorySection, type Thumbnail } from '../components/ArtCategorySection';
import headshot from '../assets/david-headshot.jpg';

const RESUME_PDF = `${import.meta.env.BASE_URL}David-Trick-Resume.pdf`;
const RESUME_MD = `${import.meta.env.BASE_URL}David-Trick-Resume.md`;
const PROJECT_LIST_PDF = `${import.meta.env.BASE_URL}David-Trick-Project-List.pdf`;
const PROJECT_LIST_MD = `${import.meta.env.BASE_URL}David-Trick-Project-List.md`;

const CALLOUT = 'Leader, collaborator, and driving force for intuitive, clear design.';

function categoryByTitle(title: string) {
  const category = ART_CATEGORIES.find((c) => c.title === title);
  if (!category) throw new Error(`Missing art category: ${title}`);
  return category;
}

const BASE = import.meta.env.BASE_URL;

function artworkThumbnails(pieces: ArtworkPiece[]): Thumbnail[] {
  return pieces.map((p) => ({ thumbSrc: `${BASE}${p.src}`, title: p.title }));
}

// YouTube's own thumbnail CDN, keyed by video ID — a real, stable endpoint,
// not a derived/invented one.
function animationThumbnails(pieces: AnimationPiece[]): Thumbnail[] {
  return pieces.map((p) => ({ thumbSrc: `https://img.youtube.com/vi/${p.youtubeId}/mqdefault.jpg`, title: p.title }));
}

// creativeWork.ts's GRAPHIC_DESIGN and HOME_PROJECTS arrays each merge pieces
// from two distinct source-site categories (confirmed against the original
// WordPress posts, not guessed). Split here rather than in creativeWork.ts
// since the merge there was deliberate (three thin sources folded into one
// artist-facing card); this page just needs the finer split for its own
// category-by-category layout.
const LOGOS_SRC = new Set([
  'art/graphic-design/logo.jpg',
  'art/graphic-design/hllogo.jpg',
  'art/graphic-design/fusionlogooptions.jpg',
  'art/graphic-design/cslogooptions.jpg',
  'art/graphic-design/gmglogo.jpg',
  'art/graphic-design/syncdblk.jpg',
  'art/graphic-design/sdlogo.jpg',
  'art/graphic-design/relogo.jpg',
  'art/graphic-design/cologo.jpg',
  'art/graphic-design/itazlogo.jpg',
]);
const LOGOS = GRAPHIC_DESIGN.filter((p) => LOGOS_SRC.has(p.src));
const PRINTED_MATTER = GRAPHIC_DESIGN.filter((p) => !LOGOS_SRC.has(p.src));

// The source site's "Other Work" post, not the "Other Projects" (home)
// post — the two are easy to conflate but distinct.
const OTHER_WORK_SRC = new Set([
  'art/home-projects/mysteryambigram.jpg',
  'art/home-projects/davidambigram.jpg',
  'art/home-projects/lleheartlady.jpg',
  'art/home-projects/oweb.jpg',
  'art/home-projects/sdblogweb.jpg',
  'art/home-projects/apocweb.jpg',
  'art/home-projects/cdcover.jpg',
  'art/home-projects/hlvisor.jpg',
]);
// Reversed per David's request — the filtered order otherwise just followed
// HOME_PROJECTS' own array order, which wasn't a deliberate sequence for this
// subset.
const OTHER_WORK = HOME_PROJECTS.filter((p) => OTHER_WORK_SRC.has(p.src)).reverse();

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
            {degree.projects && (
              <div>
                <Box variant="h4" padding="n">
                  <em>Featured Projects</em>
                </Box>
                <EntryList entries={degree.projects} />
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
            <SpaceBetween size="l" direction="horizontal">
              {degree.portfolioHref && (
                <Link href={degree.portfolioHref} external>
                  Portfolio of work from this time
                </Link>
              )}
              <Link href={degree.homepage} external>
                {degree.university} homepage
              </Link>
            </SpaceBetween>
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
      <Container header={<Header variant="h2">Volunteer</Header>}>
        <EntryList entries={VOLUNTEER_ROLES} />
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

// Thumbnails link out to the piece's original post rather than the raw
// uploaded file — David's choice, keeping the same watermark/resolution
// protection everywhere except the one linked-out post per category.
function GraphicDesignTab() {
  return (
    <Container header={<Header variant="h2">Graphic Design</Header>}>
      <SpaceBetween size="xs">
        <ArtCategorySection category={categoryByTitle('Posters')} thumbnails={artworkThumbnails(POSTERS)} defaultExpanded />
        <ArtCategorySection category={categoryByTitle('Printed Matter')} thumbnails={artworkThumbnails(PRINTED_MATTER)} />
        <ArtCategorySection category={categoryByTitle('Logos')} thumbnails={artworkThumbnails(LOGOS)} />
        <ArtCategorySection category={categoryByTitle('Other Work')} thumbnails={artworkThumbnails(OTHER_WORK)} />
      </SpaceBetween>
      <Box variant="small" color="text-body-secondary" padding={{ top: 's' }}>
        Archive from a pre-AWS freelance/creative era (Syncopated Design, 2010–2017). Thumbnails link out to each
        piece's original post.
      </Box>
    </Container>
  );
}

function ArtworkTab() {
  return (
    <Container header={<Header variant="h2">Artwork</Header>}>
      <SpaceBetween size="xs">
        <ArtCategorySection category={categoryByTitle('Drawings / Paintings')} thumbnails={artworkThumbnails(FINE_ART)} defaultExpanded />
        <ArtCategorySection category={categoryByTitle('Moving Imagery')} thumbnails={animationThumbnails(ANIMATIONS)} />
        <ArtCategorySection
          category={categoryByTitle('Landscape Architecture Classwork')}
          thumbnails={artworkThumbnails(LANDSCAPE_ARCHITECTURE)}
        />
      </SpaceBetween>
      <Box variant="small" color="text-body-secondary" padding={{ top: 's' }}>
        Archive from a pre-AWS freelance/creative era (Syncopated Design, 2010–2017). Thumbnails link out to each
        piece's original post.
      </Box>
    </Container>
  );
}

// About Me's dedicated full page — tabbed layout (Overview/Schooling/Work
// Experience/Skills/Graphic Design/Artwork) matching David's reference
// design. All tabs beyond
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
          { id: 'graphic-design', label: 'Graphic Design', content: <GraphicDesignTab /> },
          { id: 'artwork', label: 'Artwork', content: <ArtworkTab /> },
        ]}
      />
    </ContentLayout>
  );
}
