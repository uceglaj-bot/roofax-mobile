#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1290, 2796
NAVY   = (15, 23, 42)
ORANGE = (249, 115, 22)
WHITE  = (255, 255, 255)
GRAY   = (148, 163, 184)
CARD   = (30, 41, 59)
GREEN  = (34, 197, 94)
YELLOW = (234, 179, 8)

IB = "/tmp/inter_fonts/extras/ttf/Inter-Bold.ttf"
IR = "/tmp/inter_fonts/extras/ttf/Inter-Regular.ttf"

PHOTOS = "/home/node/.openclaw/workspace/roofax/roofax-mobile/assets/real_photos"

img = Image.new("RGB", (W, H), NAVY)
d   = ImageDraw.Draw(img)

def rr(x1, y1, x2, y2, r, fill):
    d.rounded_rectangle([x1, y1, x2, y2], radius=r, fill=fill)

def txt(x, y, t, fp, sz, color):
    d.text((x, y), t, font=ImageFont.truetype(fp, sz), fill=color)

def ctxt(cx, y, t, fp, sz, color):
    f = ImageFont.truetype(fp, sz)
    bbox = d.textbbox((0, 0), t, font=f)
    tw = bbox[2] - bbox[0]
    d.text((cx - tw // 2, y), t, font=f, fill=color)

def paste_photo(path, x1, y1, x2, y2):
    cw, ch = x2 - x1, y2 - y1
    photo = Image.open(path).convert("RGB")
    pw, ph = photo.size
    scale = max(cw / pw, ch / ph)
    nw, nh = int(pw * scale), int(ph * scale)
    photo = photo.resize((nw, nh), Image.LANCZOS)
    ox, oy = (nw - cw) // 2, (nh - ch) // 2
    photo = photo.crop((ox, oy, ox + cw, oy + ch))
    img.paste(photo, (x1, y1))
    # gradient overlay at bottom
    draw2 = ImageDraw.Draw(img)
    for row in range(y2 - 80, y2):
        alpha_f = (row - (y2 - 80)) / 80
        dark = tuple(int(c * (1 - alpha_f * 0.75)) for c in img.getpixel((x1 + cw//2, row))[:3])
        draw2.rectangle([x1, row, x2, row + 1], fill=(0, 0, 0, int(alpha_f * 160)))

# Orange top bar
d.rectangle([0, 0, W, 12], fill=ORANGE)

# Headlines
ctxt(W//2, 120, "Real photos from", IB, 82, WHITE)
ctxt(W//2, 224, "your contractors.", IB, 82, ORANGE)
ctxt(W//2, 352, "Before, during & after — all saved.", IR, 44, GRAY)

# Phone frame
rr(80, 530, 1210, 2400, 48, CARD)

# Nav bar
d.rectangle([80, 530, 1210, 730], fill=NAVY)
txt(120, 615, "Roof Replacement  —  14 Photos", IB, 36, WHITE)

# 3-photo vertical stack: full width, 1/3 height each
# Photo area: y=750 to y=1950, so 1200px / 3 = 400px each
PH = 390
PW = 1090
PX = 100

photos_data = [
    (f"{PHOTOS}/fantz_end_47.jpg", "Before", ORANGE),
    (f"{PHOTOS}/romo_2.jpg",       "During", YELLOW),
    (f"{PHOTOS}/braud_9.jpg",      "After",  GREEN),
]

py = 750
for path, label, lcolor in photos_data:
    try:
        paste_photo(path, PX, py, PX + PW, py + PH)
    except Exception as e:
        rr(PX, py, PX + PW, py + PH, 0, (45, 65, 89))
        print(f"Photo error: {e}")
    
    # Label badge (bottom left)
    lf = ImageFont.truetype(IB, 32)
    lb = d.textbbox((0, 0), label, font=lf)
    lw = lb[2] - lb[0]
    px2, py2 = PX + 16, py + PH - 52
    rr(px2, py2, px2 + lw + 24, py2 + 40, 10, lcolor)
    d.text((px2 + 12, py2 + 6), label, font=lf, fill=WHITE)
    
    py += PH + 12  # 12px gap between photos

# Info card
rr(100, py + 10, 1190, py + 230, 20, CARD)
txt(140, py + 28, "Roof Replacement", IB, 40, WHITE)
txt(140, py + 82, "Upnotched Roofing  —  Mar 2026", IR, 32, GRAY)
txt(140, py + 132, "14 photos  •  25-yr warranty", IB, 32, ORANGE)
txt(140, py + 182, "Total: $18,400", IR, 30, GRAY)

# CTA
rr(120, 2440, 1170, 2580, 40, ORANGE)
ctxt(W//2, 2476, "Download Free Today", IB, 52, WHITE)

out = "/home/node/.openclaw/workspace/roofax/roofax-mobile/assets/screenshots/screen3_photos.png"
img.save(out)
print(f"Saved: {out}")
