// Shared content-block schema every widget is authored against — see Widget.tsx,
// the single component that renders any combination of these. Changing how a block
// type looks (e.g. `tags`) changes it everywhere at once, per WIDGET-TRACKER.md.

export type Block =
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string; secondary?: boolean }
  | { type: 'stat'; value: string; label: string }
  | { type: 'tags'; items: string[] }
  | { type: 'list'; items: Array<{ primary: string; secondary?: string; href?: string }> }
  | { type: 'timeline'; items: Array<{ title: string; period: string; detail?: string }> }
  | { type: 'quote'; text: string; attribution: string }
  | { type: 'linkList'; items: Array<{ label: string; href: string; description?: string }> }
  | { type: 'button'; text: string; href: string; external?: boolean };

export interface WidgetContent {
  compact: Block[];
  expanded: Block[];
}
