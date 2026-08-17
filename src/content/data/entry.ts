// Generic long-form content shape: a title/period entry made of one or more
// sections (each an optional heading, an optional intro paragraph, and/or a
// bullet list). Originally built for Work Experience roles, reused anywhere a
// full page needs "verbose, expandable" content — persona research programs,
// design-system initiatives, AI-build projects, etc. Rendered by the shared
// EntrySectionItem (site/src/components/EntrySection.tsx).
export interface EntrySection {
  heading?: string;
  intro?: string;
  bullets?: string[];
}

// A project named on a diagram, opened as a popover rather than laid out in
// full. `blurb` is deliberately one short paragraph: the full write-up lives in
// the tab or page named by `fullDetailIn`, and the popover points there instead
// of carrying a second copy that could drift from it.
//
// Shared by the AI-Augmented Build and AWS Persona pages, which render it
// through components/ProjectPopover.tsx.
export interface PopoverProject {
  id: string;
  title: string;
  period: string;
  blurb: string;
  /** Where the full text lives, e.g. "Agents & Auditing tab". */
  fullDetailIn: string;
}

export interface Entry {
  id: string;
  title: string;
  period: string;
  sections: EntrySection[];
  /** External link to a fuller write-up, rendered next to the period as
   * `hrefLabel` (natural-language text, not the raw URL). */
  href?: string;
  hrefLabel?: string;
  /** Path under public/, e.g. "art/hovercraft/hovercraft-drawing.jpg" — the
   * same image used at the top of the linked post, not an invented one.
   * Rendered to the right of the expanded content when present. */
  thumbnailSrc?: string;
  thumbnailAlt?: string;
}
