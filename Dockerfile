FROM node:24-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml .npmrc ./
RUN corepack enable && corepack prepare pnpm@11.9.0 --activate
RUN pnpm i --frozen-lockfile


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable && corepack prepare pnpm@11.9.0 --activate
ENV NODE_ENV=production
ARG NEXT_PUBLIC_MW_URL
ARG NEXT_PUBLIC_FRONTEND_URL
ARG NEXT_PUBLIC_JOBSTASH_URL
ARG NEXT_PUBLIC_VERI_URL
ARG NEXT_PUBLIC_PAGE_SIZE
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
ENV NEXT_PUBLIC_MW_URL=$NEXT_PUBLIC_MW_URL
ENV NEXT_PUBLIC_FRONTEND_URL=$NEXT_PUBLIC_FRONTEND_URL
ENV NEXT_PUBLIC_JOBSTASH_URL=$NEXT_PUBLIC_JOBSTASH_URL
ENV NEXT_PUBLIC_VERI_URL=$NEXT_PUBLIC_VERI_URL
ENV NEXT_PUBLIC_PAGE_SIZE=$NEXT_PUBLIC_PAGE_SIZE
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=$NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD HOSTNAME="0.0.0.0" node server.js
