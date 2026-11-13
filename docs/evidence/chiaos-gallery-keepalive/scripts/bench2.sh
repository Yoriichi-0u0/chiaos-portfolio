#!/bin/zsh
cd /Users/chiayuenkai/Documents/ChiaOS
OUT=/tmp/chiaos-qa/keepalive/perf/ret; mkdir -p $OUT
for spec in "dual:codex/chiaos-content-verified:" "unified:codex/chiaos-unified-renderer:--unified" "keepalive:codex/chiaos-gallery-keepalive:"; do
  name=${spec%%:*}; rest=${spec#*:}; br=${rest%%:*}; flag=${rest#*:}
  git switch -q $br || exit 1
  npx next build > $OUT/build-$name.log 2>&1 || { echo build fail $name; exit 1; }
  npx next start -p 3217 > $OUT/server-$name.log 2>&1 &
  sleep 4
  for r in 1 2 3; do (cd /tmp/chiaos-qa/pw && node ret.mjs $flag > $OUT/m-$name-r$r.json 2>>$OUT/err-$name.txt); echo "$name m$r $(uptime | sed 's/.*averages: //')"; done
  (cd /tmp/chiaos-qa/pw && node ret.mjs --desktop $flag > $OUT/d-$name.json 2>>$OUT/err-$name.txt)
  for p in $(lsof -tiTCP:3217 -sTCP:LISTEN); do kill $p; done; sleep 2
done
git switch -q codex/chiaos-gallery-keepalive; echo ALLDONE
