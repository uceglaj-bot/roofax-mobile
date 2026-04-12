#!/bin/bash
# Fixed screenshots — screens 2, 3, 4
cd /home/node/.openclaw/workspace/roofax/roofax-mobile/assets/
mkdir -p screenshots

W=1290
H=2796
NAVY="#0f172a"
ORANGE="#f97316"
WHITE="#ffffff"
GRAY="#94a3b8"
CARD="#1e293b"
INTER_BOLD="/tmp/inter_fonts/extras/ttf/Inter-Bold.ttf"
INTER_REG="/tmp/inter_fonts/extras/ttf/Inter-Regular.ttf"

# ─────────────────────────────────────────────
# SCREEN 2: Work Records (fixed)
# ─────────────────────────────────────────────
convert -size ${W}x${H} xc:"$NAVY" \
  -fill "$ORANGE" -draw "rectangle 0,0 1290,12" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 88 \
  -gravity North -annotate +0+120 "Every project," \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 88 \
  -gravity North -annotate +0+230 "documented." \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 48 \
  -gravity North -annotate +0+360 "Full history. Photos. Warranties." \
  -fill "$CARD" -draw "roundrectangle 80,560 1210,2400 48,48" \
  -fill "$NAVY" -draw "rectangle 80,560 1210,760" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 44 \
  -gravity NorthWest -annotate +120+670 "Work Records" \
  -fill "$CARD" -draw "roundrectangle 120,790 1170,1080 20,20" \
  -fill "$ORANGE" -draw "roundrectangle 120,790 148,1080 8,8" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 40 \
  -gravity NorthWest -annotate +175+820 "Roof Replacement" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 32 \
  -gravity NorthWest -annotate +175+876 "Upnotched Roofing" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +175+926 "Mar 15, 2026  -  $18,400" \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 28 \
  -gravity NorthWest -annotate +175+976 "25-yr Warranty  -  14 Photos" \
  -fill "$CARD" -draw "roundrectangle 120,1110 1170,1380 20,20" \
  -fill "#0ea5e9" -draw "roundrectangle 120,1110 148,1380 8,8" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 40 \
  -gravity NorthWest -annotate +175+1140 "HVAC Service & Tune-Up" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 32 \
  -gravity NorthWest -annotate +175+1198 "Cool Air Co." \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +175+1248 "Jan 8, 2026  -  $340" \
  -fill "#0ea5e9" -font "$INTER_BOLD" -pointsize 28 \
  -gravity NorthWest -annotate +175+1298 "1-yr Parts  -  2 Photos" \
  -fill "$CARD" -draw "roundrectangle 120,1410 1170,1680 20,20" \
  -fill "#22c55e" -draw "roundrectangle 120,1410 148,1680 8,8" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 40 \
  -gravity NorthWest -annotate +175+1440 "Cedar Fence Installation" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 32 \
  -gravity NorthWest -annotate +175+1498 "DFW Fence Pros" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +175+1548 "Nov 3, 2025  -  $5,200" \
  -fill "#22c55e" -font "$INTER_BOLD" -pointsize 28 \
  -gravity NorthWest -annotate +175+1598 "5-yr Workmanship  -  8 Photos" \
  -fill "$CARD" -draw "roundrectangle 120,1710 1170,1980 20,20" \
  -fill "#a855f7" -draw "roundrectangle 120,1710 148,1980 8,8" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 40 \
  -gravity NorthWest -annotate +175+1740 "Interior Paint - Full Home" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 32 \
  -gravity NorthWest -annotate +175+1798 "Precision Painters" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +175+1848 "Sep 20, 2025  -  $4,800" \
  -fill "#a855f7" -font "$INTER_BOLD" -pointsize 28 \
  -gravity NorthWest -annotate +175+1898 "No warranty  -  6 Photos" \
  -fill "$ORANGE" -draw "roundrectangle 120,2440 1170,2580 40,40" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 52 \
  -gravity North -annotate +0+2460 "Start Your Home Record" \
  screenshots/screen2_records.png

echo "Screen 2 done"

