# Utilise l'image officielle PHP 8.2 FPM
FROM php:8.2-fpm

# Installer les dépendances système et les extensions PHP
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
  && docker-php-ext-install pdo_mysql mbstring xml zip

# Installer Composer (depuis l'image officielle)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définir le répertoire de travail
WORKDIR /var/www/backend

# Copier les fichiers de dépendances puis installer
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# Copier le reste de l'application
COPY . .

# Générer la clé de l'application et mettre en cache les configs
RUN php artisan key:generate --ansi \
  && php artisan config:cache \
  && php artisan route:cache \
  && php artisan view:cache

# Définir les permissions pour le stockage et le cache
RUN chown -R www-data:www-data /var/www/backend/storage /var/www/backend/bootstrap/cache \
  && chmod -R 775 /var/www/backend/storage /var/www/backend/bootstrap/cache

# Exposer le socket FPM
EXPOSE 9000

CMD ["php-fpm"]