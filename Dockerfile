# FROM node:20.11.1-alpine
# WORKDIR /opt/app
# ADD package.json package.json
# RUN npm cache clear --force
# RUN npm install
# ADD . .
# RUN npm run build
# RUN npm prune --production
# CMD [ "node", "server.js" ]

# Install dependencies only when needed
FROM node:20.11.1-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /opt/app
COPY package.json package-lock.json* ./
RUN npm cache clear --force
RUN npm install

# Rebuild the source code only when needed
# This is where because may be the case that you would try
# to build the app based on some `X_TAG` in my case (Git commit hash)
# but the code hasn't changed.
FROM node:20.11.1-alpine AS builder

# ENV NODE_ENV=production
WORKDIR /opt/app

COPY --from=deps /opt/app/node_modules ./node_modules
COPY . .
# COPY --from=deps /opt/app/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run next
FROM node:20.11.1-alpine AS runner

ARG X_TAG
WORKDIR /opt/app
# ENV NODE_ENV=production
COPY --from=builder /opt/app/next.config.mjs ./
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.next ./.next
COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app/package.json ./package.json
RUN npm prune --production
CMD ["npm", "start"]