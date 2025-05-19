# Étape 1 : builder avec Node.js 18 (Debian-slim)
FROM node:18-slim AS builder
WORKDIR /var/www/frontend

COPY package.json ./
RUN npm install --silent --no-optional

COPY . .
RUN npm run build

# Étape 2 : image minimale pour extraire /dist
FROM busybox:latest AS dist
COPY --from=builder /var/www/frontend/dist /dist
