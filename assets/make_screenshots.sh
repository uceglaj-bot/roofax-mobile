#!/bin/bash
# App Store Screenshots — iPhone 6.7" (1290x2796)
# 4 screens: Dashboard, Work Records, Photos, Contractors

cd /home/node/.openclaw/workspace/roofax/roofax-mobile/assets/
mkdir -p screenshots

W=1290
H=2796
NAVY="#0f172a"
ORANGE="#f97316"
WHITE="#ffffff"
GRAY="#94a3b8"
LIGHT="#f1f5f9"
CARD="#1e293b"
INTER_BOLD="/tmp/inter_fonts/extras/ttf/Inter-Bold.ttf"
INTER_REG="/tmp/inter_fonts/extras/ttf/Inter-Regular.ttf"

# ─────────────────────────────────────────────
# SCREEN 1: Dashboard — "Your home. On record."
# ─────────────────────────────────────────────
convert -size ${W}x${H} xc:"$NAVY" \
  \
  `# Orange accent bar at top` \
  -fill "$ORANGE" -draw "rectangle 0,0 ${W},12" \
  \
  `# Headline text` \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 88 \
  -gravity North -annotate +0+120 "Your home." \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 88 \
  -gravity North -annotate +0+230 "On record." \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 48 \
  -gravity North -annotate +0+360 "Every repair. Every upgrade." \
  -gravity North -annotate +0+420 "All in one place." \
  \
  `# Phone frame (rounded rect)` \
  -fill "$CARD" -draw "roundrectangle 80,560 1210,2400 48,48" \
  \
  `# Status bar area` \
  -fill "$NAVY" -draw "rectangle 80,560 1210,640" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 36 \
  -gravity NorthWest -annotate +120+580 "9:41" \
  \
  `# Nav bar` \
  -fill "$NAVY" -draw "rectangle 80,640 1210,760" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 44 \
  -gravity NorthWest -annotate +120+670 "My Home" \
  \
  `# Property card` \
  -fill "$NAVY" -draw "roundrectangle 120,790 1170,1020 24,24" \
  -fill "$ORANGE" -draw "roundrectangle 120,790 1170,1020 24,24" \
  -fill "$NAVY" -draw "roundrectangle 126,796 1164,1014 22,22" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 46 \
  -gravity NorthWest -annotate +160+820 "2847 Elmwood Drive" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 36 \
  -gravity NorthWest -annotate +160+890 "Dallas, TX 75206" \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 36 \
  -gravity NorthWest -annotate +160+950 "✓  12 Work Records" \
  \
  `# Stats row` \
  -fill "$CARD" -draw "roundrectangle 120,1050 620,1230 20,20" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 56 \
  -gravity NorthWest -annotate +200+1080 "12" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 34 \
  -gravity NorthWest -annotate +180+1160 "Projects" \
  \
  -fill "$CARD" -draw "roundrectangle 670,1050 1170,1230 20,20" \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 56 \
  -gravity NorthWest -annotate +750+1080 "100%" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 34 \
  -gravity NorthWest -annotate +760+1160 "Documented" \
  \
  `# Recent activity label` \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 40 \
  -gravity NorthWest -annotate +120+1270 "Recent Activity" \
  \
  `# Activity item 1` \
  -fill "$CARD" -draw "roundrectangle 120,1320 1170,1460 16,16" \
  -fill "$ORANGE" -draw "rectangle 120,1320 132,1460" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 38 \
  -gravity NorthWest -annotate +160+1345 "Roof Replacement" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 32 \
  -gravity NorthWest -annotate +160+1405 "Upnotched Roofing  •  Mar 2026" \
  \
  `# Activity item 2` \
  -fill "$CARD" -draw "roundrectangle 120,1490 1170,1630 16,16" \
  -fill "$ORANGE" -draw "rectangle 120,1490 132,1630" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 38 \
  -gravity NorthWest -annotate +160+1515 "HVAC Service" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 32 \
  -gravity NorthWest -annotate +160+1575 "Cool Air Co.  •  Jan 2026" \
  \
  `# Activity item 3` \
  -fill "$CARD" -draw "roundrectangle 120,1660 1170,1800 16,16" \
  -fill "$ORANGE" -draw "rectangle 120,1660 132,1800" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 38 \
  -gravity NorthWest -annotate +160+1685 "Fence Installation" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 32 \
  -gravity NorthWest -annotate +160+1745 "DFW Fence Pros  •  Nov 2025" \
  \
  `# Bottom nav` \
  -fill "$NAVY" -draw "rectangle 80,2300 1210,2400" \
  -fill "$ORANGE" -draw "rectangle 80,2300 80,2300" \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 32 \
  -gravity NorthWest -annotate +190+2320 "Home" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 32 \
  -gravity NorthWest -annotate +490+2320 "Records" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 32 \
  -gravity NorthWest -annotate +750+2320 "Photos" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 32 \
  -gravity NorthWest -annotate +1010+2320 "Contractors" \
  \
  `# Bottom CTA` \
  -fill "$ORANGE" -draw "roundrectangle 120,2440 1170,2580 40,40" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 52 \
  -gravity North -annotate +0+2460 "Get the Free App" \
  \
  screenshots/screen1_dashboard.png

