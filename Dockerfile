FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml* .npmrc ./
RUN yarn global add pnpm && pnpm i --frozen-lockfile


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn global add pnpm
ENV NODE_ENV=production
ENV NEXT_PUBLIC_MW_URL=https://middleware.jobstash.xyz
ENV NEXT_PUBLIC_FRONTEND_URL=https://jobstash.xyz
ENV NEXT_PUBLIC_EDGE_URL=https://edge-staging.vercel.app
ENV NEXT_PUBLIC_JOB_FRAME_URL=https://job-frame.vercel.app
ENV NEXT_PUBLIC_PAGE_SIZE=20
ENV NEXT_PUBLIC_QUERY_RETRY_COUNT=0
ENV NEXT_PUBLIC_INFURA_ID=805a91964ce748f7b7b3d0c787ad7783
ENV NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=d6b3203f9238276df2440599c3497e69
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PQSHG9DB44
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD HOSTNAME="0.0.0.0" node server.js