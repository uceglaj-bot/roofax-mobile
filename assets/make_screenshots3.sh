#!/bin/bash
cd /home/node/.openclaw/workspace/roofax/roofax-mobile/assets/
mkdir -p screenshots

W=1290
H=2796
NAVY="#0f172a"
ORANGE="#f97316"
WHITE="#ffffff"
GRAY="#94a3b8"
CARD="#1e293b"
IB="/tmp/inter_fonts/extras/ttf/Inter-Bold.ttf"
IR="/tmp/inter_fonts/extras/ttf/Inter-Regular.ttf"

# Dollar amounts — use \$ to prevent bash expansion
D1='\$18,400'
D2='\$340'
D3='\$5,200'
D4='\$4,800'
D5='\$18,400'

# ─────────────────────────────────────────────
# SCREEN 2: Work Records
# ─────────────────────────────────────────────
convert -size ${W}x${H} xc:"$NAVY" \
  -fill "$ORANGE" -draw "rectangle 0,0 1290,12" \
  -fill "$WHITE" -font "$IB" -pointsize 88 -gravity North -annotate +0+120 "Every project," \
  -fill "$ORANGE" -font "$IB" -pointsize 88 -gravity North -annotate +0+230 "documented." \
  -fill "$GRAY"  -font "$IR" -pointsize 48 -gravity North -annotate +0+360 "Full history. Photos. Warranties." \
  -fill "$CARD"  -draw "roundrectangle 80,560 1210,2400 48,48" \
  -fill "$NAVY"  -draw "rectangle 80,560 1210,760" \
  -fill "$WHITE" -font "$IB" -pointsize 44 -gravity NorthWest -annotate +120+670 "Work Records" \
  -fill "$CARD"  -draw "roundrectangle 120,790 1170,1080 20,20" \
  -fill "$ORANGE" -draw "roundrectangle 120,790 148,1080 8,8" \
  -fill "$WHITE" -font "$IB" -pointsize 40 -gravity NorthWest -annotate +175+820 "Roof Replacement" \
  -fill "$GRAY"  -font "$IR" -pointsize 32 -gravity NorthWest -annotate +175+876 "Upnotched Roofing" \
  -fill "$GRAY"  -font "$IR" -pointsize 30 -gravity NorthWest -annotate +175+926 "Mar 15, 2026  |  $D1" \
  -fill "$ORANGE" -font "$IB" -pointsize 28 -gravity NorthWest -annotate +175+976 "25-yr Warranty  |  14 Photos" \
  -fill "$CARD"  -draw "roundrectangle 120,1110 1170,1380 20,20" \
  -fill "#0ea5e9" -draw "roundrectangle 120,1110 148,1380 8,8" \
  -fill "$WHITE" -font "$IB" -pointsize 40 -gravity NorthWest -annotate +175+1140 "HVAC Service and Tune-Up" \
  -fill "$GRAY"  -font "$IR" -pointsize 32 -gravity NorthWest -annotate +175+1198 "Cool Air Co." \
  -fill "$GRAY"  -font "$IR" -pointsize 30 -gravity NorthWest -annotate +175+1248 "Jan 8, 2026  |  $D2" \
  -fill "#0ea5e9" -font "$IB" -pointsize 28 -gravity NorthWest -annotate +175+1298 "1-yr Parts  |  2 Photos" \
  -fill "$CARD"  -draw "roundrectangle 120,1410 1170,1680 20,20" \
  -fill "#22c55e" -draw "roundrectangle 120,1410 148,1680 8,8" \
  -fill "$WHITE" -font "$IB" -pointsize 40 -gravity NorthWest -annotate +175+1440 "Cedar Fence Installation" \
  -fill "$GRAY"  -font "$IR" -pointsize 32 -gravity NorthWest -annotate +175+1498 "DFW Fence Pros" \
  -fill "$GRAY"  -font "$IR" -pointsize 30 -gravity NorthWest -annotate +175+1548 "Nov 3, 2025  |  $D3" \
  -fill "#22c55e" -font "$IB" -pointsize 28 -gravity NorthWest -annotate +175+1598 "5-yr Workmanship  |  8 Photos" \
  -fill "$CARD"  -draw "roundrectangle 120,1710 1170,1980 20,20" \
  -fill "#a855f7" -draw "roundrectangle 120,1710 148,1980 8,8" \
  -fill "$WHITE" -font "$IB" -pointsize 40 -gravity NorthWest -annotate +175+1740 "Interior Paint - Full Home" \
  -fill "$GRAY"  -font "$IR" -pointsize 32 -gravity NorthWest -annotate +175+1798 "Precision Painters" \
  -fill "$GRAY"  -font "$IR" -pointsize 30 -gravity NorthWest -annotate +175+1848 "Sep 20, 2025  |  $D4" \
  -fill "#a855f7" -font "$IB" -pointsize 28 -gravity NorthWest -annotate +175+1898 "No warranty  |  6 Photos" \
  -fill "$ORANGE" -draw "roundrectangle 120,2440 1170,2580 40,40" \
  -fill "$WHITE" -font "$IB" -pointsize 52 -gravity North -annotate +0+2460 "Start Your Home Record" \
  screenshots/screen2_records.png
