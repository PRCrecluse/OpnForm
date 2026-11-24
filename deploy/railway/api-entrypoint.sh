#!/bin/sh
set -eu

: "${APP_KEY:?APP_KEY must be set}"
: "${JWT_SECRET:?JWT_SECRET must be set}"
: "${DATABASE_URL:?DATABASE_URL must be set}"
: "${REDIS_HOST:?REDIS_HOST must be set}"

install -d -o www-data -g www-data \
    storage storage/app storage/app/public storage/framework storage/framework/cache \
    storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs

runuser -u www-data -- php artisan migrate --force --isolated=75 --no-interaction
if [ ! -L public/storage ]; then
    runuser -u www-data -- php artisan storage:link --no-interaction
fi
if [ -z "${PASSPORT_PRIVATE_KEY:-}" ] && [ -z "${PASSPORT_PUBLIC_KEY:-}" ] && [ ! -e storage/oauth-private.key ] && [ ! -e storage/oauth-public.key ]; then
    runuser -u www-data -- php artisan passport:keys --no-interaction
fi
runuser -u www-data -- php artisan mcp:check-oauth-keys --no-interaction
runuser -u www-data -- php artisan optimize --no-interaction

exec supervisord -c /etc/opnform/supervisord.conf