# ─────────────────────────────────────────────
# SCREEN 3: Photos (fixed artifacts)
# ─────────────────────────────────────────────
convert -size ${W}x${H} xc:"$NAVY" \
  -fill "$ORANGE" -draw "rectangle 0,0 1290,12" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 82 \
  -gravity North -annotate +0+120 "Real photos from" \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 82 \
  -gravity North -annotate +0+224 "your contractors." \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 46 \
  -gravity North -annotate +0+352 "Before, during & after. All saved." \
  -fill "$CARD" -draw "roundrectangle 80,540 1210,2400 48,48" \
  -fill "$NAVY" -draw "rectangle 80,540 1210,740" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 38 \
  -gravity NorthWest -annotate +120+630 "Roof Replacement  -  14 Photos" \
  -fill "#334155" -draw "roundrectangle 100,760 625,1180 12,12" \
  -fill "#334155" -draw "roundrectangle 665,760 1190,1180 12,12" \
  -fill "#334155" -draw "roundrectangle 100,1200 625,1620 12,12" \
  -fill "#334155" -draw "roundrectangle 665,1200 1190,1620 12,12" \
  -fill "$ORANGE" -draw "roundrectangle 110,1142 232,1182 12,12" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 28 \
  -gravity NorthWest -annotate +124+1150 "Before" \
  -fill "#22c55e" -draw "roundrectangle 675,1142 800,1182 12,12" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 28 \
  -gravity NorthWest -annotate +688+1150 "During" \
  -fill "#22c55e" -draw "roundrectangle 110,1582 232,1622 12,12" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 28 \
  -gravity NorthWest -annotate +124+1590 "During" \
  -fill "#0ea5e9" -draw "roundrectangle 675,1582 778,1622 12,12" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 28 \
  -gravity NorthWest -annotate +688+1590 "After" \
  -fill "$CARD" -draw "roundrectangle 100,1650 1190,1900 20,20" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 40 \
  -gravity NorthWest -annotate +140+1680 "Roof Replacement" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 34 \
  -gravity NorthWest -annotate +140+1740 "Upnotched Roofing  -  Mar 15, 2026" \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 34 \
  -gravity NorthWest -annotate +140+1800 "14 photos  -  25-yr warranty" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +140+1852 "Total: $18,400" \
  -fill "$ORANGE" -draw "roundrectangle 120,2440 1170,2580 40,40" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 52 \
  -gravity North -annotate +0+2460 "Download Free Today" \
  screenshots/screen3_photos.png

echo "Screen 3 done"

# ─────────────────────────────────────────────
# SCREEN 4: Value prop (fixed — no gravity conflicts)
# ─────────────────────────────────────────────
convert -size ${W}x${H} xc:"$NAVY" \
  -fill "$ORANGE" -draw "rectangle 0,0 1290,12" \
  -fill "$ORANGE" -draw "polygon 645,180 320,480 970,480" \
  -fill "$WHITE" -draw "roundrectangle 370,460 870,700 14,14" \
  -fill "$NAVY" -draw "roundrectangle 460,560 680,700 12,12" \
  -fill "$ORANGE" -draw "path 'M 820 470 L 890 498 L 890 560 Q 890 606 820 636 Q 750 606 750 560 L 750 498 Z'" \
  -fill "none" -stroke "$WHITE" -strokewidth 18 \
  -draw "polyline 772,555 810,592 870,526" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 100 \
  -gravity NorthWest -annotate +240+780 "Own your" \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 100 \
  -gravity NorthWest -annotate +130+900 "home's story." \
  -fill "$CARD" -draw "roundrectangle 120,1080 1170,1220 20,20" \
  -fill "$ORANGE" -draw "circle 180,1150 205,1150" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 38 \
  -gravity NorthWest -annotate +226,1094 "Permanent digital records" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +226,1152 "Never lose a receipt or warranty again" \
  -fill "$CARD" -draw "roundrectangle 120,1250 1170,1390 20,20" \
  -fill "$ORANGE" -draw "circle 180,1320 205,1320" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 38 \
  -gravity NorthWest -annotate +226,1264 "Contractor-verified photos" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +226,1322 "Before, during & after every job" \
  -fill "$CARD" -draw "roundrectangle 120,1420 1170,1560 20,20" \
  -fill "$ORANGE" -draw "circle 180,1490 205,1490" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 38 \
  -gravity NorthWest -annotate +226,1434 "Increase home resale value" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +226,1492 "Show buyers what has been done" \
  -fill "$CARD" -draw "roundrectangle 120,1590 1170,1730 20,20" \
  -fill "$ORANGE" -draw "circle 180,1660 205,1660" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 38 \
  -gravity NorthWest -annotate +226,1604 "100% free for homeowners" \
  -fill "$GRAY" -font "$INTER_REG" -pointsize 30 \
  -gravity NorthWest -annotate +226,1662 "Always. No hidden fees." \
  -fill "$ORANGE" -font "$INTER_BOLD" -pointsize 70 \
  -gravity NorthWest -annotate +200,1800 "* * * * *" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 44 \
  -gravity NorthWest -annotate +300,1900 "Free for Homeowners" \
  -fill "$ORANGE" -draw "roundrectangle 120,2440 1170,2580 40,40" \
  -fill "$WHITE" -font "$INTER_BOLD" -pointsize 52 \
  -gravity NorthWest -annotate +330,2476 "Get Started Free" \
  screenshots/screen4_value.png

echo "Screen 4 done"
echo "All done!"
