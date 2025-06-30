# === Build stage ===
FROM alpine:3.19 AS builder
WORKDIR /app

# Копіюємо package.json і package-lock.json (або yarn.lock)
COPY package*.json ./
RUN apk add --no-cache nodejs tini

# Копіюємо лише код (уникаємо зайвих файлів, напр. .git, node_modules тощо)
COPY src ./src

# === Production (slim) stage ===
FROM node:20-alpine

WORKDIR /app

# Копіюємо лише node_modules з builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY package*.json ./

EXPOSE 3000
CMD ["node", "src/server.js"]