echo "Screen 1 done"

# ─────────────────────────────────────────────
# SCREEN 2: Work Records — "Every project, documented."
# ─────────────────────────────────────────────
convert -size ${W}x${H} xc:"$NAVY" \
  -fill "$ORANGE" -draw "rectangle 0,0 ${W},12" \
  \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 88 \
  -gravity North -annotate +0+120 "Every project," \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 88 \
  -gravity North -annotate +0+230 "documented." \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 48 \
  -gravity North -annotate +0+360 "Full history. Photos. Warranties." \
  \
  -fill "$CARD" -draw "roundrectangle 80,560 1210,2400 48,48" \
  -fill "$NAVY" -draw "rectangle 80,560 1210,760" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 44 \
  -gravity NorthWest -annotate +120+670 "Work Records" \
  \
  `# Record 1 — Roofing` \
  -fill "$CARD" -draw "roundrectangle 120,790 1170,1080 20,20" \
  -fill "$ORANGE" -draw "roundrectangle 120,790 300,1080 20,20" \
  -fill "$CARD" -draw "rectangle 200,790 300,1080" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 42 \
  -gravity NorthWest -annotate +200+800" " \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 40 \
  -gravity NorthWest -annotate +330+820 "Roof Replacement" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 32 \
  -gravity NorthWest -annotate +330+878 "Upnotched Roofing" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +330+928 "Mar 15, 2026  •  $18,400" \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 28 \
  -gravity NorthWest -annotate +330+978 "25-yr Warranty  •  14 Photos" \
  \
  `# Record 2 — HVAC` \
  -fill "$CARD" -draw "roundrectangle 120,1110 1170,1380 20,20" \
  -fill "#0ea5e9" -draw "roundrectangle 120,1110 300,1380 20,20" \
  -fill "$CARD" -draw "rectangle 200,1110 300,1380" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 40 \
  -gravity NorthWest -annotate +330+1140 "HVAC Service & Tune-Up" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 32 \
  -gravity NorthWest -annotate +330+1198 "Cool Air Co." \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +330+1248 "Jan 8, 2026  •  $340" \
  -fill "#0ea5e9" -font "$INTER_BOLD" -pointsize 28 \
  -gravity NorthWest -annotate +330+1298 "1-yr Parts  •  2 Photos" \
  \
  `# Record 3 — Fence` \
  -fill "$CARD" -draw "roundrectangle 120,1410 1170,1680 20,20" \
  -fill "#22c55e" -draw "roundrectangle 120,1410 300,1680 20,20" \
  -fill "$CARD" -draw "rectangle 200,1410 300,1680" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 40 \
  -gravity NorthWest -annotate +330+1440 "Cedar Fence Installation" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 32 \
  -gravity NorthWest -annotate +330+1498 "DFW Fence Pros" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +330+1548 "Nov 3, 2025  •  $5,200" \
  -fill "#22c55e" -font "$INTER_BOLD" -pointsize 28 \
  -gravity NorthWest -annotate +330+1598 "5-yr Workmanship  •  8 Photos" \
  \
  `# Record 4 — Paint` \
  -fill "$CARD" -draw "roundrectangle 120,1710 1170,1980 20,20" \
  -fill "#a855f7" -draw "roundrectangle 120,1710 300,1980 20,20" \
  -fill "$CARD" -draw "rectangle 200,1710 300,1980" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 40 \
  -gravity NorthWest -annotate +330+1740 "Interior Paint - Full Home" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 32 \
  -gravity NorthWest -annotate +330+1798 "Precision Painters" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +330+1848 "Sep 20, 2025  •  $4,800" \
  -fill "#a855f7" -font "$INTER_BOLD" -pointsize 28 \
  -gravity NorthWest -annotate +330+1898 "No warranty  •  6 Photos" \
  \
  -fill "$ORANGE" -draw "roundrectangle 120,2440 1170,2580 40,40" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 52 \
  -gravity North -annotate +0+2460 "Start Your Home Record" \
  \
  screenshots/screen2_records.png

