// Static snapshot generated 2026-08-10 from the persona-research project's
// summaries, refreshed 2026-08-11 for visitor-facing voice.
//
// VOICE RULE for everything in this file (David, 2026-08-11): every string here
// is read by a site visitor who has no access to the source research, the
// project history, or the intent behind any of it. So findings are written as
// observations *about the persona* ("looks for X", "loses interest at Y"), never
// as instructions to the site's author ("emphasize X", "avoid Y"), and nothing
// references an internal document, a retired feature, or a past plan. A visitor
// who matches one of these personas should be able to read their own row and
// recognize themselves.
//
// Content is a manually-pulled snapshot, not a live feed — the underlying
// research updates on its own cadence, but this file only changes when it's
// deliberately re-pulled.
import type { Entry } from './entry';

export type ConfidenceTier = 'single-voice' | 'substantiated' | 'verified';

export const CONFIDENCE_TIER_LABEL: Record<ConfidenceTier, string> = {
  'single-voice': 'Single-voice',
  substantiated: 'Substantiated',
  verified: 'Verified',
};

// Order matters — used to find the weakest tier in a persona's 5-question set.
const TIER_ORDER: ConfidenceTier[] = ['single-voice', 'substantiated', 'verified'];

export const RESEARCH_QUESTIONS: Array<{ id: string; short: string; label: string }> = [
  { id: 'q1', short: 'How', label: 'How they read a portfolio — attention patterns and time spent' },
  { id: 'q2', short: 'What', label: 'What they look at most — content types and project formats' },
  { id: 'q3', short: 'Why', label: 'Why they pick one portfolio over another' },
  { id: 'q4', short: 'AI', label: 'How AI is changing the way they evaluate work' },
  { id: 'q5', short: 'Projects', label: 'Which kinds of projects draw their attention' },
];

export type ResearchPersonaId =
  | 'hiring-manager'
  | 'recruiter'
  | 'ux-professional'
  | 'technical-peer'
  | 'product-manager'
  | 'artist-digital-artist';

export interface ResearchPersona {
  id: ResearchPersonaId;
  label: string;
  /** Who this persona is and how they read a portfolio — one paragraph. */
  tagline: string;
  /** 2-3 short, table-scannable observations about how this persona reads. */
  factoids: string[];
  /** What this persona actively looks for. */
  looksFor: string[];
  /** What loses this persona's interest or costs credibility with them. */
  losesThem: string[];
  /** What reliably catches this persona's eye. */
  drawsAttention: string[];
  aiEraNote: string;
  /** Aligned by index to RESEARCH_QUESTIONS (5 entries, one per question). */
  confidence: ConfidenceTier[];
  /** Set only when a question's tier carries a caveat worth showing openly. */
  confidenceNote?: string;
}

export function careerPersonaResearchPath(id: ResearchPersonaId): string {
  return `/career-persona-research/${id}`;
}

