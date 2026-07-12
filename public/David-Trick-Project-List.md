Companion artifact to the resume, lists the projects behind the resume bullets, organized the same way the resume is organized: **UX Vision/Standards/Design Systems** · **Persona-Driven Research & Design** _(specialization)_ · **AI-Augmented Design-to-Build** · **Cross-Team Enablement** · **Earlier (Controls Design Engineer)**.

Roles are listed where relevant. _Owner_ = sole driver from kickoff through delivery. _Collaborator_ = contributing member of a team-driven project. _Team member_ = part of a launch team without owning the design.

---

## UX Vision, Standards & Design Systems

### UX Tenets & Standards Document _(Owner, 2026)_

Authored a 3-layer reference for how the platform should look, behave, and evolve: 15 design tenets (the philosophy — _start from the job_, _the system knows you_, _filter don't flood_, progressive disclosure) → 19 standard tenets (navigation, visual language, data states, writing, permissions, data visualization, architecture) → 17 component specs across all page types. Every component rule traces back through a standard to a design tenet.

### UX Audit Program — Tenet-Based Schema V2 _(Owner, 2026)_

Audited the platform against a tenet-based audit schema developed in parallel — schema **v1.7.0** with **39 global rules + specific page-type exceptions**, each rule traceable to a specific design tenet. Covered design system compliance, accessibility, data state handling, interaction safety, and visual consistency. Most recent round added 6 new rules + 3 extensions + 3 new tenets from a structured best-practices gap analysis. **6 rules promoted to CI enforcement.**

### UX Standards Website _(Owner, 2026)_

Standalone reference site (non-production sandbox) serving a dual purpose: documents the platform's UX standards (page types, components, audit rules, accessibility requirements) **and** provides a customer-interactive, customizable mockup for persona-based landing-page dashboards. Used internally as a demoable artifact for the persona vision and data collection.

### UX Roadmap & Task Hierarchy _(Owner, 2026)_

Defined and documented the full UX roadmap: 5 workstreams (UX Vision & Standards, Persona-Based Interaction Design, Mockups & Design Deliverables, Scaling & Tooling, Training & Enablement). Produced manager-facing framework doc and 5 initiative 1-pagers. Presented to skip-level and direct manager; secured Q2 direction with persona-driven design as the execution focus.

### Cross-Org Terminology Standardization _(Owner, 2026)_

Led a terminology standardization effort across 4 organizations for verification/validation UI labels. Coordinated meetings, surfaced naming conflicts, and produced 6 naming decisions adopted platform-wide. Established a repeatable process for future terminology questions.

### UI Code Review Gatekeeper _(Ongoing, role contribution)_

De facto UI/UX approval authority for the platform team. **246+ design-feedback messages per year** across cross-team code reviews — design-system compliance checks, usability callouts, persona-impact flags. Codified into the build-step model (see AI-Augmented Design-to-Build).

### Drift Notification UX Standard _(Owner, 2026)_

Defined the UX standard for drift/deviation notifications in data tables to include accessibility concerns regarding color -> color + icon. Reviewed iterations with the implementing developer and approved the final version.

### Real-Time UX Guidance _(Ongoing role contribution)_

Provides on-demand UX direction via team chat and via CR comments for in-progress work. Examples include: container consistency on monitoring pages, primary-button placement, table-cell formatting decisions. Decisions are captured back into the standards document where pattern-worthy.

---

## Persona-Driven Research & Design _(specialization)_

### 20-Persona Documentation System _(Owner, 2026)_

Built the platform's persona registry — **20 personas across 6 job-family categories**. Each persona has inline source references, a quarterly review checklist, and explicit feature dependencies with routes. Role-specific interviews verify each persona, surfacing insight beyond what desk research can capture; once verified, a 1-page human-readable wrap sheet is published as the canonical reference. Companion artifacts: 25-link source references document, developer-facing usage guide, and a bidirectional persona ↔ feature dependency map (20 personas × 30+ features × 9 critical paths) with gap-detection rules.

### Persona Confidence Scoring & Outreach Prioritization _(Owner, 2026)_

Added confidence scoring (High/Medium/Low) to all 20 personas keyed to validation source quality (number of customer voices, recency, regional spread, deployment-model spread). Default sort by confidence surfaces quality gaps and directly drove the prioritized customer outreach plan — including the identification of the two highest-usage personas with lowest confidence as the top outreach targets.

### Sub-Persona Promotion Framework _(Owner, 2026)_

Defined a sub-persona model so role variants from different regions, deployment models, or operational contexts can be tracked alongside their parent persona. Promotion rules graduate variants through three tiers — single-voice → substantiated → verified — as customer evidence accumulates from interviews and form responses. Prevents "persona fatigue" (one big bucket per role) and "persona explosion" (every variation gets its own page).

### Customer Validation Program _(Owner, 2026)_

Designed and ran the customer-facing validation program: **6 review documents** covering all 20 personas with **~112 targeted, non-jargon questions** written for non-technical audiences. Established an unbiased feedback channel and a customer-interaction template. Multiple polls and interview cycles drove platform-wide design decisions including status-display preferences, terminology choices, and dashboard widget composition.

### 4 Persona Landing-Page Dashboards _(Owner, 2026)_

Built 4 interactive React dashboards covering the launch persona set with draggable widget layouts and operational variants per persona. Includes a contextual drawer for per-user widget customization. Implementations are interactive prototypes deployed to the UX Standards Website sandbox.

### North-Star Design Vision _(Owner, 2026)_

Authored the platform's north-star design document: **widget-based atomic units → persona-templated dashboards → deep-dive experiences**. Mapped all 20 personas to default dashboard templates with a defined customization lifecycle (default → user-customized → reset). Synthesized existing vision docs with the new widget/dashboard/experience model.

### Q2/Q3 Persona Experience Execution Plan _(Owner, 2026)_

Strategic plan defining how the platform determines what pages, widgets, and navigation to show users based on their job role. 3 architecture decisions (hybrid approach, experiences + widgets coexistence, phased priority order), 5 milestones (vision paper, persona validation, role detection, landing pages, audit rules), 16 mockup requirements, collaboration model, and success criteria.

### Leadership Preview — Persona Vision as a Working UX Model _(Owner, 2026)_

Presented the 4 persona landing-page dashboards live on the UX Standards Website sandbox to immediate leadership. First leadership exposure to the persona-driven UX vision **as a working interactive UX model** (with role detection, draggable widgets, and operational variants) rather than static mockups or documents. Demo included a Q3+ roadmap discussion.

### Field Customer Feedback Integration _(Owner, 2026)_

Established a direct customer-feedback loop: extracted verbatim feedback from a field interview and incorporated it into the persona file, the validation review questions (3 new questions added), and the persona landing-page mockup (new data widgets). Pattern reused across subsequent customer interviews.

---

## AI-Augmented Design-to-Build

### AI Development Agents Package _(Owner, 2026)_

Built an internal AI development agents package with **39 validated capabilities** (16 skills, 1 agent, 3 SOPs, 19 context files) approved by the team. Audit skill available for on-demand UX review during development. Page-creation skill generates standards-compliant shells so new pages pass the audit schema on first run. Two workflow modes: interactive + persona-aware for local development, deterministic for the CI pipeline. Standards violations now **affect code reviews**while persona feedback ships as non-blocking advisory cards.

### Unified Audit-Aware Page Generator _(Owner, 2026)_

Consolidated two earlier page-generation tools into a single audit-aware generator. A clarification phase identifies the page type from the audit-schema taxonomy, loads required/forbidden components and v2 rules before generating, and produces standards-compliant output from natural-language descriptions. Published as a shared team resource.

### "How to Make a Platform Page" AI Reference _(Owner, 2026)_

Authored a single-document reference for AI mockup-generation tools and AI assistants to produce platform-compliant page designs. Covers the page-type taxonomy, required/forbidden components, quality rules by severity, component mapping, and an audit-validation checklist. Audited against authoritative sources.

### Figma Make → React Rapid Prototyping Pipeline _(Owner, 2026)_

Pioneered an AI-assisted prototyping flow: **6 AI-generated mockups → 4 interactive persona dashboard implementations** in React. First concrete visual artifacts for the persona-driven UX direction — closes the gap between design exploration and interactive visualization without stopping at static mockups.

### AI-Powered Page Auditing Agent _(Owner, 2024 – Present)_

Original custom AI agent for automated platform-page auditing — predecessor to the agents package above. Started in 2024, established the audit-as-CI pattern that the broader agents package now extends and operationalizes.

### AI-Powered Sprint Management System _(Owner, 2026)_

Designed and documented a sprint management system operated through AI agents — sprint structure (numbered sprints for active work, backlog sprint for epics), punt pattern, and rules. AI agents manage sprint boards, create punt clones, and track velocity; human-in-the-loop confirmation on agent-generated comments keeps oversight in place. Documented as reusable configuration.

### Design Activity Detection Automation _(Owner, 2026)_

Built auto-discovery tooling that detects AI-generated design files in the team's design-tool project and includes them in daily activity reports. Eliminated manual file registration across 17 scanned projects.

---

## Cross-Team Enablement & Launches

### Formal Training Modules _(Owner, ongoing)_

Authored 3 formal training modules covering platform graphics navigation, standard library management, and site deployment. Delivered an in-person 2.5-hour Figma training to a partner graphics engineering team to distribute basic design capability outside the platform team.

### 2025 Platform Launches _(Team member)_

Contributed as a team member to three 2025 launches:

- **Full-text search GA** _(Sep 2025)_ — search across devices, sites, alarms, and docs. 85ms p50 latency, 72% adoption, 94% accuracy, 4.2% zero-result rate.
- **v2 platform migration** _(Jun 2025)_ — zero downtime over a 6-month phased rollout. 10× query performance (500ms → 50ms), 35% infrastructure cost reduction, 99.99% availability (up from 99.95%), zero data loss.
- **Mobile beta** _(Nov 2025)_ — iOS/Android via React Native for AWS field technicians. 78 beta users (target 50), 0.3% crash rate, 4.2★ rating.

### Reusable Notification Component _(Owner, shipped 2025)_

Authored a reusable notification component for the platform with configurable expiration dates and global removal support.

### Bulk Setpoint Updates _(Collaborator, shipped Dec 2025)_

Collaborated on bulk setpoint adjustment feature design (mockups) and requirements.

---

## Active Ownership — In Progress _(2026)_

- **Self-Service Graphics User Flow** — End-to-end self-service graphics workflow from site scope of work through commissioning; interactive demo built and full user journey mapped across 5+ workflow stages.
- **Site Documents Storage** — Design doc for document storage in the platform's configuration management system.
- **Configuration Management Platform Integration** — Requirements, roadmap, and design docs for expanded device-template UI with diff views, peer review, and version history.
- **Standard Library** — Standardized graphics template system and library management for consistent graphics across all sites globally.
- **HMI Styleguide Redesign** — Leading the HMI Styleguide redesign for consistent HMI graphics across sites; coordinating with international and implementation teams.
- **HMI Integration** — Defining next-generation UI framework interface requirements for platform integration.
- **Firmware/Settings Compliance Auditing** — Audit workflows and breaker state tracking for firmware/settings discrepancy remediation across operations and field teams.
- **Cross-Project Graphics Action Tracking** — Master tracker and priority lists across all infrastructure graphics sub-projects.

---

## Active Collaboration _(2026)_

- **Global Events Dashboard** — Dashboard for viewing events across regions.
- **Page Manager** — Graphics editing capabilities and editing-mode UX design within the infrastructure management platform.
- **Training Program Development** — Co-authored 3 training modules; coordinating 2026 training schedule.
- **Tablet Experience** — Tablet-optimized platform experience and tablet-specific requirements.
- **Predictive Maintenance Platform** — Cloud-based predictive maintenance integration with the monitoring platform.
- **New Equipment Infrastructure** — Equipment intercept planning and control graphics with cross-functional team.

---

## Earlier — Controls Design Engineer _(2017–2022)_

### Global Automation Controls Graphics Deployment Program _(Owner)_

Built the global cross-team workflow for creating, reviewing, and deploying artwork for data center HMIs worldwide from the ground up. **3 ticketing templates still in active use.**

### Controls GUI Style Guide _(Co-author)_

Co-created the graphics standards package that established visual consistency across all AWS data centers globally. **Still in active use 8+ years later.**

### Centralized Graphics Repository + Annotation Runbook _(Owner)_

Established the centralized repository for completed artwork across all sites and authored the definitive annotation runbook. **Shared 7+ times to onboard team members.**

### Multi-Site DC Graphics Audit & Remediation Plan _(Owner)_

Audited BMS graphics across all legacy US data centers against 62 graphical standard elements. Produced a ROI-ranked 3-phase remediation plan (~4,600 hours estimated, ~$730K) and pitched the program to senior leadership.

### Floorplan Pipeline Automation _(Owner)_

Replaced the image-based floorplan workflow with direct CAD file processing across two optimization phases. **60% reduction in average generation time.**

### Modular EPMS Graphical Interface _(Owner)_

Designed the graphical interface for a modular electrical distribution system with a 10-inch touchscreen EPMS. Submitted to the manufacturer for global production reproduction.

### 7-Page Colocation HMI Template _(Owner)_

Designed and built the 7-page colocation HMI template adopted for international colocation site deployments.

### Vendor Graphics Submittal Reviews _(Ongoing role contribution)_

Reviewed BMS and power-monitoring vendor graphic submittals for global sites (US, Europe, Asia-Pacific) against AWS controls standards.

---

## Personal / Pre-AWS Projects

### 3D-Printed Hovercraft Prototype _(Personal, 2015 – 2017)_

Personal additive-manufacturing project iterated through V1, V2, and V2.5. Iteration approach: prove viability with a deliberately rough V1, capture lessons, redesign smaller and lighter for V2, refine clip-fit tolerances and add directional motors with safety cages for V2.5. Demonstrates rapid prototyping methodology and an iterate-from-evidence design approach.

### UW Hyperloop Test Cell _(University Research, 2016)_

Designed test cell apparatus for magnetic-levitation thrust vector measurement using strain gauges; one of two members on the project. Created CAD models and engineering drawings; collaborated on conceptual design for the Hyperloop transportation system.

### EcoCar Capstone _(University, 2015 – 2016)_

University of Washington capstone — machined connective components used throughout the EcoCar (brackets, mounts, gears, cradles, crossbars, frames). SolidWorks drawings, NX programming. Brief membership on the engine-frame coupling team.

### Freelance Design — Syncopated Design _(2010 – 2017)_

Full-spectrum design services across logo design and branding, typography, journal and book design, website creation and maintenance, animation, and UI/UX for clients across diverse industries.