import {
  colorBackgroundContainerContent,
  colorBackgroundStatusInfo,
  colorBorderStatusInfo,
  colorTextBodyDefault,
  colorTextBodySecondary,
  fontFamilyBase,
  fontFamilyMonospace,
} from '@cloudscape-design/design-tokens';
import { PERSONA_LIFECYCLE } from '../content/data/personaLifecycle';

// The three-stage persona lifecycle described in content/data/personaLifecycle.ts.
//
// Horizontal, unlike UxStandardsStack, and for the same reason UxProcessSummary is:
// this is a sequence, not a derivation. A stack earns a vertical reading because
// each layer sits on the one below; these three stages follow one another in time.
//
// The return arc beneath is the load-bearing part of the drawing. Without it this
// is a three-box pipeline that ends, which is exactly the "personas are a document
// you write once" reading the work disproves. Drawn as one channel from stage 03
// back to stage 01, labelled with what actually travels along it.
//
// Stage 02 carries the tinted fill because the evidence stage is what separates
// this from desk research: it is the claim the page is really making.
//
// Inlined as a component rather than an <img> of an .svg for the same reason as
// the other three diagrams: an <img>-loaded SVG is its own document, can't see the
// site's theme, and would sit in light colours while the page is dark. Every colour
// below is a Cloudscape design token.

const INK = colorTextBodyDefault;
const INK_2 = colorTextBodySecondary;
const ACCENT = colorBorderStatusInfo;
const ACCENT_SOFT = colorBackgroundStatusInfo;
const SURFACE = colorBackgroundContainerContent;

const eyebrow = { fontFamily: fontFamilyMonospace, fontSize: 10.5, letterSpacing: '.12em', fill: INK_2 } as const;
const stageName = {
  fontFamily: fontFamilyBase,
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '.13em',
  fill: INK,
} as const;
const detail = { fontFamily: fontFamilyBase, fontSize: 11.5, fill: INK_2 } as const;
const count = { fontFamily: fontFamilyMonospace, fontSize: 10.5, letterSpacing: '.05em', fill: INK } as const;
const loopLabel = { fontFamily: fontFamilyMonospace, fontSize: 10.5, letterSpacing: '.05em', fill: INK_2 } as const;

const CARD_W = 296;
const CARD_H = 150;
const CARD_Y = 40;
const XS = [16, 356, 696];

const ARIA_LABEL =
  'The persona lifecycle in three stages, running left to right and looping back. Stage one, definition: who exists. Twenty personas across six job-family categories, each carrying sources, a review checklist and feature dependencies. Stage two, evidence: what is proven. Personas are validated with customers and then cross-checked against the ticketing system rather than taken on trust, with eighteen form responses and ten recorded interviews. Stage three, in the product: what ships. Personas drive default sorts, default columns, conditional widgets and role detection in shipped dashboards, with four dashboards built and all twenty personas mapped to templates. A return channel runs from stage three back to stage one, carrying field feedback that is written back into the persona file, the validation questions and the mockups.';

export function PersonaLifecycle() {
  return (
    // Same treatment as the other diagrams: below roughly 700px the type stops
    // being readable, so it scrolls in its own box rather than shrinking or
    // pushing the page sideways.
    <div style={{ overflowX: 'auto' }}>
      <svg
        viewBox="0 0 1000 290"
        role="img"
        aria-label={ARIA_LABEL}
        style={{ display: 'block', width: '100%', minWidth: 700, height: 'auto' }}
      >
        <defs>
          <marker id="pl-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <polygon points="0,0.5 10,5 0,9.5" fill={INK} />
          </marker>
          <marker id="pl-aha" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <polygon points="0,0.5 10,5 0,9.5" fill={ACCENT} />
          </marker>
        </defs>

        {PERSONA_LIFECYCLE.map((stage, index) => {
          const x = XS[index];
          // Stage 02 is the evidence stage, filled to mark it as the one that
          // turns the registry from asserted into checked.
          const filled = stage.number === '02';
          return (
            <g key={stage.number}>
              <rect
                x={x}
                y={CARD_Y}
                width={CARD_W}
                height={CARD_H}
                rx={2}
                fill={filled ? ACCENT_SOFT : SURFACE}
                stroke={filled ? ACCENT : INK}
                strokeWidth={1.4}
              />
              <text {...eyebrow} x={x + 18} y={CARD_Y + 28}>
                {`STAGE ${stage.number} · ${stage.role}`}
              </text>
              <text {...stageName} x={x + 18} y={CARD_Y + 54}>
                {stage.name}
              </text>
              {stage.lines.map((line, lineIndex) => (
                <text {...detail} key={line} x={x + 18} y={CARD_Y + 80 + lineIndex * 18}>
                  {line}
                </text>
              ))}
              <text {...count} x={x + 18} y={CARD_Y + 136}>
                {stage.count}
              </text>

              {index < PERSONA_LIFECYCLE.length - 1 && (
                <line
                  x1={x + CARD_W + 4}
                  y1={CARD_Y + CARD_H / 2}
                  x2={XS[index + 1] - 4}
                  y2={CARD_Y + CARD_H / 2}
                  stroke={INK}
                  strokeWidth={1.4}
                  markerEnd="url(#pl-ah)"
                />
              )}
            </g>
          );
        })}

        {/* The return channel. Without this the drawing says personas are a
            pipeline that finishes, which is the reading the work disproves. */}
        <path
          d={`M ${XS[2] + CARD_W / 2} ${CARD_Y + CARD_H + 4}
              V 232
              H ${XS[0] + CARD_W / 2}
              V ${CARD_Y + CARD_H + 8}`}
          fill="none"
          stroke={ACCENT}
          strokeWidth={1.4}
          strokeLinejoin="round"
          markerEnd="url(#pl-aha)"
        />
        <text {...loopLabel} x={500} y={256} textAnchor="middle">
          field feedback re-enters the persona file, the questions and the mockups
        </text>
      </svg>
    </div>
  );
}