echo "Screen 2 done"

# ─────────────────────────────────────────────
# SCREEN 3: Photos — "See it all. Real photos from your contractors."
# ─────────────────────────────────────────────
convert -size ${W}x${H} xc:"$NAVY" \
  -fill "$ORANGE" -draw "rectangle 0,0 ${W},12" \
  \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 82 \
  -gravity North -annotate +0+120 "Real photos from" \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 82 \
  -gravity North -annotate +0+224 "your contractors." \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 46 \
  -gravity North -annotate +0+352 "Before, during & after — all saved." \
  \
  -fill "$CARD" -draw "roundrectangle 80,540 1210,2400 48,48" \
  -fill "$NAVY" -draw "rectangle 80,540 1210,740" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 42 \
  -gravity NorthWest -annotate +120+640 "Roof Replacement — Photos (14)" \
  \
  `# Photo grid — 2 cols` \
  -fill "#334155" -draw "roundrectangle 100,760 625,1180 12,12" \
  -fill "#FFFFFF" -font "$INTER_REG" -pointsize 28 \
  -gravity NorthWest -annotate +200+950 "Before" \
  \
  -fill "#334155" -draw "roundrectangle 665,760 1190,1180 12,12" \
  -fill "#FFFFFF" -font "$INTER_REG" -pointsize 28 \
  -gravity NorthWest -annotate +780+950 "During" \
  \
  -fill "#334155" -draw "roundrectangle 100,1200 625,1620 12,12" \
  -fill "#FFFFFF" -font "$INTER_REG" -pointsize 28 \
  -gravity NorthWest -annotate +200+1390 "During" \
  \
  -fill "#334155" -draw "roundrectangle 665,1200 1190,1620 12,12" \
  -fill "#FFFFFF" -font "$INTER_REG" -pointsize 28 \
  -gravity NorthWest -annotate +780,1390 "After" \
  \
  `# Photo labels with orange pill` \
  -fill "$ORANGE" -draw "roundrectangle 118,1140 240,1180 14,14" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 26 \
  -gravity NorthWest -annotate +130+1148 "Before" \
  \
  -fill "#22c55e" -draw "roundrectangle 678,1140 820,1180 14,14" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 26 \
  -gravity NorthWest -annotate +690+1148 "During" \
  \
  -fill "#22c55e" -draw "roundrectangle 118,1580 240,1620 14,14" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 26 \
  -gravity NorthWest -annotate +130+1588 "During" \
  \
  -fill "#0ea5e9" -draw "roundrectangle 678,1580 780,1620 14,14" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 26 \
  -gravity NorthWest -annotate +690+1588 "After" \
  \
  `# Info card below` \
  -fill "$CARD" -draw "roundrectangle 100,1650 1190,1900 20,20" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 40 \
  -gravity NorthWest -annotate +140+1680 "Roof Replacement" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 34 \
  -gravity NorthWest -annotate +140+1740 "Upnotched Roofing  •  Mar 15, 2026" \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 34 \
  -gravity NorthWest -annotate +140+1800 "14 photos  •  25-yr warranty" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +140+1852 "Total: $18,400" \
  \
  -fill "$ORANGE" -draw "roundrectangle 120,2440 1170,2580 40,40" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 52 \
  -gravity North -annotate +0+2460 "Download Free Today" \
  \
  screenshots/screen3_photos.png

