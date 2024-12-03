FROM quay.io/centos/centos:stream9 AS base
ARG GOSU_VERSION=1.17
ARG NODE_VERSION=22.11.0
ARG TARGETPLATFORM

RUN --mount=type=cache,target=/var/cache/dnf,id=dnf-$TARGETPLATFORM dnf config-manager -y --set-enabled crb && \
  dnf install -y epel-release epel-next-release

RUN --mount=type=cache,target=/var/cache/dnf,id=dnf-$TARGETPLATFORM dnf clean all && \
  dnf update -y && \
  dnf install -y --allowerasing ca-certificates curl gnupg dirmngr xz tar file

# https://github.com/nodejs/docker-node/blob/main/18/alpine3.16/Dockerfile
RUN set -eux; \
  export GNUPGHOME="$(mktemp -d)"; \
  export ARCH="$(uname -m)"; \
  case "$ARCH" in \
  x86_64) ARCH="amd64";; \
  aarch64) ARCH="arm64";; \
  *) echo "unsupported architecture"; exit 1 ;; \
  esac; \
  curl -fsSL --compressed -o /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$ARCH"; \
  curl -fsSL --compressed -o /usr/local/bin/gosu.asc "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$ARCH.asc"; \
  gpg --batch --keyserver hkps://keys.openpgp.org --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4; \
  gpg --batch --verify /usr/local/bin/gosu.asc /usr/local/bin/gosu; \
  chmod +x /usr/local/bin/gosu; \
  gosu nobody true; \
  export ARCH="$(uname -m)"; \
  case "$ARCH" in \
  x86_64) ARCH="x64";; \
  aarch64) ARCH="arm64";; \
  *) echo "unsupported architecture"; exit 1 ;; \
  esac; \
  for key in \
  C0D6248439F1D5604AAFFB4021D900FFDB233756 \
  DD792F5973C6DE52C432CBDAC77ABFA00DDBF2B7 \
  CC68F5A3106FF448322E48ED27F5E38D5B0A215F \
  8FCCA13FEF1D0C2E91008E09770F7A9A5AE15600 \
  890C08DB8579162FEE0DF9DB8BEAB4DFCF555EF4 \
  C82FA3AE1CBEDC6BE46B9360C43CEC45C17AB93C \
  108F52B48DB57BB0CC439B2997B01419BD92F80A \
  A363A499291CBBC940DD62E41F10027AF002F8B0 \
  ; do \
  gpg --batch --keyserver hkps://keys.openpgp.org --recv-keys "$key" || \
  gpg --batch --keyserver keyserver.ubuntu.com --recv-keys "$key"; \
  done; \
  curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH.tar.xz"; \
  curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc"; \
  gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc; \
  grep " node-v$NODE_VERSION-linux-$ARCH.tar.xz\$" SHASUMS256.txt | sha256sum -c -; \
  tar -xJf "node-v$NODE_VERSION-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 --no-same-owner; \
  ln -s /usr/local/bin/node /usr/local/bin/nodejs; \
  gpgconf --kill all; \
  rm -rf "$GNUPGHOME" /usr/local/bin/gosu.asc "node-v$NODE_VERSION-linux-$ARCH.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt; \
  groupadd --gid 1000 node; \
  useradd --uid 1000 --create-home --shell=/bin/sh -g node node; \
  npm install -g npm; \
  gosu --version; \
  node --version; \
  npm --version

# RUN set -eux \
#   && dnf install -y --nodocs dnf-plugins-core \
#   && dnf config-manager -y --add-repo https://releases.escapace.com/stable/linux/centos/escapace.repo \
#   && dnf upgrade -y --nodocs \
#   && dnf install --nodocs --assumeyes gcc gcc-c++ freetype-devel glib2-devel cairo-devel python3-devel

ARG PNPM_VERSION=9.14.4

RUN npm install -g pnpm@${PNPM_VERSION}
COPY --from=ghcr.io/astral-sh/uv:0.5.5 /uv /uvx /bin/
RUN --mount=type=cache,target=/var/cache/dnf,id=dnf-$TARGETPLATFORM \
  dnf --assumeyes install clang libxml2 libxml2-devel libxslt libxslt-devel epel-release epel-next-release
RUN file -b /bin/uv

# ---

FROM base AS package

USER node
WORKDIR /home/node/package/packages/container
COPY ./package /home/node/package

ENV PYTHONUNBUFFERED=1
ENV PATH="/home/node/package/packages/container/.venv/bin:$PATH"
ENV CC=gcc CXX=g++

# ---

FROM package AS build

ARG TARGETPLATFORM

RUN echo "package-import-method=copy" >> /home/node/package/.npmrc && \
    echo "node-linker=hoisted" >> /home/node/package/.npmrc

RUN --mount=type=cache,target=/home/node/.local/share/pnpm/store,uid=1000,gid=1000,id=pnpm-dev-$TARGETPLATFORM \
  pnpm install --frozen-lockfile --ignore-scripts
RUN --mount=type=cache,target=/home/node/.cache/uv,uid=1000,gid=1000,id=uv-$TARGETPLATFORM \
  uv sync --link-mode copy --frozen

RUN pnpm run build

# ---

FROM build AS test

ENV CONTAINER_TEST=true

RUN pnpm run test

# ---

FROM package AS production

ARG TARGETPLATFORM

RUN echo "package-import-method=copy" >> /home/node/package/.npmrc && \
    echo "node-linker=hoisted" >> /home/node/package/.npmrc

COPY --from=build /home/node/package/packages/container/lib /home/node/package/packages/container/lib
RUN --mount=type=cache,target=/home/node/.local/share/pnpm/store,uid=1000,gid=1000,id=pnpm-prod-$TARGETPLATFORM \
  pnpm install --frozen-lockfile --ignore-scripts --prod && pnpm store prune
RUN --mount=type=cache,target=/home/node/.cache/uv,uid=1000,gid=1000,id=uv-$TARGETPLATFORM \
  uv sync --no-dev --link-mode copy --frozen

RUN rm -rf Dockerfile scripts test tsconfig* vitest* && \
  find src -type f ! -path "src/font/font-loader.ts" ! -path "src/font/font-strip.py" && \
  find src -type d -empty -delete

USER root

RUN dnf remove -y clang libxml2-devel libxslt-devel file && \
  dnf --assumeyes autoremove && \
  dnf clean all && \
  rm -rf /var/cache/yum/ /var/cache/dnf/ /tmp/* /bin/uv /bin/uvx

USER node

WORKDIR /workdir
ENTRYPOINT ["node", "--enable-source-maps", "--no-warnings", "--experimental-vm-modules", "/home/node/package/packages/container/lib/node/cli.js"]
CMD []

# ---

FROM quay.io/centos/centos:stream9
COPY --from=production / /

WORKDIR /workdir
ENV PATH="/home/node/package/packages/container/.venv/bin:$PATH"
ENTRYPOINT ["node", "--enable-source-maps", "--no-warnings", "--experimental-vm-modules", "/home/node/package/packages/container/lib/node/cli.js"]
CMD []
