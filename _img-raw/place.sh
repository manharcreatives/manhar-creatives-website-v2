#!/bin/bash
# Converts every raw PNG that has a matching slot and drops it over the
# placeholder at the exact path the code already points at.
cd "$HOME/mnt/Manhar-Creatives"
n=0
while read -r key path; do
  src="_img-raw/${key}.png"
  [ -f "$src" ] || continue
  dest="public${path}"
  convert "$src" -resize '1920x1920>' -quality 80 -define webp:method=6 "$dest"
  printf "%-28s -> %-52s %s KB\n" "$key" "$path" "$(( $(stat -c%s "$dest") / 1024 ))"
  n=$((n+1))
done < _img-raw/slotmap.txt
echo "placed: $n"
