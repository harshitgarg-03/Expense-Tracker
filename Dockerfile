
# ------------------------  STAGE 1 BASE  -------------------------

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat


# ------------------------ STAGE 2 DEPS ----------------------------

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts


#  ------------------------- STAGE 3 BUILDER -------------------------

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"
RUN npx prisma generate
RUN npm run build


#  -------------------------- STAGE 4 RUNNER ----------------------------

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production\
    NEXT_TELEMETRY_DISABLED=1\
    PORT=3000\
    HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs


COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