echo "Screen 2 done"

# ─────────────────────────────────────────────
# SCREEN 3: Photos
# ─────────────────────────────────────────────
convert -size ${W}x${H} xc:"$NAVY" \
  -fill "$ORANGE" -draw "rectangle 0,0 1290,12" \
  -fill "$WHITE" -font "$IB" -pointsize 82 -gravity North -annotate +0+120 "Real photos from" \
  -fill "$ORANGE" -font "$IB" -pointsize 82 -gravity North -annotate +0+224 "your contractors." \
  -fill "$GRAY"  -font "$IR" -pointsize 46 -gravity North -annotate +0+352 "Before, during, and after. All saved." \
  -fill "$CARD"  -draw "roundrectangle 80,540 1210,2400 48,48" \
  -fill "$NAVY"  -draw "rectangle 80,540 1210,730" \
  -fill "$WHITE" -font "$IB" -pointsize 36 -gravity NorthWest -annotate +120+620 "Roof Replacement  -  14 Photos" \
  -fill "#2d4a6b" -draw "roundrectangle 100,750 625,1160 12,12" \
  -fill "#2d4a6b" -draw "roundrectangle 665,750 1190,1160 12,12" \
  -fill "#2d4a6b" -draw "roundrectangle 100,1180 625,1590 12,12" \
  -fill "#2d4a6b" -draw "roundrectangle 665,1180 1190,1590 12,12" \
  -fill "$GRAY"  -font "$IR" -pointsize 36 -gravity NorthWest -annotate +220+930 "Photo 1" \
  -fill "$GRAY"  -font "$IR" -pointsize 36 -gravity NorthWest -annotate +785+930 "Photo 2" \
  -fill "$GRAY"  -font "$IR" -pointsize 36 -gravity NorthWest -annotate +220+1350 "Photo 3" \
  -fill "$GRAY"  -font "$IR" -pointsize 36 -gravity NorthWest -annotate +785+1350 "Photo 4" \
  -fill "$ORANGE" -draw "roundrectangle 110,1122 232,1162 10,10" \
  -fill "$WHITE" -font "$IB" -pointsize 26 -gravity NorthWest -annotate +124+1130 "Before" \
  -fill "#22c55e" -draw "roundrectangle 675,1122 800,1162 10,10" \
  -fill "$WHITE" -font "$IB" -pointsize 26 -gravity NorthWest -annotate +688+1130 "During" \
  -fill "#22c55e" -draw "roundrectangle 110,1552 232,1592 10,10" \
  -fill "$WHITE" -font "$IB" -pointsize 26 -gravity NorthWest -annotate +124+1560 "During" \
  -fill "#0ea5e9" -draw "roundrectangle 675,1552 778,1592 10,10" \
  -fill "$WHITE" -font "$IB" -pointsize 26 -gravity NorthWest -annotate +688+1560 "After" \
  -fill "$CARD"  -draw "roundrectangle 100,1620 1190,1870 20,20" \
  -fill "$WHITE" -font "$IB" -pointsize 40 -gravity NorthWest -annotate +140+1650 "Roof Replacement" \
  -fill "$GRAY"  -font "$IR" -pointsize 32 -gravity NorthWest -annotate +140+1708 "Upnotched Roofing  -  Mar 15, 2026" \
  -fill "$ORANGE" -font "$IB" -pointsize 32 -gravity NorthWest -annotate +140+1762 "14 photos  -  25-yr warranty" \
  -fill "$GRAY"  -font "$IR" -pointsize 30 -gravity NorthWest -annotate +140+1812 "Total: $D5" \
  -fill "$ORANGE" -draw "roundrectangle 120,2440 1170,2580 40,40" \
  -fill "$WHITE" -font "$IB" -pointsize 52 -gravity North -annotate +0+2460 "Download Free Today" \
  screenshots/screen3_photos.png
