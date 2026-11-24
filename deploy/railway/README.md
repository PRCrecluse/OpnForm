# Deploy OpnForm to Railway

Use one project environment with PostgreSQL, Redis, an `api` service and a `web` service. The API service runs Nginx, PHP-FPM, one queue worker and the scheduler. Its Railway volume at `/app/storage` persists local uploads and the Passport key pair. API startup applies database migrations and checks the keys before accepting requests.

| Service setting | API | Web |
| --- | --- | --- |
| Dockerfile path | `/deploy/railway/Dockerfile.api` | `/deploy/railway/Dockerfile.client` |
| Port | `8080` | `3000` |
| Healthcheck path | `/healthz` | `/login` |

Configure both services from the repository root. Railway variable references can use the matching service names in the project.

- Set `APP_ENV=production`, `APP_DEBUG=false`, `SELF_HOSTED=false`, `APP_URL` to the public API URL, and `FRONT_URL` to the public web URL on the API service.
- Set `DB_CONNECTION=pgsql` and reference PostgreSQL's private `DATABASE_URL`. Reference `REDISHOST`, `REDISPORT` and `REDISPASSWORD` from the Redis service as `REDIS_HOST`, `REDIS_PORT` and `REDIS_PASSWORD`.
- Set `OPNFORM_STATE_MODE=redis-fresh`, `QUEUE_CONNECTION=redis`, `REDIS_QUEUE_RETRY_AFTER=3700` and `LOG_CHANNEL=stderr` on the API service.
- Store stable `APP_KEY`, `JWT_SECRET` and `FRONT_API_SECRET` on the API service. Set the web service's server-only `NUXT_API_SECRET` to the same value as `FRONT_API_SECRET`.
- Set `NUXT_PUBLIC_ENV=production`, `NUXT_PUBLIC_APP_URL` to the web URL, `NUXT_PUBLIC_API_BASE` to the API URL and `NUXT_PRIVATE_API_BASE` to `http://api.railway.internal:8080` on the web service. Use each API URL without a path suffix.
- Configure a mail transport to send password resets and notifications. For global admin access, create the intended account securely and confirm its email ownership before adding that address to `ADMIN_EMAILS`.

Deploy from the repository root with `railway up --service api` and `railway up --service web`, or link those services to the deployment branch in GitHub. To activate Stripe, use the billing credentials and recurring price IDs in the API service. Stripe sends signed events to `<public API URL>/stripe/webhook`.
