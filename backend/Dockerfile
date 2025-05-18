# 1) Build JS/CSS avec Vite
FROM node:18 AS node-build
WORKDIR /app
COPY package*.json vite.config.js ./
RUN npm ci
COPY . .
RUN npm run build

# 2) PHP + Composer + extensions
FROM php:8.1-fpm
WORKDIR /var/www/html

# Installer extensions PHP (ajustez selon vos besoins)
RUN apt update && apt install -y libpng-dev libonig-dev libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl

# Copier les assets générés
COPY --from=node-build /app/public/build /var/www/html/public/build

# Copier le reste de l’app et installer Composer
COPY --from=node-build /app /var/www/html
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
