import type { ReactNode } from 'react';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';
import {
  colorBackgroundContainerContent,
  colorBackgroundStatusInfo,
  colorBorderStatusInfo,
  colorTextBodyDefault,
  colorTextBodySecondary,
  fontFamilyBase,
  fontFamilyMonospace,
} from '@cloudscape-design/design-tokens';
import Tabs from '@cloudscape-design/components/tabs';
import { BulletList, EntryGroupTab } from '../components/EntrySection';
import { ProjectRow } from '../components/ProjectPopover';
import { STACK_LAYERS, ADJACENT_SYSTEMS, type StackLayer } from '../content/data/aiBuildStack';
import { AGENTS_AUDITING, PROTOTYPING_AUTOMATION } from '../content/data/aiAugmentedBuildFull';

// The AI-Augmented Build page, served at /ai-augmented-build.
//
// Three tabs (David capped it at three, 2026-08-17), on the same project-page
// standard as AWS Persona and Design Systems: the lead tab is named for its
// content rather than "Overview", and the sibling tabs hold the full project
// detail from content/data/aiAugmentedBuildFull.ts.
//
// The lead tab is the layered stack. Grouping by position in the stack is the
// point: it shows how the pieces derive from each other, which a category list
// cannot. The project tabs then group the same work the way a reader looking for
// a specific project would expect to find it. The stack's popovers are short and
// name the tab holding the full text, so the two are different lengths of one
// claim rather than two copies.
//
// Each layer is drawn as a band (mono eyebrow, letterspaced name, detail and count
// on the right; dashed for the inherited foundation, tinted for the two load-bearing
// layers) and that band *is* the expandable section's header. Clicking a band opens
// it in place, so there is no separate diagram to keep in sync with a list.
//
// The bands are hand-styled divs wrapping `ExpandableSection variant="default"`
// rather than `variant="container"`: the container variant supplies its own box, and
// we need the box to carry the band treatment (dash, tint) that distinguishes the
// layers from each other. `variant="default"` brings the toggle and its accessibility
// without any chrome of its own. For the same reason the lead tab does not wrap the
// bands in a Container — that would put boxes inside a box.
//
// Colour rule (David, 2026-08-16): link blue is reserved for things that are actually
// links. The eyebrows and count strings are plain body text in monospace — emphasis
// comes from the typeface, not from a colour that promises a click. Band borders and
// fills still use the info tokens, since those are surfaces rather than text.

const TOP_DOWN = [...STACK_LAYERS].reverse();

const eyebrowStyle: React.CSSProperties = {
  fontFamily: fontFamilyMonospace,
  fontSize: 10.5,
  letterSpacing: '.12em',
  color: colorTextBodySecondary,
  fontWeight: 400,
};

const nameStyle: React.CSSProperties = {
  fontFamily: fontFamilyBase,
  fontSize: 15,
  fontWeight: 600,
  letterSpacing: '.13em',
  color: colorTextBodyDefault,
};

const detailStyle: React.CSSProperties = {
  fontFamily: fontFamilyBase,
  fontSize: 12.5,
  fontWeight: 400,
  color: colorTextBodySecondary,
};

const statStyle: React.CSSProperties = {
  fontFamily: fontFamilyMonospace,
  fontSize: 10.5,
  letterSpacing: '.05em',
  color: colorTextBodyDefault,
  fontWeight: 400,
};

// `*asterisks*` in a bullet become italics. The content stays plain strings in
// content/data/aiBuildStack.ts — the layering rule for this codebase is that
// content holds words and presentation decides how they're drawn, so the markup
// decision lives here rather than as JSX in the data file. One emphasis per
// bullet, on the load-bearing claim; italicising everything emphasizes nothing.
function emphasize(text: string): ReactNode {
  // Capturing split: even indices are plain text, odd indices were inside asterisks.
  return text.split(/\*([^*]+)\*/g).map((part, index) => (index % 2 === 1 ? <i key={index}>{part}</i> : part));
}

/** The band itself — the two-column layout the SVG used, as the section's header. */
function BandHeader({ layer }: { layer: StackLayer }) {
  return (
    <span
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        gap: '6px 32px',
        width: '100%',
      }}
    >
      <span style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: '0 0 auto', minWidth: 210 }}>
        <span style={eyebrowStyle}>{`LAYER ${layer.number} · ${layer.role}`}</span>
        <span style={nameStyle}>{layer.name}</span>
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: '1 1 340px', minWidth: 0 }}>
        <span style={detailStyle}>{layer.detail}</span>
        {layer.stat && <span style={statStyle}>{layer.stat}</span>}
      </span>
    </span>
  );
}

/** The gap between two layers — carries the derivation, pointing down the stack. */
function DerivationArrow() {
  return (
    <Box textAlign="center" color="text-body-secondary" padding={{ vertical: 'xxs' }}>
      <span aria-hidden="true" style={{ fontSize: 16, lineHeight: 1 }}>
        &#8593;
      </span>
    </Box>
  );
}

