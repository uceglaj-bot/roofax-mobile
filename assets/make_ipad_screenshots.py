#!/usr/bin/env python3
"""iPad 13-inch screenshots: 2048x2732"""
from PIL import Image, ImageDraw, ImageFont
import os, shutil

W, H = 2048, 2732
NAVY   = (15, 23, 42)
ORANGE = (249, 115, 22)
WHITE  = (255, 255, 255)
GRAY   = (148, 163, 184)
CARD   = (30, 41, 59)
GREEN  = (34, 197, 94)

IB = "/tmp/inter_fonts/extras/ttf/Inter-Bold.ttf"
IR = "/tmp/inter_fonts/extras/ttf/Inter-Regular.ttf"
OUTDIR = "/home/node/.openclaw/workspace/roofax/roofax-mobile/assets/screenshots/ipad"
os.makedirs(OUTDIR, exist_ok=True)

def make_screen(filename, headline1, headline2, subtitle, cards):
    img = Image.new("RGB", (W, H), NAVY)
    d = ImageDraw.Draw(img)

    def rr(x1,y1,x2,y2,r,fill): d.rounded_rectangle([x1,y1,x2,y2],radius=r,fill=fill)
    def t(x,y,txt,fp,sz,col): d.text((x,y),txt,font=ImageFont.truetype(fp,sz),fill=col)
    def ct(cx,y,txt,fp,sz,col):
        f=ImageFont.truetype(fp,sz)
        bb=d.textbbox((0,0),txt,font=f)
        d.text((cx-(bb[2]-bb[0])//2,y),txt,font=f,fill=col)

    # top bar
    d.rectangle([0,0,W,16],fill=ORANGE)
    # headlines
    ct(W//2, 100, headline1, IB, 120, WHITE)
    ct(W//2, 250, headline2, IB, 120, ORANGE)
    ct(W//2, 420, subtitle,  IR, 64,  GRAY)

    # phone frame
    rr(120, 560, W-120, H-200, 60, CARD)
    # nav bar
    d.rectangle([120,560,W-120,780], fill=NAVY)
    t(200, 660, "My Home", IB, 60, WHITE)

    # cards
    cy = 820
    for (title, sub, date, amt, color) in cards:
        rr(160, cy, W-160, cy+180, 24, CARD)
        d.rectangle([160,cy,180,cy+180], fill=color)
        t(220, cy+20,  title, IB, 48, WHITE)
        t(220, cy+86,  sub,   IR, 38, GRAY)
        t(220, cy+134, f"{date}  |  {amt}", IR, 36, GRAY)
        cy += 210

    # CTA
    rr(200, H-160, W-200, H-40, 50, ORANGE)
    ct(W//2, H-140, "Download Free Today", IB, 68, WHITE)

    img.save(f"{OUTDIR}/{filename}")
    print(f"Saved {filename}")

# Screen 1 — Dashboard
make_screen("ipad_screen1.png",
    "Your home.", "On record.",
    "Every repair. Every upgrade. All in one place.",
    [
        ("Roof Replacement",     "Upnotched Roofing",   "Mar 2026", "$18,400", ORANGE),
        ("HVAC Service",         "Cool Air Co.",        "Jan 2026", "$340",    (14,165,233)),
        ("Cedar Fence",          "DFW Fence Pros",      "Nov 2025", "$5,200",  GREEN),
        ("Interior Paint",       "Precision Painters",  "Sep 2025", "$4,800",  (168,85,247)),
    ]
)

# Screen 2 — Records
make_screen("ipad_screen2.png",
    "Every project,", "documented.",
    "Full history. Photos. Warranties.",
    [
        ("Roof Replacement",     "25-yr warranty  |  14 photos", "Mar 2026", "$18,400", ORANGE),
        ("HVAC Service",         "1-yr parts  |  2 photos",      "Jan 2026", "$340",    (14,165,233)),
        ("Cedar Fence",          "5-yr workmanship  |  8 photos","Nov 2025", "$5,200",  GREEN),
        ("Interior Paint",       "6 photos",                     "Sep 2025", "$4,800",  (168,85,247)),
    ]
)

# Screen 3 — Value prop
make_screen("ipad_screen3.png",
    "Own your", "home's story.",
    "Permanent records. Real photos. Free forever.",
    [
        ("Permanent digital records",    "Never lose a receipt or warranty again",   "", "", ORANGE),
        ("Contractor-verified photos",   "Before, during and after every job",       "", "", (14,165,233)),
        ("Boost your resale value",      "Show buyers every upgrade you made",       "", "", GREEN),
        ("100% free for homeowners",     "Always. No hidden fees. Ever.",            "", "", (168,85,247)),
    ]
)

print("All iPad screenshots done!")