echo "Screen 3 done"

# ─────────────────────────────────────────────
# SCREEN 4: Value prop — full NorthWest gravity only
# ─────────────────────────────────────────────
convert -size ${W}x${H} xc:"$NAVY" \
  -fill "$ORANGE" -draw "rectangle 0,0 1290,12" \
  -fill "$ORANGE" -draw "polygon 645,120 330,440 960,440" \
  -fill "$WHITE"  -draw "roundrectangle 370,420 870,660 14,14" \
  -fill "$NAVY"   -draw "roundrectangle 462,520 678,660 12,12" \
  -fill "$ORANGE" -draw "path 'M 820 430 L 888 458 L 888 520 Q 888 565 820 595 Q 752 565 752 520 L 752 458 Z'" \
  -fill "none" -stroke "$WHITE" -strokewidth 16 -draw "polyline 774,515 812,552 868,488" \
  -fill "$WHITE"  -font "$IB" -pointsize 96 -gravity NorthWest -annotate +80+720 "Own your" \
  -fill "$ORANGE" -font "$IB" -pointsize 96 -gravity NorthWest -annotate +80+840 "home's story." \
  -fill "$CARD" -draw "roundrectangle 80,1010 1210,1160 20,20" \
  -fill "$ORANGE" -draw "circle 144,1085 166,1085" \
  -fill "$WHITE"  -font "$IB" -pointsize 38 -gravity NorthWest -annotate +192+1026 "Permanent digital records" \
  -fill "$GRAY"   -font "$IR" -pointsize 30 -gravity NorthWest -annotate +192+1082 "Never lose a receipt or warranty again" \
  -fill "$CARD" -draw "roundrectangle 80,1190 1210,1340 20,20" \
  -fill "$ORANGE" -draw "circle 144,1265 166,1265" \
  -fill "$WHITE"  -font "$IB" -pointsize 38 -gravity NorthWest -annotate +192+1206 "Contractor-verified photos" \
  -fill "$GRAY"   -font "$IR" -pointsize 30 -gravity NorthWest -annotate +192+1262 "Before, during and after every job" \
  -fill "$CARD" -draw "roundrectangle 80,1370 1210,1520 20,20" \
  -fill "$ORANGE" -draw "circle 144,1445 166,1445" \
  -fill "$WHITE"  -font "$IB" -pointsize 38 -gravity NorthWest -annotate +192+1386 "Boost your home resale value" \
  -fill "$GRAY"   -font "$IR" -pointsize 30 -gravity NorthWest -annotate +192+1442 "Show buyers every upgrade you made" \
  -fill "$CARD" -draw "roundrectangle 80,1550 1210,1700 20,20" \
  -fill "$ORANGE" -draw "circle 144,1625 166,1625" \
  -fill "$WHITE"  -font "$IB" -pointsize 38 -gravity NorthWest -annotate +192+1566 "100% free for homeowners" \
  -fill "$GRAY"   -font "$IR" -pointsize 30 -gravity NorthWest -annotate +192+1622 "Always. No hidden fees. Ever." \
  -fill "$ORANGE" -font "$IB" -pointsize 68 -gravity NorthWest -annotate +250+1760 "* * * * *" \
  -fill "$WHITE"  -font "$IB" -pointsize 44 -gravity NorthWest -annotate +310+1860 "Free for Homeowners" \
  -fill "$ORANGE" -draw "roundrectangle 120,2440 1170,2580 40,40" \
  -fill "$WHITE"  -font "$IB" -pointsize 52 -gravity NorthWest -annotate +330+2476 "Get Started Free" \
  screenshots/screen4_value.png
echo "Screen 4 done"
echo "All done!"