// The band's border and fill encode which of three kinds of layer this is. Defined
// once here because the legend's swatches use the very same function: a legend drawn
// from its own copy of these values is a legend that can quietly stop matching.
function bandTreatment({ muted, emphasis }: { muted?: boolean; emphasis?: boolean }): React.CSSProperties {
  return {
    border: `${muted ? 1.2 : 1.4}px ${muted ? 'dashed' : 'solid'} ${
      muted ? colorTextBodySecondary : emphasis ? colorBorderStatusInfo : colorTextBodyDefault
    }`,
    background: emphasis ? colorBackgroundStatusInfo : colorBackgroundContainerContent,
    borderRadius: 2,
  };
}

// Why some bands are tinted and one is dashed. Added 2026-08-17: the encoding was
// real from the start (tint = load-bearing, dashed = inherited) but nothing on the
// page said so, and David read the two adjacent tinted bands as arbitrary. An
// encoding a reader has to reverse-engineer is decoration until it's labelled.
const LEGEND: Array<{ treatment: { muted?: boolean; emphasis?: boolean }; label: string; note: string }> = [
  {
    treatment: { emphasis: true },
    label: 'Load-bearing',
    note: 'the schema and the package everything else rests on',
  },
  {
    treatment: {},
    label: 'Supporting',
    note: 'a property or a consequence of the load bearing layers',
  },
  {
    treatment: { muted: true },
    label: 'Inherited',
    note: 'authored separately from the AI package',
  },
];

function StackLegend() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 28px', alignItems: 'center' }}>
      {LEGEND.map((item) => (
        <span key={item.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span aria-hidden="true" style={{ ...bandTreatment(item.treatment), width: 26, height: 15, flex: '0 0 auto' }} />
          <Box variant="small" color="text-body-secondary">
            <b>{item.label}</b>: {item.note}
          </Box>
        </span>
      ))}
    </div>
  );
}

function LayerBand({ layer, defaultExpanded }: { layer: StackLayer; defaultExpanded: boolean }) {
  return (
    <div style={{ ...bandTreatment(layer), padding: '14px 20px' }}>
      <ExpandableSection variant="default" defaultExpanded={defaultExpanded} headerText={<BandHeader layer={layer} />}>
        <SpaceBetween size="m">
          {/* Bullets, not prose: the bands read well but the paragraph blocks
              inside them didn't (David, 2026-08-16). BulletList is the site's
              existing primitive, so these match every other list on the site. */}
          <BulletList items={layer.points.map(emphasize)} />

          {layer.because && (
            <Box variant="small" color="text-body-secondary">
              <b>Why this layer exists:</b> {layer.because}
            </Box>
          )}

          {layer.projects.length > 0 && <ProjectRow projects={layer.projects} label="Projects in this layer" />}

          {/* Separate label, so a project that legitimately reaches into this
              layer from another one never reads as the same project padded out
              across the stack. */}
          {layer.spanning && layer.spanning.length > 0 && (
            <ProjectRow projects={layer.spanning} label="Also spans this layer" />
          )}

          {layer.links && (
            <div>
              <Box variant="small" color="text-body-secondary" display="block" padding={{ bottom: 'xxs' }}>
                This layer is documented in full elsewhere on the site
              </Box>
              <SpaceBetween direction="horizontal" size="l">
                {layer.links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </SpaceBetween>
            </div>
          )}
        </SpaceBetween>
      </ExpandableSection>
    </div>
  );
}

/** The lead tab: the stack itself, expandable in place. */
function StackTab() {
  return (
    <SpaceBetween size="l">
      <Box variant="p">
        Five layers, read bottom to top. Each one exists because the layer beneath it could not be
        acted on directly. Expand a layer for what it holds; the project names open their detail.
      </Box>
      <StackLegend />
      <div>
        {TOP_DOWN.map((layer, index) => (
          <div key={layer.number}>
            <LayerBand layer={layer} defaultExpanded={index === 0} />
            {index < TOP_DOWN.length - 1 && <DerivationArrow />}
          </div>
        ))}
      </div>

      <Box variant="small" color="text-body-secondary">
        Each layer is generated from the one below; every finding traces back down to a design
        tenet.
      </Box>

      {/* These three sit outside the stack rather than on a layer, so they get a
          named row of their own instead of being wedged onto one. Their full text
          is on the Prototyping & Automation tab, which each popover names. */}
      <Container
        header={
          <Header
            variant="h2"
            description="Built on the same agent substrate, but outside the audit path: nothing here gates a build."
          >
            Adjacent systems
          </Header>
        }
      >
        <ProjectRow projects={ADJACENT_SYSTEMS} label="Projects" />
      </Container>
    </SpaceBetween>
  );
}

export default function AiAugmentedBuildPage() {
  return (
    <ContentLayout
      header={
        <Header variant="h1" description="Amazon Web Services: turning design standards into something agents can build against">
          AI-Augmented Build
        </Header>
      }
    >
      <Tabs
        tabs={[
          { id: 'ai-augmented-build', label: 'AI-Augmented Build', content: <StackTab /> },
          {
            id: 'agents-auditing',
            label: 'Agents & Auditing',
            content: <EntryGroupTab entries={AGENTS_AUDITING} header="Agents & Auditing" />,
          },
          {
            id: 'prototyping-automation',
            label: 'Prototyping & Automation',
            content: <EntryGroupTab entries={PROTOTYPING_AUTOMATION} header="Prototyping & Automation" />,
          },
        ]}
      />
    </ContentLayout>
  );
}
