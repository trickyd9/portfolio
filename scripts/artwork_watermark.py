"""Fetch an artwork image and produce a watermarked, web-res preview.

Web-res cap + EXIF strip + a visible watermark, per the artwork-protection
approach in WebsiteArchitecture.md. Originals are never written to the repo.
"""
import io
import sys
import urllib.request
from PIL import Image, ImageDraw, ImageFont

MAX_EDGE = 1400
JPEG_QUALITY = 82


def fetch(url: str) -> Image.Image:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return Image.open(io.BytesIO(r.read()))


def load_font(size: int):
    for path in (
        "/System/Library/Fonts/Supplemental/Futura.ttc",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ):
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def watermark(img: Image.Image, text: str, style: str) -> Image.Image:
    # Re-encode via RGB to drop EXIF/metadata entirely rather than trusting a
    # library flag to strip it.
    img = img.convert("RGB")
    img.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
    w, h = img.size
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)

    if style == "corner":
        # Small mark bottom-right, over a soft scrim so it stays legible on
        # both light and dark artwork without covering the piece.
        size = max(14, int(w * 0.026))
        font = load_font(size)
        pad = int(size * 0.7)
        box = draw.textbbox((0, 0), text, font=font)
        tw, th = box[2] - box[0], box[3] - box[1]
        x, y = w - tw - pad * 2, h - th - pad * 2
        draw.rounded_rectangle(
            [x - pad * 0.6, y - pad * 0.6, x + tw + pad * 0.6, y + th + pad * 0.9],
            radius=int(size * 0.35),
            fill=(0, 0, 0, 105),
        )
        draw.text((x, y), text, font=font, fill=(255, 255, 255, 225))
    else:  # "diagonal" — repeated tiled mark across the whole piece
        size = max(18, int(w * 0.038))
        font = load_font(size)
        tile = Image.new("RGBA", (w * 2, h * 2), (0, 0, 0, 0))
        td = ImageDraw.Draw(tile)
        step_x, step_y = int(w * 0.42), int(h * 0.22)
        for row in range(0, h * 2, step_y):
            for col in range(0, w * 2, step_x):
                td.text((col, row), text, font=font, fill=(255, 255, 255, 60))
        tile = tile.rotate(30, resample=Image.BICUBIC, expand=False)
        layer.alpha_composite(tile.crop((w // 2, h // 2, w // 2 + w, h // 2 + h)))

    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")


if __name__ == "__main__":
    url, out, style = sys.argv[1], sys.argv[2], sys.argv[3]
    src = fetch(url)
    print(f"  source {src.size[0]}x{src.size[1]}")
    result = watermark(src, "© David Trick", style)
    result.save(out, "JPEG", quality=JPEG_QUALITY, optimize=True)
    print(f"  wrote {out} {result.size[0]}x{result.size[1]}")
