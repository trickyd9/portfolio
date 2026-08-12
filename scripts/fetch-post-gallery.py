"""Download + watermark a WordPress post's attachments, using the post API's
own titles/captions. Ordering follows the order given on the command line's
post body where it matters, else the API's order reversed (oldest first)."""
import json
import re
import sys
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from artwork_watermark import fetch, watermark  # noqa: E402

OUT_ROOT = Path("/Users/trickyd/Documents/AI/KnowledgeBase/Projects/portfolio-website/site/public/art")
API = "https://public-api.wordpress.com/rest/v1.1/sites/trickyddesign.wordpress.com/posts/slug:"


def strip(x):
    return re.sub("<[^>]*>", "", (x or "")).replace("&nbsp;", " ").replace("&#8217;", "'").strip()


def run(slug: str, out_slug: str):
    req = urllib.request.Request(API + slug, headers={"User-Agent": "Mozilla/5.0"})
    post = json.loads(urllib.request.urlopen(req, timeout=60).read())
    atts = list((post.get("attachments") or {}).values())
    # API returns newest-first; the post body describes them oldest-first.
    atts.reverse()
    out_dir = OUT_ROOT / out_slug
    out_dir.mkdir(parents=True, exist_ok=True)
    entries = []
    for a in atts:
        url = a.get("URL", "")
        if not re.search(r"\.(jpg|jpeg|png|gif)$", url, re.I):
            print(f"  skip (not an image) {url.split('/')[-1]}")
            continue
        stem = url.rsplit("/", 1)[-1].rsplit(".", 1)[0]
        try:
            img = fetch(url)
        except Exception as e:
            print(f"  FAILED {stem}: {e}")
            continue
        result = watermark(img, "© David Trick", "corner")
        name = f"{stem}.jpg"
        result.save(out_dir / name, "JPEG", quality=82, optimize=True)
        cap = strip(a.get("caption"))
        kb = (out_dir / name).stat().st_size // 1024
        print(f"  {name:34} {result.size[0]}x{result.size[1]} {kb:>4}KB  {cap[:60]!r}")
        entry = {"src": f"art/{out_slug}/{name}", "title": a.get("title") or stem}
        if cap:
            entry["caption"] = cap if cap.endswith(".") else cap + "."
        entries.append(entry)
    print(f"\n{out_slug}: {len(entries)} images")
    print(json.dumps(entries, indent=2))


if __name__ == "__main__":
    run(sys.argv[1], sys.argv[2])
