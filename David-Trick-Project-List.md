# David Trick — Project Brag List

Companion artifact to the resume, lists the projects behind the resume bullets, organized the same way the resume is organized: **UX Vision/Standards/Design Systems** · **Persona-Driven Research & Design** *(specialization)* · **AI-Augmented Design-to-Build** · **Cross-Team Enablement** · **Earlier (Controls Design Engineer)**.

Roles are listed where relevant. *Owner* = sole driver from kickoff through delivery. *Collaborator* = contributing member of a team-driven project. *Team member* = part of a launch team without owning the design.

---

## UX Vision, Standards & Design Systems

### UX Tenets & Standards Document *(Owner, 2026)*
Authored a 3-layer reference for how the platform should look, behave, and evolve: 15 design tenets (the philosophy — *start from the job*, *the system knows you*, *filter don't flood*, progressive disclosure) → 19 standard tenets (navigation, visual language, data states, writing, permissions, data visualization, architecture) → 17 component specs across all page types. Built on top of **Cloudscape**, AWS's open-source design system, so the standards extend an established component library rather than replacing it. Every component rule traces back through a standard to a design tenet.

### UX Audit Program — Tenet-Based Schema V2 *(Owner, 2026)*
Audited the platform against a tenet-based audit schema developed in parallel — schema **v2.5.1** with **103 machine-checkable rules** (31 high · 48 medium · 18 low · 6 advisory) across **13 page types** + **15 documented page-type exceptions**, each rule traceable to a specific design tenet. Covered design system compliance, accessibility, data state handling, interaction safety, and visual consistency. **Full platform coverage: all 42 pages audited**, then re-audited end to end against the current schema — **~112 findings across 28 pages, 14 pages clean.** **6 rules recommended for promotion to CI enforcement** *(pending)*.

### UX Standards & Requirements Wiki *(Owner, 2026)*
Consolidated the platform's UX guidance into a single maintained entry point for the team: the standards, the audit rules, the audit results, page types and components, accessibility requirements, and mockup summaries. Replaced a purpose-built standalone site as the thing the team maintains — same reference content, no separate application to own.

### UX Standards Website *(Owner, 2026 — content since consolidated into the wiki)*
Standalone reference site (non-production sandbox) that served a dual purpose: documented the platform's UX standards (page types, components, audit rules, accessibility requirements) **and** provided a customer-interactive, customizable mockup for persona-based landing-page dashboards. Used internally as a demoable artifact for the persona vision and data collection — the interactive sandbox is what let the persona vision be clicked through rather than read about, and it carried that work through its review period. Its documentation content now lives on the wiki.

### UX Roadmap & Task Hierarchy *(Owner, 2026)*
Defined and documented the full UX roadmap: 5 workstreams (UX Vision & Standards, Persona-Based Interaction Design, Mockups & Design Deliverables, Scaling & Tooling, Training & Enablement). Produced manager-facing framework doc and 5 initiative 1-pagers. Presented to skip-level and direct manager; secured Q2 direction with persona-driven design as the execution focus.

### Cross-Org Terminology Standardization *(Owner, 2026)*
Led a terminology standardization effort across 4 organizations for verification/validation UI labels. Coordinated meetings, surfaced naming conflicts, and produced 6 naming decisions adopted platform-wide. Established a repeatable process for future terminology questions.

### UI Code Review Gatekeeper *(Ongoing, role contribution)*
De facto UI/UX approval authority for the platform team. **200+ design-feedback messages** across cross-team code reviews — design-system compliance checks, usability callouts, persona-impact flags. Codified into the build-step model (see AI-Augmented Design-to-Build).

### Drift Notification UX Standard *(Owner, 2026)*
Defined the UX standard for drift/deviation notifications in data tables to include accessibility concerns regarding color → color + icon. Reviewed iterations with the implementing developer and approved the final version.

### Real-Time UX Guidance *(Ongoing role contribution)*
Provides on-demand UX direction via asynchronous chat and via code-review comments for in-progress work. Examples include: container consistency on monitoring pages, primary-button placement, table-cell formatting decisions. Decisions are captured back into the standards document where pattern-worthy.

---

## Persona-Driven Research & Design *(specialization)*

### 20-Persona Documentation System *(Owner, 2026)*
Built the platform's persona registry — **20 personas across 6 job-family categories**. Each persona has inline source references, a quarterly review checklist, and explicit feature dependencies with routes. Role-specific interviews verify each persona, surfacing insight beyond what desk research can capture; once verified, a 1-page human-readable wrap sheet is published as the canonical reference. Companion artifacts: 25-link source references document, developer-facing usage guide, and a bidirectional persona ↔ feature dependency map (20 personas × 30+ features × 9 critical paths) with gap-detection rules.

### Persona Confidence Scoring & Outreach Prioritization *(Owner, 2026)*
Added confidence scoring (High/Medium/Low) to all 20 personas keyed to validation source quality (number of customer voices, recency, regional spread, deployment-model spread). Default sort by confidence surfaces quality gaps and directly drove the prioritized customer outreach plan — including the identification of the two highest-usage personas with lowest confidence as the top outreach targets.

### Sub-Persona Promotion Framework *(Owner, 2026)*
Defined a sub-persona model so role variants from different regions, deployment models, or operational contexts can be tracked alongside their parent persona. Promotion rules graduate variants through three tiers — single-voice → substantiated → verified — as customer evidence accumulates from interviews and form responses. Prevents "persona fatigue" (one big bucket per role) and "persona explosion" (every variation gets its own page).

### Customer Validation Program *(Owner, 2026)*
Designed and ran the customer-facing validation program: **6 review documents** covering all 20 personas with **~112 targeted, non-jargon questions** written for non-technical audiences. Established an unbiased feedback channel and a customer-interaction template. Multiple polls and interview cycles drove platform-wide design decisions including status-display preferences, terminology choices, and dashboard widget composition. Collected **18 form responses** alongside **10 recorded interviews and 1 async written exchange**, reaching **4 job families** across **4 operating contexts** (Americas, Asia-Pacific, EMEA, and colocation deployments). **All 4 launch personas moved from Low/Medium to High confidence**, with **8 sub-persona variants promoted to fully verified.**

### Operational-Evidence Cross-Check *(Owner, 2026)*
Cross-checked interview findings against the ticketing system of record rather than accepting them at face value — **6 structured evidence scrapes** producing per-persona corroboration hit-rates of **1.0, 0.90, 0.833, and 0.727**. Moved the persona set from anecdotal to evidenced, and independently validated the underlying data models as a side effect. The strongest credibility signal in the persona program: the claims are checkable against system data.

### Customer Requirements Working Sessions *(Owner, 2026)*
Ran a **6-session customer working-session program** across two workstreams — AI-assisted site and page configuration, and trending/charting/multi-metric UX — spanning six distinct customer and engineering groups. Each session distills into a consistent user-story capture (`As a… I want… so that…` with priority and source), giving downstream delivery a single traceable requirements artifact instead of scattered meeting notes. Extended with async written follow-ups for invitees who could not attend live.

### 4 Persona Landing-Page Dashboards *(Owner, 2026)*
Built 4 interactive React dashboards covering the launch persona set with draggable widget layouts and operational variants per persona. Includes a contextual drawer for per-user widget customization. Implementations are interactive prototypes, originally deployed to the reference-site sandbox.

### North-Star Design Vision *(Owner, 2026)*
Authored the platform's north-star design document: **widget-based atomic units → persona-templated dashboards → deep-dive experiences**. Mapped all 20 personas to default dashboard templates with a defined customization lifecycle (default → user-customized → reset). Synthesized existing vision docs with the new widget/dashboard/experience model.

### Q2/Q3 Persona Experience Execution Plan *(Owner, 2026)*
Strategic plan defining how the platform determines what pages, widgets, and navigation to show users based on their job role. 3 architecture decisions (hybrid approach, experiences + widgets coexistence, phased priority order), 5 milestones (vision paper, persona validation, role detection, landing pages, audit rules), 16 mockup requirements, collaboration model, and success criteria.

### Leadership Preview — Persona Vision as a Working UX Model *(Owner, 2026)*
Presented the 4 persona landing-page dashboards live on the reference-site sandbox to immediate leadership. First leadership exposure to the persona-driven UX vision **as a working interactive UX model** (with role detection, draggable widgets, and operational variants) rather than static mockups or documents. Demo included a Q3+ roadmap discussion.

### Field Customer Feedback Integration *(Owner, 2026)*
Established a direct customer-feedback loop: extracted verbatim feedback from a field interview and incorporated it into the persona file, the validation review questions (3 new questions added), and the persona landing-page mockup (new data widgets). Pattern reused across subsequent customer interviews.

---

## AI-Augmented Design-to-Build

### AI Development Agents Package *(Owner, 2026)*
Built an internal AI development agents package on **Kiro**, AWS's agentic IDE with **39 validated capabilities** (16 skills, 1 agent, 3 SOPs, 19 context files) approved by the team. Audit skill available for on-demand UX review during development. Page-creation skill generates standards-compliant shells so new pages pass the audit schema on first run. Two workflow modes: interactive + persona-aware for local development, deterministic for the CI pipeline. Standards violations now **affect code reviews** while persona feedback ships as non-blocking advisory cards.

### Unified Audit-Aware Page Generator *(Owner, 2026)*
Consolidated two earlier page-generation tools into a single audit-aware generator. A clarification phase identifies the page type from the audit-schema taxonomy, loads required/forbidden components and v2 rules before generating, and produces standards-compliant output from natural-language descriptions. Published as a shared team resource.

### "How to Make a Platform Page" AI Reference *(Owner, 2026)*
Authored a single-document reference for AI mockup-generation tools and AI assistants to produce platform-compliant page designs. Covers the page-type taxonomy, required/forbidden components, quality rules by severity, component mapping, and an audit-validation checklist. Audited against authoritative sources.

### Figma Make → React Rapid Prototyping Pipeline *(Owner, 2026)*
Pioneered an AI-assisted prototyping flow: **6 AI-generated mockups → 4 interactive persona dashboard implementations** in React. First concrete visual artifacts for the persona-driven UX direction — closes the gap between design exploration and interactive visualization without stopping at static mockups.

### AI-Powered Page Auditing Agent *(Owner, 2026)*
Original custom AI agent for automated platform-page auditing — predecessor to the agents package above. Established the audit-as-CI pattern that the broader agents package now extends and operationalizes.

### AI-Powered Sprint Management System *(Owner, 2026)*
Designed and documented a sprint management system operated through AI agents — sprint structure (numbered sprints for active work, backlog sprint for epics), punt pattern, and rules. AI agents manage sprint boards, create punt clones, and track velocity; human-in-the-loop confirmation on agent-generated comments keeps oversight in place. Documented as reusable configuration.

### Design Activity Detection Automation *(Owner, 2026)*
Built auto-discovery tooling that detects AI-generated design files in the team's design-tool project and includes them in daily activity reports. Eliminated manual file registration across 17 scanned projects.

---

## Cross-Team Enablement & Launches

### Formal Training Modules *(Owner, ongoing)*
Authored 3 formal training modules covering platform graphics navigation, standard library management, and site deployment. Delivered an in-person 2.5-hour Figma training to a partner graphics engineering team to distribute basic design capability outside the platform team.

### Cross-Team Design Guidance *(Ongoing role contribution, 2026)*
Provides UX guidance to adjacent teams building on the same design system — reviewing their interfaces, advising on component selection and information architecture, and steering them toward the platform's standards so patterns stay consistent across products rather than diverging per team.

### 2025 Platform Launches *(Team member)*
Contributed as a team member to 2025 platform launches:

- **Full-text search GA** *(Sep 2025)* — full-text search added to the platform's inventory system, covering devices, sites, alarms, and docs.
- **v2 platform migration** *(Jun 2025)* — the platform's v1 → v2 generation shift, spanning both the underlying data-structure migration and the metric-organization tooling that gave users a materially better way to interact with configurations.

Both were primarily back-end initiatives; my involvement was heavier on the configuration-tooling migration, which carried the UX interactions.

### Reusable Notification Component *(Owner, shipped 2025)*
Authored a reusable notification component for the platform with configurable expiration dates and global removal support.

### Bulk Setpoint Updates *(Collaborator, shipped Dec 2025)*
Collaborated on bulk setpoint adjustment feature design (mockups) and requirements.

---

## Active Ownership — In Progress *(2026)*

- **Self-Service Page Creation** — UX owner for the capability that opens graphics-page creation to partner operations and engineering teams without developer involvement, decoupling page delivery from the software release cycle. Ran a cross-regional properties-panel design review, reconciled a live resource constraint into a decision in the room, and locked direction plus follow-ups. Piloting in 2026 with broader rollout planned for 2027.
- **Site Management Dashboard** — UX owner for centralized management of site configuration, graphics, and versioning, including multiple source graphic flows.
- **Self-Service Graphics User Flow** — End-to-end self-service graphics workflow from site scope of work through commissioning; interactive demo built and full user journey mapped across 5+ workflow stages.
- **Site Documents Storage** — Design doc for document storage in the platform's configuration management system.
- **Configuration Management Platform Integration** — Requirements, roadmap, and design docs for expanded device-template UI with diff views, peer review, and version history.
- **Graphics Library** — Standardized graphics template system and library management for consistent graphics across all sites globally.
- **HMI Styleguide Redesign** — Leading the HMI Styleguide redesign for consistent HMI graphics across sites; coordinating with international and implementation teams.
- **HMI Integration** — Defining next-generation UI framework interface requirements for platform integration.
- **Firmware/Settings Compliance Auditing** — Audit workflows and breaker state tracking for firmware/settings discrepancy remediation across operations and field teams.
- **Cross-Project Graphics Action Tracking** — Master tracker and priority lists across all infrastructure graphics sub-projects.

---

## Active Collaboration *(2026)*

- **Global Events Dashboard** — Dashboard for viewing events across regions.
- **Page Manager** — Graphics editing capabilities and editing-mode UX design within the infrastructure management platform.
- **Training Program Development** — Co-authored and edited 3 training modules; 2026 training schedule.
- **Tablet Experience** — Tablet-optimized platform experience and tablet-specific requirements.
- **Predictive Maintenance Platform** — Cloud-based predictive maintenance integration with the monitoring platform.
- **Liquid Cooling Infrastructure** — Intercept planning and control graphics for liquid cooling deployment, with cross-functional team.
- **AI Agent Platform Collaboration** — Two-way collaboration with an internal AI agent platform team: sharing the persona methodology and research to inform their persona work, and bringing their design-system patterns and assets back into the platform.

---

## Earlier — Controls Design Engineer *(2017–2022)*

### Global Automation Controls Graphics Deployment Program *(Owner)*
Built the global cross-team workflow for creating, reviewing, and deploying artwork for data center HMIs worldwide from the ground up. **3 ticketing templates still in active use.**

### Controls GUI Style Guide *(Co-author)*
Co-created the graphics standards package that established visual consistency across all AWS data centers globally. **Still in active use 8+ years later.**

### Centralized Graphics Repository + Annotation Runbook *(Owner)*
Established the centralized repository for completed artwork across all sites and authored the definitive annotation runbook. **Shared 7+ times to onboard team members.**

### Multi-Site DC Graphics Audit & Remediation Plan *(Owner)*
Audited BMS graphics across all legacy US data centers against 62 graphical standard elements, scoring every site against the current standard and writing a one-pager per site. Produced a ROI-ranked 3-phase remediation plan sized at a multi-work-year effort and pitched the program to senior leadership with a test-site proposal.

### Floorplan Pipeline Automation *(Owner)*
Replaced the image-based floorplan workflow with direct CAD file processing across two optimization phases, self-teaching the CAD toolchain to do it. **60% reduction in average generation time.**

### Modular EPMS Graphical Interface *(Owner)*
Designed the graphical interface for a modular electrical distribution system with a 10-inch touchscreen EPMS. Submitted to the manufacturer for global production reproduction.

### 7-Page Colocation HMI Template *(Owner)*
Designed and built the 7-page colocation HMI template adopted for international colocation site deployments.

### Vendor Graphics Submittal Reviews *(Ongoing role contribution)*
Reviewed BMS and power-monitoring vendor graphic submittals for global sites (US, Europe, Asia-Pacific) against AWS controls standards.

### Controls Model Creation (REVIT) *(Owner)*
Created dynamic sensor families with positioning and meta-data for use in the BIM modeling system. Also created a full site model using them for an individual data center as a proof of concept.

---

## Personal / Pre-AWS Projects

### Freelance Design — Syncopated Design *(2010 – 2017)*
Full-spectrum design services across logo design and branding, typography, journal and book design, website creation and maintenance, animation, and UI/UX for clients across diverse industries.

### 3D-Printed Hovercraft Prototype *(University Project & Personal, 2015 – 2017)*
Class initiated additive-manufacturing project iterated through V1, V2, and V2.5. Iteration approach: prove viability with a deliberately rough V1, capture lessons, redesign smaller and lighter for V2, refine clip-fit tolerances and add directional motors with safety cages for V2.5. Demonstrates rapid prototyping methodology and an iterate-from-evidence design approach.

### UW Hyperloop Test Cell *(University Research, 2016)*
Designed test cell apparatus for magnetic-levitation thrust vector measurement using strain gauges; one of two members on the project. Created CAD models and engineering drawings; collaborated on conceptual design for the Hyperloop transportation system.

### EcoCar Capstone *(University, 2015 – 2016)*
University of Washington capstone — machined connective components used throughout the EcoCar (brackets, mounts, gears, cradles, crossbars, frames). SolidWorks drawings, NX programming. Brief membership on the engine-frame coupling team.
