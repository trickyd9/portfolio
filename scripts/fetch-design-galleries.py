"""Download + watermark the poster / logo / printed-matter galleries.

These galleries are JavaScript-rendered, so the URL list comes from
design-images.json (produced by a headless browser pass) rather than from
parsing the page HTML.
"""
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from artwork_watermark import fetch, watermark  # noqa: E402

SCRATCH = Path(__file__).parent
OUT_ROOT = Path("/Users/trickyd/Documents/AI/KnowledgeBase/Projects/portfolio-website/site/public/art")
SKIP = ("wpcom-gray-white", "g.gif", "sd-logo", "gravatar")

# Titles are derived from filenames — David should correct any that are wrong.
OVERRIDES = {
    "consumption": "Consumption",
    "cochin": "Cochin",
    "stonesans": "Stone Sans",
    "bstower": "B&S Tower",
    "scposter": "SC Poster",
    "lqnplanning": "LQN Planning",
    "atoz": "A to Z",
    "ecoveidman": "Eco Verdance",
    "bahainews": "Baha'i News",
    "paperworks": "Paperworks",
    "hlpamphlet": "Heart Blossom Pamphlet",
    "oemenu": "OE Menu",
    "ocmenu": "OC Menu",
    "fcmenus": "FC Menus",
    "fchandout": "FC Handout",
    "logo": "The Elegant Eclair",
    "syncdblk": "Sync'd",
    "sdlogo": "SD Logo",
    "relogo": "RE Logo",
    "fusionlogooptions": "Fusion — Logo Options",
    "gmglogo": "GeoManGear",
    "cslogooptions": "CS — Logo Options",
    "cologo": "CO Logo",
    "itazlogo": "ITAZ Logo",
    "hllogo": "Heart Blossom Logo",
    "breakout": "Breakout",
}


def title_for(stem: str) -> str:
    if stem in OVERRIDES:
        return OVERRIDES[stem]
    return re.sub(r"[-_]+", " ", stem).title()


def run(group_slug: str, source_keys: list[str]):
    data = json.loads((SCRATCH / "design-images.json").read_text())
    out_dir = OUT_ROOT / group_slug
    out_dir.mkdir(parents=True, exist_ok=True)
    entries, seen = [], set()
    for key in source_keys:
        for item in data.get(key, []):
            url = item["src"]
            stem = url.rsplit("/", 1)[-1].rsplit(".", 1)[0]
            if any(s in url for s in SKIP) or stem in seen:
                continue
            seen.add(stem)
            try:
                img = fetch(url)
            except Exception as e:
                print(f"  FAILED {stem}: {e}")
                continue
            if min(img.size) < 200:
                print(f"  skip (tiny {img.size}) {stem}")
                continue
            result = watermark(img, "© David Trick", "corner")
            name = f"{stem}.jpg"
            result.save(out_dir / name, "JPEG", quality=82, optimize=True)
            kb = (out_dir / name).stat().st_size // 1024
            print(f"  {name:28} {result.size[0]}x{result.size[1]}  {kb}KB  — {title_for(stem)}")
            entries.append({"src": f"art/{group_slug}/{name}", "title": title_for(stem)})
    print(f"\n{group_slug}: {len(entries)} pieces")
    print(json.dumps(entries, indent=2))


if __name__ == "__main__":
    run(sys.argv[1], sys.argv[2:])