export const CAREER_PERSONA_RESEARCH: ResearchPersona[] = [
  {
    id: 'hiring-manager',
    label: 'Hiring Manager',
    tagline:
      'A hiring manager gives a portfolio seconds to earn a "keep reading," then under two minutes on a first pass. In that window they want to see a real problem framed clearly, reasoning they can follow, and a result they can point to. Craft still matters — it reads as a signal of care — but craft without visible thinking behind it reads as decoration.',
    factoids: [
      'Reads 3–5 deep case studies, not a large gallery',
      'Wants the result stated before the reasoning',
      'Treats vague credit on team work as a red flag',
    ],
    looksFor: [
      'A small number of deep case studies — three to five — rather than a broad gallery. Depth beat breadth in every source in this research.',
      'The reasoning behind the work, not just the final screens: options considered, trade-offs made, what changed after feedback.',
      'A clear answer to "what did this person actually do" on anything collaborative.',
      'Impact described specifically, whether or not it comes with a number — a concrete claim carries more weight than an impressive but unsupported percentage.',
      'The outcome up front, so they can decide whether to read the rest.',
      'A portfolio that is itself well-built — they read the site as a work sample in its own right.',
      'Where AI was part of the work, a specific account of who decided what.',
    ],
    losesThem: [
      'Ten or more shallow projects showing only final mockups, with no decisions visible.',
      'Concept, spec, or coursework projects presented as though they were real shipped work — repeatedly named as an instant credibility hit.',
      'A wall of process artifacts with the actual outcome buried at the end.',
      'Password-protected work with no password provided — one of the most-repeated frustrations in this research.',
      'Metric claims with no baseline or explanation behind them.',
      'Case-study writing that reads like every other AI-assisted portfolio.',
    ],
    drawsAttention: [
      'A short, specific results statement near the top of a case study.',
      'Things they can click — prototypes, embedded flows — that let them experience the interaction thinking directly rather than read about it.',
      'Work shown in progress on purpose; several current accounts say this reads as more honest than a uniformly polished portfolio.',
      'A portfolio visibly aimed at a particular kind of role rather than positioned to cover everything.',
    ],
    aiEraNote:
      'As of August 2026, hiring managers are pulling in two directions at once: more suspicious of AI-generated or AI-inflated case studies, and at the same time actively screening for AI fluency as a skill. Where the sources converge is on judgment — they want to see what a person decided and verified, not simply that a tool was involved. This is the fastest-moving finding in this research, and is better treated as a current snapshot than a settled rule.',
    confidence: ['substantiated', 'verified', 'verified', 'substantiated', 'substantiated'],
  },
  {
    id: 'recruiter',
    label: 'Recruiter',
    tagline:
      "A recruiter isn't evaluating design craft. They're doing a fast, checklist-style pass — seconds to a couple of minutes — to decide whether to pass someone along at all, screening for completeness, role fit, and basic professionalism. They also weigh breadth more heavily than a hiring manager does: a generalist recruiter wants to see someone who could plausibly fit several contexts.",
    factoids: [
      'Scans on a checklist — completeness before craft',
      'Roughly 80% of portfolios fail on incompleteness alone',
      'Values breadth across 3+ projects, not one deep specialty',
    ],
    looksFor: [
      'A complete, working portfolio. Incompleteness on its own is the biggest eliminator at this stage — one recruiter\'s review of more than 1,300 portfolios found roughly 80% fell out on this basis before craft was ever considered.',
      'Uniform, clearly labeled project thumbnails — company, role, medium — so fit can be judged in seconds without digging.',
      'Range across three or more projects spanning different skills and contexts, unless the search is for a narrow specialization.',
      'A résumé and portfolio link that machines can read: plain-text links, standard headings, wording that lines up with the role.',
      'Consistency between résumé, LinkedIn, and portfolio — matching dates, titles, and descriptions.',
      'A clear answer to what a person contributed personally on team projects.',
    ],
    losesThem: [
      'A missing or broken portfolio link, or case studies that stop halfway.',
      'Typos, rough formatting, or a layout that breaks on a phone.',
      'No clear sense of what kind of role the person is actually after.',
      'Employment gaps or short stints with no context offered.',
      'Résumés built mostly of graphics — these break the text parsing their tools rely on.',
    ],
    drawsAttention: [
      'A clear statement of specialization near the top.',
      'Visible range across project types, organized well enough to scan — unlabeled variety just reads as clutter at this speed.',
      "A portfolio link that's easy to find and actually works.",
    ],
    aiEraNote:
      'As of August 2026, AI-assisted screening is mainstream — one HR industry survey put AI adoption for HR tasks at 43%, up from 26% a year earlier. The consistent finding is that this AI reads résumé text, not portfolio visuals: no source in this research describes a tool reading or scoring case-study pages directly. So the machine-readable layer matters for getting through the filter, while the portfolio itself is still written for the person who opens it afterward.',
    confidence: ['substantiated', 'substantiated', 'substantiated', 'substantiated', 'verified'],
  },
  {
    id: 'ux-professional',
    label: 'UX Professional / Peer',
    tagline:
      "A fellow designer, researcher, or design leader usually isn't deciding whether to hire anyone — they're deciding whether to respect the thinking, and maybe whether to remember it, collaborate, or point someone else toward it. That changes what earns attention: the process depth a hiring manager would call \"too much\" is closer to what a peer expects, because it's the same currency traded in design crits and mentorship.",
    factoids: [
      'Wants reasoning and unresolved edges, not just polish',
      'Methodology specificity is their strongest signal',
      'Notices craft presence beyond the portfolio — talks, writing, crit',
    ],
    looksFor: [
      'Real reasoning and genuinely unresolved edges, rather than a story tidied up after the fact.',
      'Specific methodology, especially in research and design-systems work — which method, and why that one for this problem.',
      'A visible point of view. Deliberate, defensible choices read as more trustworthy than work that is merely competent.',
      'Craft presence around the work as well as in it — writing, talks, mentoring, participation in critique.',
      'Design-systems and cross-team work, which this audience seeks out and a general hiring checklist tends to under-weight.',
    ],
    losesThem: [
      'A portfolio tuned entirely for a 30-second hiring scan — it under-serves a peer who came for depth.',
      'Design-systems or process work locked behind a password wall.',
      'Polish that reads as avoidance: peers can tell detail-as-care from detail-in-place-of-a-harder-problem.',
      'Case-study writing or visuals that feel averaged and authorless.',
    ],
    drawsAttention: [
      'Design-systems case studies that connect token and component decisions to real adoption or cross-team impact.',
      'Research work that justifies the method chosen and shows reasoning under imperfect real-world conditions.',
      'Annotated, artifact-forward presentation — a format that invites critique rather than just presenting conclusions.',
      'Distinctive craft and a clear personal point of view.',
    ],
    aiEraNote:
      "As of August 2026, peers tend to be more technically literate about AI tools than most hiring managers, which shifts what they're judging: not whether AI was used, but whether the authorship and judgment are still visibly a person's own. There's an unresolved split here between those arguing designers must restructure their practice around AI-native workflows and those arguing craft and judgment matter exactly as much as before, just applied to new tools. This research presents that as an open disagreement rather than settled guidance.",
    confidence: ['substantiated', 'verified', 'substantiated', 'substantiated', 'substantiated'],
  },
  {
    id: 'technical-peer',
    label: 'Technical / Engineering Peer',
    tagline:
      'A software engineer, engineering manager, or technical lead reads a design portfolio differently from a design reviewer — less moved by visual polish, more interested in whether the designer understands and works within real technical constraints. Respect here is earned through things that can be checked: shipped work, working demos, explained trade-offs.',
    factoids: [
      'Trusts things they can verify over claimed skills',
      'GitHub activity is a contested signal, not a requirement',
      'Reads design-system work as design and engineering judgment at once',
    ],
    looksFor: [
      'Case studies that name real technical constraints — API limits, an existing component library, performance and accessibility budgets, pushback from engineering — and how those shaped the design.',
      'Proof they can check rather than skills declared: a link to the actual work, not just "built with React."',
      'Signs of genuine collaboration with engineers, backed by a specific example rather than a claim of being cross-functional.',
      'Component and design-system work, the one artifact type that reads to this audience as design judgment and engineering thinking simultaneously.',
    ],
    losesThem: [
      'A contribution graph or "I code" used as a headline claim — a contested signal, and to some engineers a graph-optimized profile is itself a mild red flag.',
      'AI-assisted work presented as effortless. Engineers are skeptical of unverified AI output in their own work — one survey found 96% do not fully trust it — so a case study that shows what was checked and fixed lands better than one claiming speed.',
      'Overclaiming full-stack mastery of both design and engineering, a specifically named critique in this research.',
      'Case studies that read as pure sales pitch, with no friction or compromise anywhere in them.',
    ],
    drawsAttention: [
      'Shipped, live, working things over descriptions of process.',
      'Specific technical decisions — the actual trade-off made, not just the outcome it produced.',
      "The portfolio site's own build quality, which functions as a live demo whether or not anyone opens developer tools.",
    ],
    aiEraNote:
      'A snapshot as of August 2026, and genuinely still moving. One camp holds that AI raised the baseline — coding fluency is now table stakes for design-engineering roles, and the differentiator has moved to systems judgment and taste. Another warns that pushing designers toward solo AI-assisted "production-ready" delivery creates cleanup work for engineering teams. What holds across both: demonstrated verification and judgment earns credibility with engineers, not the fact of having used AI.',
    confidence: ['substantiated', 'verified', 'substantiated', 'substantiated', 'substantiated'],
  },
  {
    id: 'product-manager',
    label: 'Product Manager',
    tagline:
      'A product manager reading a design portfolio — as a hiring-adjacent stakeholder or a future cross-functional partner — is reading for one thing above all: will this designer be a partner on business trade-offs, or someone who defends decisions on taste alone. Visual polish matters less to them than whether problems are framed as business problems and trade-offs are shown as decisions that were negotiated.',
    factoids: [
      'Reads for business consequence, not visual craft',
      'Wants at least one trade-off shown with its reasoning',
      'Notices "we decided" over solo-hero narration',
    ],
    looksFor: [
      'Case studies framed around a business or user consequence — what would have gone wrong if this had not been solved.',
      'At least one moment where two options were weighed openly, with the reasoning attached, rather than the winning option presented as obvious.',
      'Honest narration of collaboration: who else was involved, and which parts were genuinely one person\'s.',
      'Early-stage, ambiguous problems, which read stronger to this audience than incremental feature polish.',
      'Metrics where they exist — though the decision trail behind a number matters more to them than the number.',
    ],
    losesThem: [
      'Visual-craft narration with no decision reasoning attached — it reads as unproven even when the work is beautiful.',
      'Case studies that never mention who else was in the room.',
      'Impact claims with no stated baseline or mechanism, which read as inflated.',
      'Long step-by-step process documentation standing in for the actual decision.',
    ],
    drawsAttention: [
      'Ambiguous, early-stage problems with a real business stake.',
      'A visible negotiation or trade-off — time against quality, scope against deadline, ideal against shipped — narrated with the reasoning intact.',
      'Evidence the designer engaged with business goals and constraints rather than working around them.',
    ],
    aiEraNote:
      'As of August 2026, opinion among product managers is genuinely split rather than settled. One camp describes PMs handing designers AI-built prototypes to refine, treating prototyping as a shared medium — and a designer who engages with that collaboratively may read as a stronger partner. A vocal counter-camp pushes back on AI speed as a substitute for judgment. The net effect is that showing speed without showing the judgment behind it is a risk with this audience rather than a safe bet.',
    confidence: ['single-voice', 'verified', 'verified', 'substantiated', 'substantiated'],
    confidenceNote:
      'The evidence on how product managers read a portfolio, specifically, is thinner than for the other personas here — the published literature covers PM and design collaboration more than portfolio review itself. That gap is shown rather than papered over.',
  },
  {
    id: 'artist-digital-artist',
    label: 'Artist / Digital Artist',
    tagline:
      "This visitor isn't evaluating anyone for hire. They're a fellow artist, an art enthusiast, or a potential follower, browsing creative work the way it's browsed on Behance, ArtStation, or Instagram: visually, quickly, and usually arriving through a feed or a tag rather than a direct visit. What earns a follow isn't one strong piece — it's a legible identity.",
    factoids: [
      'Reads a body of work, not individual pieces',
      'Presentation quality can outweigh raw execution',
      'Cares whether work is human-made, and wants that said plainly',
    ],
    looksFor: [
      'A cohesive body of work or a series, rather than a scattered mix of one-offs — a throughline is what lets someone grasp what an artist is about.',
      'High-resolution, well-presented images. Presentation quality can outrank execution: an average piece presented beautifully reads better than a strong piece presented poorly.',
      'A recognizable personal style — or, for artists working across several, clear grouping so range does not read as incoherence.',
      'Personal and passion work alongside any client work; personal pieces are repeatedly cited as what actually gets an artist noticed.',
      'Some authentic presence beyond the images — process, personality, real interaction with other artists.',
      'A plain statement about whether work is human-made, which this audience currently reads as meaningful rather than obvious.',
    ],
    losesThem: [
      'An unstructured mix of unrelated pieces with no visible throughline.',
      'A body of work made up mostly of unfinished pieces, which some read as amateur — though process content also drives engagement, a genuine tension in this research.',
      "Creative work presented as a UX case study — this audience isn't reading for problem, process, and outcome.",
    ],
    drawsAttention: [
      'Consistent series and bodies of work over disconnected pieces.',
      'Personal passion projects rather than only commissioned work.',
      'Process and behind-the-scenes content.',
    ],
    aiEraNote:
      'As of August 2026 this is an unresolved and high-stakes topic in art communities rather than a footnote. Working artists surveyed about their own paid creative work are overwhelmingly opposed to generative AI — one 2026 academic survey found 99% dislike it and 88% refuse to use it for image generation — while a broader survey of the wider artist population found a real split, with 61% seeing it as a threat and 44% seeing some benefit. Disclosure sits close to a cross-camp consensus even among artists who differ on AI itself. The platform-level consequences have been real, from the 2022 ArtStation protests to the AI-free Cara app growing from 40,000 to 650,000 users in a week in 2024.',
    confidence: ['substantiated', 'substantiated', 'substantiated', 'substantiated', 'substantiated'],
  },
];

