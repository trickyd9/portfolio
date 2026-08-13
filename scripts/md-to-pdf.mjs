// Re-exports public/*.md to public/*.pdf.
//
// Why this exists: the resume and project-list PDFs in public/ are downloads
// offered on the About page, and they were originally produced outside this
// repo (VS Code's markdown preview, printed by headless Chrome — the PDFs
// carry `/Producer (Skia/PDF)` and `/Creator (...HeadlessChrome...)`). That
// left no way to re-export them here when the markdown changed, so the .md and
// .pdf could silently drift apart. First needed 2026-08-13, when the 2025
// launch metrics came out of the resume and project list.
//
// The stylesheet below is not invented: every value was measured out of the
// original PDFs' content streams so a re-export lands on the same design
// rather than a new one.
//
//   page box 595.92 x 841.92pt          -> A4
//   text column 681px, centred          -> 15mm margins
//   body runs at 14px, 22px apart       -> font-size 14px / line-height 22px
//   headings at 28 / 21 / 16.37px       -> browser default 2 / 1.5 / 1.17em
//   only Times-Roman embedded           -> no font-family set; default serif
//   1px black rule under the h1         -> h1 { border-bottom }
//   2px #808080 rules, one per `---`    -> hr
//   #7f7f7f @ 10% fill, 5px #007acc bar -> blockquote
//
// Deliberately no markdown library: the two source files use only headings,
// paragraphs, lists, rules, blockquotes, bold/italic/links, and two-space line
// breaks, so a dependency would cost more than the ~50 lines it saves. If the
// markdown ever grows tables or code blocks, swap in `marked` rather than
// extending the regexes.
//
// Usage: npm run pdf              (both files)
//        npm run pdf -- Resume    (only paths matching "Resume")
//        npm run pdf -- --png     (also dump page images to .screenshots/)
//
// `--png` exists because a PDF is the one artifact in this repo that
// `npm run shot` can't check — it never renders in the dev server. The images
// are the same page content at the same width, so they're what to look at
// before trusting an export.

