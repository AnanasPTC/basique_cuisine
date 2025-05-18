# Étape 1 : build du frontend
FROM node:20 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances et installer
COPY package*.json ./
RUN rm -rf node_modules package-lock.json
RUN npm install

# Copier le reste du code et builder
COPY . .
RUN npm run build

# Étape 2 : serve avec Nginx
FROM nginx:alpine

# Copier le build dans Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copier la configuration nginx personnalisée si tu en as une
# COPY nginx.conf /etc/nginx/nginx.conf
