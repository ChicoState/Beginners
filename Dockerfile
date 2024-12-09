FROM nikolaik/python-nodejs:python3.11-nodejs18-alpine AS base

RUN apk add --no-cache \
    postgresql-dev \
    gcc \
    python3-dev \
    musl-dev \
    libc6-compat

FROM base AS deps
WORKDIR /app

COPY package.json ./
RUN npm install
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

FROM base AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY . .
EXPOSE 3000 8000

CMD ["sh", "-c", "cd backend/beginners && python manage.py migrate && python manage.py runserver 0.0.0.0:8000 & npm run dev"]

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PYTHONUNBUFFERED=1

RUN addgroup --system --gid 1001 appgroup
RUN adduser --system --uid 1001 appuser

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/backend ./backend
COPY --from=deps /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

RUN chown -R appuser:appgroup .
USER appuser

EXPOSE 3000 8000

COPY --chown=appuser:appgroup <<EOF ./start.sh
#!/bin/sh
cd backend/beginners && python manage.py migrate && python manage.py runserver 0.0.0.0:8000 &
cd /app && node server.js
EOF

RUN chmod +x ./start.sh
CMD ["./start.sh"]