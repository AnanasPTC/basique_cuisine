# Étape 1 : Build avec Node 18 (Debian, plus compatible)
FROM node:18 AS builder

WORKDIR /app

# Copie séparée des fichiers de dépendances pour profiter du cache Docker
COPY package*.json ./
RUN npm ci
RUN npm rebuild @swc/core


# Ajout du code source
COPY . .

# Build le projet
RUN npm run build

# Étape 2 : Nginx pour servir les fichiers statiques
FROM nginx:stable-alpine

# Copie le build Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# (Optionnel) Ajoute un custom nginx.conf pour gérer les SPA/proxy (si besoin)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Empêche le caching agressif de Docker lors des changements
CMD ["nginx", "-g", "daemon off;"]
