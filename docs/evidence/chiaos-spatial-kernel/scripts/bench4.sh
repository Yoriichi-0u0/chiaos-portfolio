#!/bin/zsh
cd /Users/chiayuenkai/Documents/ChiaOS
OUT=/tmp/chiaos-qa/kbench; mkdir -p $OUT; : > $OUT/err.txt
i=0
for spec in pr5:codex/chiaos-gallery-keepalive kernel:codex/chiaos-spatial-kernel pr5:codex/chiaos-gallery-keepalive kernel:codex/chiaos-spatial-kernel; do
  i=$((i+1)); name=${spec%%:*}; br=${spec#*:}
  git switch -q $br || exit 1
  npx next build > $OUT/build-$i.log 2>&1 || { echo build fail $name; exit 1; }
  npx next start -p 3217 > $OUT/server-$i.log 2>&1 &
  sleep 5
  (cd /tmp/chiaos-qa/pw && node perfcmp.mjs --lowpower > $OUT/$i-$name-perf.json 2>>$OUT/err.txt; node ret.mjs > $OUT/$i-$name-ret.json 2>>$OUT/err.txt; node tabs.mjs $name > $OUT/$i-$name-tabs.json 2>>$OUT/err.txt)
  echo "$i $name $(uptime | sed 's/.*averages: //')"
  for p in $(lsof -tiTCP:3217 -sTCP:LISTEN); do kill $p; done; sleep 2
done
git switch -q codex/chiaos-spatial-kernel; echo ALLDONE
