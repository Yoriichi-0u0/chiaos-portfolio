#!/bin/zsh
cd /Users/chiayuenkai/Documents/ChiaOS
OUT=/tmp/chiaos-qa/gate/tabs; mkdir -p $OUT
i=0
for spec in dual:codex/chiaos-content-verified keepalive:codex/chiaos-gallery-keepalive dual:codex/chiaos-content-verified keepalive:codex/chiaos-gallery-keepalive; do
  i=$((i+1)); name=${spec%%:*}; br=${spec#*:}
  git switch -q $br || exit 1
  npx next build > $OUT/build-$i.log 2>&1 || { echo build fail $name; exit 1; }
  npx next start -p 3217 > $OUT/server-$i.log 2>&1 &
  sleep 5
  (cd /tmp/chiaos-qa/pw && node tabs.mjs $name > $OUT/$i-$name.json 2>>$OUT/err.txt)
  echo "$i $name $(uptime | sed 's/.*averages: //')"
  for p in $(lsof -tiTCP:3217 -sTCP:LISTEN); do kill $p; done; sleep 2
done
git switch -q codex/chiaos-gallery-keepalive; echo ALLDONE
