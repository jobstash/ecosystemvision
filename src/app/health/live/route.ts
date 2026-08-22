import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const GET = () => {
  const startedAt = Date.now();
  return NextResponse.json(
    {
      status: 'live',
      service: 'ecosystem-vision',
      environment: process.env.APP_ENV ?? process.env.NODE_ENV ?? 'unknown',
      responseTimeMs: Date.now() - startedAt,
      instanceRole: process.env.INSTANCE_ROLE ?? 'frontend',
      dependencies: {},
    },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  );
};
