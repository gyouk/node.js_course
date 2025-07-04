# 1. BUILD STAGE
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
COPY build.mjs ./
RUN node build.mjs

# 2. PROD STAGE
FROM node:20-alpine AS prod
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# 3. FINAL RUNTIME STAGE (навіть ще легший Alpine)
FROM alpine:3.20
RUN apk add --no-cache nodejs tini
RUN adduser -D -h /home/node node

USER node
WORKDIR /home/node

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "./dist/server.mjs"]

EXPOSE 3000