export function researchPersonaById(id: ResearchPersonaId): ResearchPersona {
  const persona = CAREER_PERSONA_RESEARCH.find((p) => p.id === id);
  if (!persona) throw new Error(`Unknown research persona: ${id}`);
  return persona;
}

// Confidence rolls up to the weakest of a persona's 5 per-question tiers (not an
// average) — a finding set is only as strong as its thinnest question. The
// breakdown keeps the per-question spread visible so the single badge never
// hides it.
export function rollupConfidence(confidence: ConfidenceTier[]): { tier: ConfidenceTier; breakdown: string } {
  const weakest = confidence.reduce((worst, tier) =>
    TIER_ORDER.indexOf(tier) < TIER_ORDER.indexOf(worst) ? tier : worst,
  );
  const counts = TIER_ORDER.map((tier) => ({ tier, count: confidence.filter((c) => c === tier).length })).filter(
    ({ count }) => count > 0,
  );
  const breakdown = counts
    .slice()
    .reverse()
    .map(({ tier, count }) => `${count} ${CONFIDENCE_TIER_LABEL[tier]}`)
    .join(' · ');
  return { tier: weakest, breakdown };
}

export const OVERVIEW_HIGHLIGHTS = [
  { value: '6', label: 'visitor types researched' },
  { value: '5', label: 'questions asked of each' },
  { value: '129', label: 'sources behind the findings' },
  { value: '3-tier', label: 'confidence rating on every finding' },
];

