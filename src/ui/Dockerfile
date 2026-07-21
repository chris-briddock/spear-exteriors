# syntax=docker/dockerfile:1

ARG NODE_VERSION=24-alpine

# ---- Build the application ----
FROM node:${NODE_VERSION} AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Runtime image ----
FROM node:${NODE_VERSION} AS runner

# tini is PID 1 in place of node, so signals (docker stop) and zombie
# processes are handled correctly instead of being swallowed by node.
RUN apk add --no-cache tini

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000

# Angular's application builder bundles the server output (including
# express and every other runtime dependency) with esbuild, so nothing
# outside Node's own built-ins is required at runtime - no node_modules
# needed here. Verified: the built server.mjs has zero bare-specifier
# imports besides node:* built-ins, and runs correctly with no
# node_modules present at all.
COPY --from=build /app/dist ./dist

# The official node images ship a non-root "node" user (uid 1000) already.
USER node

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get({ host: 'localhost', port: process.env.PORT || 4000, path: '/healthz' }, (res) => process.exit(res.statusCode < 500 ? 0 : 1)).on('error', () => process.exit(1))"

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/ui/server/server.mjs"]
