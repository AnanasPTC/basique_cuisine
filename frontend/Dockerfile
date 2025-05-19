cd frontend
cat > Dockerfile << 'EOF'
# Étape 1 : builder avec Node 18
FROM node:18-alpine AS builder
WORKDIR /var/www/frontend

# 1. Copier et installer les dépendances
COPY package.json package-lock.json ./
RUN npm ci --silent

# 2. Copier le code et builder l'app
COPY . .
RUN npm run build

# Étape 2 : image minimale pour extraire dist
FROM busybox:latest AS dist
COPY --from=builder /var/www/frontend/dist /dist
EOF