export const METHODOLOGY: Entry[] = [
  {
    id: 'purpose-approach',
    title: 'What this research is',
    period: 'Independent research, 2026',
    sections: [
      {
        intro:
          "Six very different kinds of people end up looking at a UX portfolio, and they read one in genuinely different ways — a recruiter scanning for completeness in seconds, a design peer looking for methodology, an engineer checking whether the work survives real constraints, an artist who isn't evaluating anyone for hire at all. This is a research project into how each of them actually reads portfolio work: what they look for, what loses them, and what catches their eye. It applies the same confidence-scoring and verification approach behind the 20-persona system on the AWS Persona page, pointed at a different question — not how customers use an enterprise platform, but how visitors judge a portfolio. Every finding carries a rating for how well-evidenced it is, including the ones where the evidence is thin.",
      },
    ],
  },
  {
    id: 'research-questions',
    title: 'The five questions',
    period: 'Asked identically of every persona',
    sections: [
      {
        intro: 'Each of the six personas was researched against the same five questions:',
        bullets: RESEARCH_QUESTIONS.map((q) => q.label),
      },
    ],
  },
  {
    id: 'verification-methodology',
    title: 'How confidence is rated',
    period: 'Three-tier verification',
    sections: [
      {
        intro:
          'Findings are rated per question rather than per persona, so a persona can be well-evidenced on some questions and thin on others. The three tiers:',
        bullets: [
          'Single-voice — the finding appears in only one source, or in several sources that all trace back to the same origin.',
          'Substantiated — corroborated by at least three independent sources across at least two kinds of source, and recent enough to still hold: within 24 months generally, or 12 months for anything about AI.',
          'Verified — substantiated, and backed either by a primary authoritative source or by finding no source anywhere in the research that materially contradicts it.',
        ],
      },
      {
        heading: 'Why AI findings rarely reach the top tier',
        intro:
          "Every persona's AI finding landed at Substantiated rather than Verified, and that is an honest result rather than an incomplete one. The underlying reality is still shifting fast enough that credible sources genuinely contradict each other, which is exactly what the top tier requires the absence of. Where a topic is unsettled, these pages say so instead of picking the tidier answer.",
      },
    ],
  },
];

