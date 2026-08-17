import {
  colorBackgroundContainerContent,
  colorBackgroundStatusInfo,
  colorTextBodyDefault,
  colorTextBodySecondary,
  colorTextLinkDefault,
  fontFamilyBase,
  fontFamilyMonospace,
} from '@cloudscape-design/design-tokens';

// The condensed view of the standards stack described in
// content/data/uxStandards.ts — four authored layers on top of Cloudscape, each
// paired with the one thing it does to a feature while that feature is being
// built.
//
// The pairing is the whole point, and it is why the rows are strictly 1:1. An
// earlier layout put the layers on the left and a build *timeline* on the right,
// which produced crossing connectors, because each step of a build reads from a
// different mix of layers. Pairing each layer with its single consequence keeps
// the connectors straight and makes the alignment itself the claim.
//
// Vertical rather than horizontal on purpose: UxProcessSummary runs left-to-right
// because a process is a sequence, and this runs top-to-bottom because a stack is
// a derivation. Cloudscape sits at the top in a dashed box with a deliberately
// near-empty right-hand side — it is the one layer David didn't author, so it has
// no authored consequence to pair with.
//
// Inlined as a component rather than imported from src/assets/ux-standards-stack.svg
// for the same reason UxProcessSummary is: an <img>-loaded SVG is its own
// document, can't see this site's theme, and would sit in light colours while the
// page is dark whenever a visitor uses the site's Light/Dark toggle. Inline, every
// colour below is a Cloudscape design token, so the diagram tracks the toggle and
// nothing here is hand-picked.

const INK = colorTextBodyDefault;
const INK_2 = colorTextBodySecondary;
const ACCENT = colorTextLinkDefault;
const ACCENT_SOFT = colorBackgroundStatusInfo;
const SURFACE = colorBackgroundContainerContent;

const eyebrow = { fontFamily: fontFamilyMonospace, fontSize: 10.5, letterSpacing: '.12em', fill: ACCENT } as const;
const eyebrowMuted = { ...eyebrow, fill: INK_2 } as const;
const layerName = {
  fontFamily: fontFamilyBase,
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '.13em',
  fill: INK,
} as const;
const layerNameMuted = { ...layerName, fill: INK_2 } as const;
const detail = { fontFamily: fontFamilyBase, fontSize: 11.5, fill: INK_2 } as const;
const columnHead = {
  fontFamily: fontFamilyBase,
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '.16em',
  fill: INK,
} as const;
const aside = { fontFamily: fontFamilyMonospace, fontSize: 10.5, letterSpacing: '.06em', fill: INK_2 } as const;

const LEFT_X = 16;
const RIGHT_X = 564;
const CARD_W = 420;
const ROW_H = 86;
const BASE_Y = 44;
const FIRST_ROW_Y = 148;
const ROW_PITCH = 100;

interface Row {
  /** Left-hand side: the layer as authored. */
  layer: { eyebrow: string; name: string; detail: string };
  /** Right-hand side: the single thing that layer does to a feature. */
  effect: { eyebrow: string; name: string; detail: string };
  /** The machine-checkable layer, filled to mark it as the one that can run. */
  checkable?: boolean;
}

const ROWS: Row[] = [
  {
    layer: {
      eyebrow: 'LAYER 01 · PHILOSOPHY',
      name: '15 DESIGN TENETS',
      detail: 'Why the platform behaves the way it does.',
    },
    effect: {
      eyebrow: 'WHEN A DECISION IS CONTESTED',
      name: 'THE ARGUMENT',
      detail: 'Debates cite a tenet, not an opinion.',
    },
  },
  {
    layer: {
      eyebrow: 'LAYER 02 · RULES',
      name: '19 STANDARD TENETS',
      detail: 'Navigation, data states, writing, permissions, data viz.',
    },
    effect: {
      eyebrow: 'BEFORE THE FEATURE STARTS',
      name: 'THE RULE, ALREADY SETTLED',
      detail: 'Decided once — not renegotiated per feature.',
    },
  },
  {
    layer: {
      eyebrow: 'LAYER 03 · IMPLEMENTATION',
      name: '17 COMPONENT SPECS',
      detail: 'Required and forbidden components, per page type.',
    },
    effect: {
      eyebrow: "WHILE IT'S BUILT",
      name: 'A COMPLIANT STARTING POINT',
      detail: 'A new page starts compliant instead of being fixed.',
    },
  },
  {
    layer: {
      eyebrow: 'VERIFICATION · SCHEMA v2.5.1',
      name: '103 MACHINE-CHECKABLE RULES',
      detail: '13 page types · 15 documented exceptions.',
    },
    effect: {
      eyebrow: 'BEFORE IT SHIPS',
      name: 'THE CHECK',
      detail: 'Code review, the audit, and 6 rules queued for CI.',
    },
    checkable: true,
  },
];

