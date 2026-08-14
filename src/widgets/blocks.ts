// Shared content-block schema every widget is authored against — see Widget.tsx,
// the single component that renders any combination of these. Changing how a block
// type looks (e.g. `tags`) changes it everywhere at once, per WIDGET-TRACKER.md.

export type Block =
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string; secondary?: boolean }
  | { type: 'stat'; value: string; label: string }
  /** A bordered row of stats, rendered through the shared `StatGrid` component —
   * the same treatment AWS Persona and Career Persona Research use for their
   * "by the numbers" moments. Prefer this over several consecutive `stat`
   * blocks, which stack vertically and read as competing headlines. Values
   * should be numerals: `stat`/`statGrid` set them in Cloudscape's large-value
   * style, which a phrase looks wrong in. */
  | { type: 'statGrid'; stats: Array<{ value: string; label: string }> }
  | { type: 'tags'; items: string[] }
  | { type: 'list'; items: Array<{ primary: string; secondary?: string; href?: string }> }
  | {
      type: 'filterableList';
      categories: string[];
      /** How many items to show when the filter is "All categories" — a specific
       * category always shows its full (small) list, no cap needed. */
      defaultCount: number;
      items: Array<{ primary: string; secondary?: string; href?: string; category: string }>;
    }
  | { type: 'timeline'; items: Array<{ title: string; period: string; detail?: string }> }
  | { type: 'quote'; text: string; attribution: string }
  | { type: 'linkList'; items: Array<{ label: string; href: string; description?: string }> }
  | { type: 'button'; text: string; href: string; external?: boolean };

export interface WidgetContent {
  compact: Block[];
  expanded: Block[];
}