export const APPLICATIONS: Entry[] = [
  {
    id: 'persona-dashboard',
    title: 'A dashboard that adapts to who is reading it',
    period: 'In progress',
    sections: [
      {
        intro:
          "The main thing this research is for is showing a real use for personas: a dashboard whose widgets correspond to what someone in a given persona would actually want to see, arranged for their use case rather than for everyone at once. A UX professional probably doesn't care much about my paintings from university, but is genuinely interested in the standards website I built to host the design standards a development team works from. A recruiter wants close to the opposite — a fast, complete overview rather than depth in any one place. An artist wants the paintings and none of the case studies.",
      },
      {
        intro:
          "The plan is for it to open on a default set of widgets chosen for whichever persona is selected, then hand over control: any widget can be added or removed, and the arrangement is yours to rearrange. The defaults come from the findings on these pages rather than from guesswork — each persona's starting layout reflects what the research says that persona reads first.",
      },
      {
        intro: 'This is currently being built and is not on the site yet. The research behind it is what these pages document.',
      },
    ],
  },
  {
    id: 'weighting',
    title: 'Where the six agree, and where they split',
    period: 'Cross-persona findings',
    sections: [
      {
        intro:
          'Comparing the six side by side separates what every visitor wants from what only some do — which is what makes a per-persona layout worth building at all:',
        bullets: [
          'Wanted by everyone: working contact details, a site that loads fast and works on a phone, and a clear account of what one person actually contributed to shared work.',
          'The same content, at different depths: case studies are wanted by nearly every persona, but a recruiter wants a fast labeled overview, a hiring manager wants three to five in depth, and a design peer wants the fullest process view of the three.',
          'Genuinely different content: design-systems work matters most to design peers and engineers, business framing to product managers, code artifacts to engineers and almost no one else.',
          'One persona needs a different shape entirely: an artist is browsing visually and is not reading case studies at all, so that layout leads with the work itself rather than with write-ups about it.',
        ],
      },
    ],
  },
  {
    id: 'evaluating-ideas',
    title: 'A lens for evaluating new ideas',
    period: 'Ongoing',
    sections: [
      {
        intro:
          "Beyond this site, each persona summary doubles as a perspective to think from when weighing up a new project idea: would this person find it valuable, what would they look for in it, does it hold up from where they sit. The product manager summary is the most direct example, since assessing feasibility and fit is that role's actual professional lens — but the same trick works for each of them.",
      },
    ],
  },
];