echo "Screen 3 done"

# ─────────────────────────────────────────────
# SCREEN 4: Value prop — "Own your home's story."
# ─────────────────────────────────────────────
convert -size ${W}x${H} xc:"$NAVY" \
  -fill "$ORANGE" -draw "rectangle 0,0 ${W},12" \
  \
  `# Big centered icon` \
  -fill "$ORANGE" -draw "polygon 645,280 320,580 970,580" \
  -fill "$WHITE" -draw "roundrectangle 370,560 870,800 14,14" \
  -fill "$NAVY" -draw "roundrectangle 460,660 680,800 12,12" \
  -fill "$ORANGE" -draw "path 'M 820 570 L 890 598 L 890 660 Q 890 706 820 736 Q 750 706 750 660 L 750 598 Z'" \
  -fill "none" -stroke "$WHITE" -strokewidth 18 \
  -draw "polyline 772,652 810,692 870,624" \
  \
  `# Headline` \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 100 \
  -gravity North -annotate +0+880 "Own your" \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 100 \
  -gravity North -annotate +0+1000 "home's story." \
  \
  `# Feature bullets` \
  -fill "$CARD" -draw "roundrectangle 120,1180 1170,1320 20,20" \
  -fill "$ORANGE" -draw "circle 190,1250 220,1250" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 38 \
  -gravity NorthWest -annotate +240+1200 "Permanent digital records" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +240+1258 "Never lose a receipt or warranty again" \
  \
  -fill "$CARD" -draw "roundrectangle 120,1350 1170,1490 20,20" \
  -fill "$ORANGE" -draw "circle 190,1420 220,1420" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 38 \
  -gravity NorthWest -annotate +240+1370 "Contractor-verified photos" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +240+1428 "Before, during & after every job" \
  \
  -fill "$CARD" -draw "roundrectangle 120,1520 1170,1660 20,20" \
  -fill "$ORANGE" -draw "circle 190,1590 220,1590" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 38 \
  -gravity NorthWest -annotate +240+1540 "Increase home resale value" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +240+1598 "Show buyers exactly what's been done" \
  \
  -fill "$CARD" -draw "roundrectangle 120,1690 1170,1830 20,20" \
  -fill "$ORANGE" -draw "circle 190,1760 220,1760" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 38 \
  -gravity NorthWest -annotate +240+1710 "100% free for homeowners" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +240+1768 "Always. No hidden fees." \
  \
  `# Stars` \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 60 \
  -gravity North -annotate +0+1900 "★ ★ ★ ★ ★" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 38 \
  -gravity North -annotate +0+1980 "Free for Homeowners" \
  \
  -fill "$ORANGE" -draw "roundrectangle 120,2440 1170,2580 40,40" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 52 \
  -gravity North -annotate +0+2460 "Get Started Free" \
  \
  screenshots/screen4_value.png

echo "Screen 4 done"
echo "All screenshots complete!"
