"""Fetch one category's artwork, watermark (corner), write web-res JPEGs into
site/public/art/<slug>/. Originals are never written to the repo."""
import json
import re
import sys
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from artwork_watermark import fetch, watermark  # noqa: E402

OUT_ROOT = Path("/Users/trickyd/Documents/AI/KnowledgeBase/Projects/portfolio-website/site/public/art")

# data-orig-file plus the neighbouring data-image-title on the same <img> tag.
IMG_TAG = re.compile(r"<img[^>]*>")
ORIG = re.compile(r'data-orig-file="([^"]+)"')
TITLE = re.compile(r'data-image-title="([^"]*)"')
SIZE = re.compile(r'data-orig-size="(\d+),(\d+)"')


def slugify(s: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s or "untitled"


def harvest(page_url: str, slug: str, min_width: int = 400):
    req = urllib.request.Request(page_url, headers={"User-Agent": "Mozilla/5.0"})
    html = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "ignore")
    out_dir = OUT_ROOT / slug
    out_dir.mkdir(parents=True, exist_ok=True)

    entries = []
    for tag in IMG_TAG.findall(html):
        m_orig = ORIG.search(tag)
        if not m_orig:
            continue
        url = m_orig.group(1)
        if "sd-logo" in url:  # the site's own header logo, not artwork
            continue
        m_size = SIZE.search(tag)
        if m_size and int(m_size.group(1)) < min_width:
            print(f"  skip (too small: {m_size.group(1)}px) {url.rsplit('/', 1)[-1]}")
            continue
        m_title = TITLE.search(tag)
        raw_title = (m_title.group(1) if m_title else "").strip()
        base = url.rsplit("/", 1)[-1].rsplit(".", 1)[0]
        title = raw_title or base.replace("-", " ").replace("_", " ").title()
        name = f"{slugify(base)}.jpg"
        try:
            img = fetch(url)
        except Exception as e:
            print(f"  FAILED {url}: {e}")
            continue
        result = watermark(img, "© David Trick", "corner")
        result.save(out_dir / name, "JPEG", quality=82, optimize=True)
        kb = (out_dir / name).stat().st_size // 1024
        print(f"  {name}  {result.size[0]}x{result.size[1]}  {kb}KB  — {title}")
        entries.append({"src": f"art/{slug}/{name}", "title": title})
    return entries


if __name__ == "__main__":
    page, slug = sys.argv[1], sys.argv[2]
    got = harvest(page, slug)
    print(json.dumps(got, indent=2))
