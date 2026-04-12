#!/bin/bash
cd /home/node/.openclaw/workspace/roofax/roofax-mobile/assets

INTER_BOLD="/tmp/inter_fonts/extras/ttf/Inter-Bold.ttf"
INTER_REG="/tmp/inter_fonts/extras/ttf/Inter-Regular.ttf"

convert -size 2048x2048 xc:"#0f172a" \
  -fill "#f97316" -draw "polygon 1024,440 760,740 1288,740" \
  -fill "#ffffff" -draw "roundrectangle 824,720 1224,1008 16,16" \
  -fill "#0f172a" -draw "roundrectangle 900,840 1048,1008 14,14" \
  -fill "#f97316" -draw "path 'M 1160 760 L 1230 788 L 1230 860 Q 1230 912 1160 948 Q 1090 912 1090 860 L 1090 788 Z'" \
  -fill "none" -stroke "#ffffff" -strokewidth 24 \
  -draw "polyline 1112,856 1150,896 1210,822" \
  -fill "#ffffff" \
  -font "$INTER_BOLD" \
  -pointsize 140 \
  -gravity North \
  -annotate +0+1080 "Roofax" \
  -fill "#94a3b8" \
  -font "$INTER_REG" \
  -pointsize 58 \
  -annotate +0+1260 "Your Home's Digital Record" \
  splash-icon.png

echo "done"