import { readFileSync, readdirSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { chromium } from 'playwright';

const SITE_DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = join(SITE_DIR, 'public');
// Shared with npm run shot, and git-ignored for the same reason.
const SHOT_DIR = join(SITE_DIR, '.screenshots');

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Inline markdown. Order matters: links first so their text can still take
// bold/italic, and `_..._` before `*...*` since the sources use underscores.
function inline(text) {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `<a href="${href}">${label}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/_([^_]+)_/g, '<em>$1</em>');
}

function toHtml(markdown) {
  const lines = markdown.split('\n');
  const out = [];
  let list = null; // open <ul>
  let para = []; // buffered paragraph/blockquote lines
  let quoted = false;

  // A paragraph's lines are joined with <br> when the source line ended in two
  // spaces — the markdown hard-break, used throughout both files for the
  // subtitle/period lines that sit tight under a heading.
  // Note the order: inline() escapes `<`, so the break tags have to go in
  // after it, not before.
  const flushPara = () => {
    if (!para.length) return;
    const body = inline(para.join('\n')).replace(/ {2}\n/g, '<br>\n');
    out.push(quoted ? `<blockquote><p>${body}</p></blockquote>` : `<p>${body}</p>`);
    para = [];
    quoted = false;
  };
  const closeList = () => {
    if (list) {
      out.push('</ul>');
      list = null;
    }
  };

  for (const line of lines) {
    // `line` keeps its trailing whitespace on purpose — two trailing spaces are
    // the hard-break marker flushPara() looks for.
    const trimmed = line.trim();

    if (!trimmed) {
      flushPara();
      closeList();
      continue;
    }
    if (/^---+$/.test(trimmed)) {
      flushPara();
      closeList();
      out.push('<hr>');
      continue;
    }
    const heading = /^(#{1,6})\s+(.*)$/.exec(trimmed);
    if (heading) {
      flushPara();
      closeList();
      const level = heading[1].length;
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }
    const item = /^[-*]\s+(.*)$/.exec(trimmed);
    if (item) {
      flushPara();
      if (!list) {
        out.push('<ul>');
        list = true;
      }
      out.push(`<li>${inline(item[1])}</li>`);
      continue;
    }
    const quote = /^>\s?(.*)$/.exec(trimmed);
    if (quote) {
      closeList();
      quoted = true;
      para.push(quote[1]);
      continue;
    }
    closeList();
    para.push(line);
  }
  flushPara();
  closeList();
  return out.join('\n');
}

const STYLE = `
  @page { size: A4; margin: 15mm; }
  body { font-size: 14px; line-height: 22px; margin: 0; padding: 0; }
  /* 0.3em: the original sets its h1 rule 15px below the baseline, not the 7px
     a bare border-bottom gives. */
  h1 { padding-bottom: 0.3em; border-bottom: 1px solid #000; }
  h1, h2, h3, h4, h5, h6 { line-height: normal; }
  hr { border: 0; height: 2px; border-bottom: 2px solid #808080; }
  /* Margins/padding are the measured ones: the original's quote fill runs
     669px wide inside the 681px column, offset 5px from the left and 7px from
     the right, with no vertical padding. */
  blockquote {
    margin: 0 7px 0 5px;
    padding: 0 10px;
    background: rgba(127, 127, 127, 0.1);
    border-left: 5px solid rgba(0, 122, 204, 0.5);
  }
  ul { padding-left: 40px; }
  /* #0000ee is the browser default the original inherited; the original draws
     no underline rule under its one link, so links stay undecorated here. */
  a { color: #0000ee; text-decoration: none; }
  /* Keep a heading with the block it introduces rather than letting a page
     break strand it at the foot of a page. */
  h1, h2, h3 { break-after: avoid; }
  li, blockquote { break-inside: avoid; }
`;

const args = process.argv.slice(2);
const wantPng = args.includes('--png');
const filter = args.filter((a) => !a.startsWith('--'));
const targets = readdirSync(PUBLIC_DIR)
  .filter((f) => f.endsWith('.md'))
  .filter((f) => filter.length === 0 || filter.some((needle) => f.includes(needle)));

if (targets.length === 0) {
  console.error(`No matching .md files in public/${filter.length ? ` for ${filter.join(', ')}` : ''}`);
  process.exit(1);
}

if (wantPng) mkdirSync(SHOT_DIR, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
for (const file of targets) {
  const html = `<!doctype html><meta charset="utf-8"><style>${STYLE}</style>\n${toHtml(
    readFileSync(join(PUBLIC_DIR, file), 'utf-8'),
  )}`;
  await page.setContent(html, { waitUntil: 'load' });
  const pdf = file.replace(/\.md$/, '.pdf');
  // Margins are passed explicitly: Playwright defaults them to 0 and would
  // otherwise ignore the @page rule, printing edge-to-edge.
  // Explicit mm rather than format: 'A4' — Playwright's A4 preset is 8.27in ×
  // 11.7in (842.88pt tall), a shade taller than the 841.92pt page box the
  // original PDFs use.
  await page.pdf({
    path: join(PUBLIC_DIR, pdf),
    width: '210mm',
    height: '297mm',
    printBackground: true,
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
  });
  console.log(`${file} -> public/${pdf}`);

  if (wantPng) {
    // 681px is the text column measured off the originals; the 15mm side
    // margins are added back so the image frames the page the way the PDF does.
    await page.setViewportSize({ width: 681 + 2 * 57, height: 1000 });
    await page.addStyleTag({ content: 'body { padding: 0 57px; background: #fff; }' });
    const png = join(SHOT_DIR, file.replace(/\.md$/, '.png'));
    await page.screenshot({ path: png, fullPage: true });
    console.log(`  ${png}`);
  }
}
await browser.close();
