#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import math

W, H = 1290, 2796
NAVY   = (15, 23, 42)
ORANGE = (249, 115, 22)
WHITE  = (255, 255, 255)
GRAY   = (148, 163, 184)
CARD   = (30, 41, 59)

IB = "/tmp/inter_fonts/extras/ttf/Inter-Bold.ttf"
IR = "/tmp/inter_fonts/extras/ttf/Inter-Regular.ttf"

img = Image.new("RGB", (W, H), NAVY)
d   = ImageDraw.Draw(img)

def rounded_rect(draw, x1, y1, x2, y2, r, fill):
    draw.rounded_rectangle([x1, y1, x2, y2], radius=r, fill=fill)

def text(draw, x, y, txt, font_path, size, color):
    f = ImageFont.truetype(font_path, size)
    draw.text((x, y), txt, font=f, fill=color)

# Orange top bar
d.rectangle([0, 0, W, 12], fill=ORANGE)

# House icon (centered at x=645, top at y=100)
# Roof triangle
d.polygon([(645, 100), (330, 420), (960, 420)], fill=ORANGE)
# House body
rounded_rect(d, 370, 400, 870, 640, 14, WHITE)
# Door
rounded_rect(d, 462, 500, 678, 640, 12, NAVY)
# Shield
shield_pts = [(820,410),(888,438),(888,500),(820,575),(752,500),(752,438)]
d.polygon(shield_pts, fill=ORANGE)
# Checkmark in shield
d.line([(774,495),(812,532),(868,468)], fill=WHITE, width=16)

# Headline
text(d, 80, 700, "Own your", IB, 96, WHITE)
text(d, 80, 820, "home's story.", IB, 96, ORANGE)

# Subhead
text(d, 80, 960, "Every project. Every receipt.", IR, 44, GRAY)
text(d, 80, 1016, "All in one place.", IR, 44, GRAY)

# Feature cards
features = [
    ("Permanent digital records", "Never lose a receipt or warranty again"),
    ("Contractor-verified photos", "Before, during and after every job"),
    ("Boost your home resale value", "Show buyers every upgrade you made"),
    ("100% free for homeowners", "Always. No hidden fees. Ever."),
]

card_y = 1090
for (title, sub) in features:
    card_h = 140
    rounded_rect(d, 80, card_y, 1210, card_y + card_h, 20, CARD)
    # orange dot
    cx, cy = 140, card_y + 52
    d.ellipse([cx-20, cy-20, cx+20, cy+20], fill=ORANGE)
    # title
    text(d, 180, card_y + 16, title, IB, 38, WHITE)
    # subtitle
    text(d, 180, card_y + 70, sub, IR, 30, GRAY)
    card_y += 160

# Stars
text(d, 380, card_y + 20, "★ ★ ★ ★ ★", IB, 60, ORANGE)
text(d, 330, card_y + 100, "Free for Homeowners", IB, 44, WHITE)

# CTA button
rounded_rect(d, 120, 2440, 1170, 2580, 40, ORANGE)
f_btn = ImageFont.truetype(IB, 52)
btn_text = "Get Started Free"
bbox = d.textbbox((0, 0), btn_text, font=f_btn)
tw = bbox[2] - bbox[0]
bx = (W - tw) // 2
d.text((bx, 2476), btn_text, font=f_btn, fill=WHITE)

out = "/home/node/.openclaw/workspace/roofax/roofax-mobile/assets/screenshots/screen4_value.png"
img.save(out)
print(f"Saved {out}")
