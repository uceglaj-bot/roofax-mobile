#!/bin/bash
cd /home/node/.openclaw/workspace/roofax/roofax-mobile/assets/
IB="/tmp/inter_fonts/extras/ttf/Inter-Bold.ttf"
IR="/tmp/inter_fonts/extras/ttf/Inter-Regular.ttf"

# Build screen 4 using a Python script to place text precisely
python3 - <<'PYEOF'
import subprocess, os

W, H = 1290, 2796
NAVY   = "#0f172a"
ORANGE = "#f97316"
WHITE  = "#ffffff"
GRAY   = "#94a3b8"
CARD   = "#1e293b"
IB     = "/tmp/inter_fonts/extras/ttf/Inter-Bold.ttf"
IR     = "/tmp/inter_fonts/extras/ttf/Inter-Regular.ttf"

# Build step by step: start with base, composite text as separate layers
steps = [
    # base navy
    f"convert -size {W}x{H} xc:'{NAVY}'",
    # orange top bar
    f"-fill '{ORANGE}' -draw 'rectangle 0,0 1290,12'",
    # house icon
    f"-fill '{ORANGE}' -draw 'polygon 645,120 330,440 960,440'",
    f"-fill '{WHITE}' -draw 'roundrectangle 370,420 870,660 14,14'",
    f"-fill '{NAVY}' -draw 'roundrectangle 462,520 678,660 12,12'",
    f"-fill '{ORANGE}' -draw \"path 'M 820 430 L 888 458 L 888 520 Q 888 565 820 595 Q 752 565 752 520 L 752 458 Z'\"",
    f"-fill none -stroke '{WHITE}' -strokewidth 16 -draw 'polyline 774,515 812,552 868,488'",
    # cards
    f"-fill '{CARD}' -draw 'roundrectangle 80,1010 1210,1160 20,20'",
    f"-fill '{ORANGE}' -draw 'circle 144,1085 166,1085'",
    f"-fill '{CARD}' -draw 'roundrectangle 80,1190 1210,1340 20,20'",
    f"-fill '{ORANGE}' -draw 'circle 144,1265 166,1265'",
    f"-fill '{CARD}' -draw 'roundrectangle 80,1370 1210,1520 20,20'",
    f"-fill '{ORANGE}' -draw 'circle 144,1445 166,1445'",
    f"-fill '{CARD}' -draw 'roundrectangle 80,1550 1210,1700 20,20'",
    f"-fill '{ORANGE}' -draw 'circle 144,1625 166,1625'",
    # CTA button
    f"-fill '{ORANGE}' -draw 'roundrectangle 120,2440 1170,2580 40,40'",
]

draw_cmd = "convert -size {W}x{H} xc:'{NAVY}' ".format(W=W, H=H, NAVY=NAVY)
draw_cmd += " ".join(steps[1:])
draw_cmd += f" /tmp/screen4_base.png"

subprocess.run(draw_cmd, shell=True, check=True)

# Now add text via separate annotate calls using a temp file approach
texts = [
    # (x, y, font, size, color, text)
    (80,  720, IB, 96, WHITE,  "Own your"),
    (80,  840, IB, 96, ORANGE, "home's story."),
    (192, 1026, IB, 38, WHITE, "Permanent digital records"),
    (192, 1082, IR, 30, GRAY,  "Never lose a receipt or warranty again"),
    (192, 1206, IB, 38, WHITE, "Contractor-verified photos"),
    (192, 1262, IR, 30, GRAY,  "Before, during and after every job"),
    (192, 1386, IB, 38, WHITE, "Boost your home resale value"),
    (192, 1442, IR, 30, GRAY,  "Show buyers every upgrade you made"),
    (192, 1566, IB, 38, WHITE, "100% free for homeowners"),
    (192, 1622, IR, 30, GRAY,  "Always. No hidden fees. Ever."),
    (250, 1760, IB, 68, ORANGE,"* * * * *"),
    (310, 1860, IB, 44, WHITE, "Free for Homeowners"),
    (330, 2476, IB, 52, WHITE, "Get Started Free"),
]

src = "/tmp/screen4_base.png"
for i, (x, y, font, size, color, text) in enumerate(texts):
    dst = f"/tmp/screen4_t{i}.png"
    cmd = [
        "convert", src,
        "-font", font,
        "-pointsize", str(size),
        "-fill", color,
        "-annotate", f"+{x}+{y}", text,
        dst
    ]
    subprocess.run(cmd, check=True)
    src = dst

import shutil
shutil.copy(src, "screenshots/screen4_value.png")
print("Screen 4 done")
PYEOF