const ARIA_LABEL =
  'The UX standards stack, and what each layer does to a feature. A base layer, Cloudscape, AWS’s open-source design system, which the standards extend rather than replace — the only layer not authored here. Above it, four authored layers, each paired with one consequence at build time. Layer one, fifteen design tenets, the philosophy: design debates cite a tenet instead of an opinion. Layer two, nineteen standard tenets covering navigation, data states, writing, permissions and data visualization: those rules are decided once rather than renegotiated per feature. Layer three, seventeen component specs giving required and forbidden components per page type: a new page starts compliant instead of being fixed later. And a verification layer, audit schema version 2.5.1, one hundred and three machine-checkable rules across thirteen page types with fifteen documented exceptions: the check at code review and audit, with six rules queued for CI enforcement.';

/** One card plus its three lines of text. */
function Card({ x, y, fill, stroke, dashed, content, muted }: {
  x: number;
  y: number;
  fill: string;
  stroke: string;
  dashed?: boolean;
  muted?: boolean;
  content: { eyebrow: string; name: string; detail: string };
}) {
  return (
    <>
      <rect
        x={x}
        y={y}
        width={CARD_W}
        height={ROW_H}
        rx={2}
        fill={fill}
        stroke={stroke}
        strokeWidth={dashed ? 1.2 : 1.4}
        strokeDasharray={dashed ? '5 4' : undefined}
      />
      <text {...(muted ? eyebrowMuted : eyebrow)} x={x + 18} y={y + 24}>
        {content.eyebrow}
      </text>
      <text {...(muted ? layerNameMuted : layerName)} x={x + 18} y={y + 48}>
        {content.name}
      </text>
      <text {...detail} x={x + 18} y={y + 70}>
        {content.detail}
      </text>
    </>
  );
}

export function UxStandardsStack() {
  return (
    // Same treatment as UxProcessSummary: below roughly 700px the type stops
    // being readable, so the diagram scrolls inside its own box rather than
    // shrinking or pushing the page sideways.
    <div style={{ overflowX: 'auto' }}>
      <svg
        viewBox="0 0 1000 552"
        role="img"
        aria-label={ARIA_LABEL}
        style={{ display: 'block', width: '100%', minWidth: 700, height: 'auto' }}
      >
        <defs>
          <marker id="st-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <polygon points="0,0.5 10,5 0,9.5" fill={INK} />
          </marker>
          <marker id="st-aha" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <polygon points="0,0.5 10,5 0,9.5" fill={ACCENT} />
          </marker>
        </defs>

        {/* Column headers — the left column is what was authored, the right is
            what each of those layers does downstream. */}
        <text {...columnHead} x={LEFT_X} y={22}>
          WHAT I AUTHORED
        </text>
        <line x1={LEFT_X} y1={32} x2={LEFT_X + CARD_W} y2={32} stroke={INK_2} strokeWidth={1} />
        <text {...columnHead} x={RIGHT_X} y={22}>
          WHAT IT DOES TO A FEATURE
        </text>
        <line x1={RIGHT_X} y1={32} x2={RIGHT_X + CARD_W} y2={32} stroke={INK_2} strokeWidth={1} />

        {/* The base layer, dashed because it is the one part not authored here. */}
        <Card
          x={LEFT_X}
          y={BASE_Y}
          fill="none"
          stroke={INK_2}
          dashed
          muted
          content={{
            eyebrow: 'BASE · NOT MINE',
            name: 'CLOUDSCAPE',
            detail: 'AWS’s open-source design system — extended, not replaced.',
          }}
        />
        <text {...aside} x={RIGHT_X} y={BASE_Y + 48}>
          the only layer I didn&#8217;t write
        </text>

        <line
          x1={LEFT_X + CARD_W / 2}
          y1={BASE_Y + ROW_H + 3}
          x2={LEFT_X + CARD_W / 2}
          y2={FIRST_ROW_Y - 3}
          stroke={INK}
          strokeWidth={1.4}
          markerEnd="url(#st-ah)"
        />

        {ROWS.map((row, index) => {
          const y = FIRST_ROW_Y + index * ROW_PITCH;
          const mid = y + ROW_H / 2;
          return (
            <g key={row.layer.name}>
              <Card
                x={LEFT_X}
                y={y}
                fill={row.checkable ? ACCENT_SOFT : SURFACE}
                stroke={row.checkable ? ACCENT : INK}
                content={row.layer}
              />
              {/* The straight run across is the load-bearing part: one layer,
                  one consequence, no crossings. */}
              <line
                x1={LEFT_X + CARD_W + 4}
                y1={mid}
                x2={RIGHT_X - 8}
                y2={mid}
                stroke={ACCENT}
                strokeWidth={1.4}
                markerEnd="url(#st-aha)"
              />
              <Card
                x={RIGHT_X}
                y={y}
                fill={row.checkable ? ACCENT_SOFT : SURFACE}
                stroke={row.checkable ? ACCENT : INK}
                content={row.effect}
              />
              {index < ROWS.length - 1 && (
                <line
                  x1={LEFT_X + CARD_W / 2}
                  y1={y + ROW_H + 3}
                  x2={LEFT_X + CARD_W / 2}
                  y2={y + ROW_PITCH - 3}
                  stroke={INK}
                  strokeWidth={1.4}
                  markerEnd="url(#st-ah)"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
