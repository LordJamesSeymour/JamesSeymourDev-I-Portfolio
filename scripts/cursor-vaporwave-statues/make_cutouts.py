"""
Cutout generator for the Cursor.zip vaporwave statues.

Source images are CC0 public-domain photographs from The Met Open Access
collection (dark, near-uniform studio backgrounds). We key out only the
*connected* dark background (border flood-fill), which keeps each statue's own
internal shadows intact, then feather + auto-crop to a tight transparent PNG.

Sources (kept beside this script, NOT shipped): see ASSET_CREDITS.md in
public/assets/cursor-vaporwave/statues/. To swap a statue, drop a new source
JPG/PNG next to this file, add/edit a JOBS entry, and re-run:

    python scripts/cursor-vaporwave-statues/make_cutouts.py
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(__file__)
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUT = os.path.join(ROOT, "public", "assets", "cursor-vaporwave", "statues")

# source jpg, output png, flood threshold, fraction of HEIGHT to keep from the
# top (drops museum mounts / plinths so the busts read as floating collage).
JOBS = [
    ("lucius-verus-248783.jpg", "statue-right.png",    44, 0.86),  # large hero head (right)
    ("david-smk-kas2232.jpg",   "statue-left.png",     44, 1.00),  # Michelangelo's David head (left)
    ("woman-253055.jpg",        "statue-fragment.png", 46, 0.55),  # veiled head fragment
]
SENT = (255, 0, 255)  # sentinel colour painted into the background
MAX_W = 680  # cap output width — display size is ~280px, so this keeps retina headroom + small files


def cutout(src, dst, thresh, keep_top):
    im = Image.open(os.path.join(HERE, src)).convert("RGB")
    if keep_top < 1.0:  # drop the lower museum mount / plinth before keying
        im = im.crop((0, 0, im.size[0], int(im.size[1] * keep_top)))
    w, h = im.size
    work = im.copy()

    # Seed the flood fill all around the border so the whole studio backdrop
    # (which has a slight top->bottom gradient) is covered.
    seeds = []
    for x in range(0, w, 32):
        seeds += [(x, 2), (x, h - 3)]
    for y in range(0, h, 32):
        seeds += [(2, y), (w - 3, y)]
    for s in seeds:
        ImageDraw.floodfill(work, s, SENT, thresh=thresh)

    arr = np.asarray(work)
    is_bg = np.all(arr == np.array(SENT), axis=-1)
    alpha = np.where(is_bg, 0, 255).astype("uint8")
    am = Image.fromarray(alpha, "L")

    # Pull the edge in 1px to kill dark fringe, then soften for clean compositing.
    am = am.filter(ImageFilter.MinFilter(3))
    am = am.filter(ImageFilter.GaussianBlur(1.1))

    out = im.convert("RGBA")
    out.putalpha(am)

    a2 = np.asarray(am)  # auto-crop to the visible statue with a little padding
    ys, xs = np.where(a2 > 16)
    pad = 6
    x0, x1 = max(0, xs.min() - pad), min(w, xs.max() + pad)
    y0, y1 = max(0, ys.min() - pad), min(h, ys.max() + pad)
    out = out.crop((x0, y0, x1, y1))
    if out.width > MAX_W:  # keep file size + memory reasonable
        out = out.resize((MAX_W, round(out.height * MAX_W / out.width)), Image.LANCZOS)
    out.save(os.path.join(OUT, dst), optimize=True)
    print(f"{dst}: {out.size}  transparent={100*(a2==0).mean():.1f}%")


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for src, dst, thr, keep in JOBS:
        cutout(src, dst, thr, keep)
