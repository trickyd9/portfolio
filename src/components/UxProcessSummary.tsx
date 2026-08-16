import {
  colorBackgroundContainerContent,
  colorBackgroundStatusInfo,
  colorTextBodyDefault,
  colorTextBodySecondary,
  colorTextLinkDefault,
  fontFamilyBase,
  fontFamilyMonospace,
} from '@cloudscape-design/design-tokens';

// The four-phase condensed view of the ten-stage process in
// content/data/uxProcess.ts — Discover 01–03, Define 04–05, Deliver 06–09,
// Sustain 10. The loop glyph marks a phase that repeats; the arcs beneath say
// what makes it repeat.
//
// Inlined as a component rather than imported from src/assets/ux-process-summary.svg
// on purpose. An <img>-loaded SVG is its own document: it can't see this site's
// theme, so it can only follow `prefers-color-scheme` and would sit in light
// colours while the rest of the page is dark whenever a visitor uses the site's
// own Light/Dark toggle. Inline, the paint below comes from Cloudscape design
// tokens, which carry their own light and dark values — so the diagram tracks
// the toggle like every other component, and no colour here is hand-picked.
//
// Geometry (coordinates, arcs, marker shapes) is unchanged from that source
// file; only the palette and font stacks were swapped for tokens.

const INK = colorTextBodyDefault;
const INK_2 = colorTextBodySecondary;
const ACCENT = colorTextLinkDefault;
const ACCENT_SOFT = colorBackgroundStatusInfo;
const SURFACE = colorBackgroundContainerContent;

const numeral = { fontFamily: fontFamilyMonospace, fontSize: 10.5, letterSpacing: '.12em', fill: ACCENT } as const;
const phaseName = {
  fontFamily: fontFamilyBase,
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '.14em',
  fill: INK,
} as const;
const detail = { fontFamily: fontFamilyBase, fontSize: 11.5, fill: INK_2 } as const;
const edge = { fontFamily: fontFamilyMonospace, fontSize: 10.5, letterSpacing: '.04em', fill: ACCENT } as const;

const PHASES = [
  {
    x: 16,
    numbers: '01–03',
    name: 'DISCOVER',
    lines: ['Requests from data-owning', 'teams and from customers.', 'Align with the feature team,', 'gather user stories.'],
    loops: false,
  },
  {
    x: 264,
    numbers: '04–05',
    name: 'DEFINE',
    lines: ['Scoping and mockups trade', 'off against each other until', 'they agree, then the design', 'document is locked.'],
    loops: true,
  },
  {
    x: 512,
    numbers: '06–09',
    name: 'DELIVER',
    lines: ['Build the phase, test it with', 'users, clear the blockers,', 'release. Once per phase', 'until scope is complete.'],
    loops: true,
  },
  {
    x: 760,
    numbers: '10',
    name: 'SUSTAIN',
    lines: ['Maintain, and solicit', 'feedback on roughly a', 'six-month cadence. New', 'needs re-enter at build.'],
    loops: true,
  },
];

const ARIA_LABEL =
  'UX process in four phases. Discover, stages one to three: requests from data-owning teams and customers, alignment with the feature team, user stories. Define, stages four to five: scoping and mockups trade off until they agree, then the design document is locked; this phase repeats until aligned. Deliver, stages six to nine: build, user testing, clear blockers, release; this repeats once per phase until scope is complete. Sustain, stage ten: maintain and solicit feedback on a roughly six-month cadence, which returns to Deliver rather than to intake.';

export function UxProcessSummary() {
  return (
    // The diagram stops being readable below ~660px, so it scrolls inside its
    // own box rather than shrinking the type or forcing the page to scroll
    // sideways.
    <div style={{ overflowX: 'auto' }}>
      <svg
        viewBox="0 0 1000 330"
        role="img"
        aria-label={ARIA_LABEL}
        style={{ display: 'block', width: '100%', minWidth: 660, height: 'auto' }}
      >
        <defs>
          <marker id="ux-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <polygon points="0,0.5 10,5 0,9.5" fill={INK} />
          </marker>
          <marker id="ux-aha" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <polygon points="0,0.5 10,5 0,9.5" fill={ACCENT} />
          </marker>
          <g id="ux-loopmark">
            <path d="M 6.93 4 A 8 8 0 1 1 6.93 -4" stroke={ACCENT} strokeWidth={1.6} fill="none" />
            <polygon points="4.4,-6.4 10.1,-4.6 6.4,-0.4" fill={ACCENT} />
          </g>
        </defs>

        {PHASES.map((phase, index) => (
          <g key={phase.name}>
            <rect
              x={phase.x}
              y={56}
              width={224}
              height={150}
              rx={2}
              fill={phase.loops ? ACCENT_SOFT : SURFACE}
              stroke={phase.loops ? ACCENT : INK}
              strokeWidth={1.4}
            />
            <text {...numeral} x={phase.x + 18} y={82}>
              {phase.numbers}
            </text>
            <text {...phaseName} x={phase.x + 18} y={106}>
              {phase.name}
            </text>
            {phase.lines.map((line, lineIndex) => (
              <text {...detail} key={line} x={phase.x + 18} y={130 + lineIndex * 17}>
                {line}
              </text>
            ))}
            {phase.loops && <use href="#ux-loopmark" x={phase.x + 198} y={80} />}
            {index < PHASES.length - 1 && (
              <line
                x1={phase.x + 228}
                y1={131}
                x2={phase.x + 243}
                y2={131}
                stroke={INK}
                strokeWidth={1.4}
                markerEnd="url(#ux-ah)"
              />
            )}
          </g>
        ))}

        {/* Return arcs — what sends each looping phase back around. */}
        <path
          d="M 444 206 C 444 248, 308 248, 308 214"
          stroke={ACCENT}
          strokeWidth={1.4}
          fill="none"
          strokeLinejoin="round"
          markerEnd="url(#ux-aha)"
        />
        <text {...edge} x={376} y={268} textAnchor="middle">
          until aligned
        </text>

        <path
          d="M 692 206 C 692 248, 556 248, 556 214"
          stroke={ACCENT}
          strokeWidth={1.4}
          fill="none"
          strokeLinejoin="round"
          markerEnd="url(#ux-aha)"
        />
        <text {...edge} x={624} y={268} textAnchor="middle">
          per phase
        </text>

        <path
          d="M 872 206 V 292 H 700 V 214"
          stroke={ACCENT}
          strokeWidth={1.4}
          fill="none"
          strokeLinejoin="round"
          markerEnd="url(#ux-aha)"
        />
        <text {...edge} x={786} y={310} textAnchor="middle">
          ~6 months · same project
        </text>
      </svg>
    </div>
  );
}
