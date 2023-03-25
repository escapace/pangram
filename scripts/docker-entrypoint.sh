#!/bin/sh

set -o errexit
set -o nounset

if [ -z ${UID+x} ]; then
  echo "UID not set"
  exit 1
fi

if [ -z ${GID+x} ]; then
  echo "UID not set"
  exit 1
fi

addgroup -S -g "${GID}" node \
  && adduser -S -u "${UID}" -G node -s /bin/sh node \
  && umask "${UMASK}" \
  && mkdir -p /wd \
  && chown node:node /wd \
  && cd /wd \
  && exec sudo -u node node --no-warnings --experimental-vm-modules --enable-source-maps /web-fonts/lib/esm/cli.mjs "$@"
