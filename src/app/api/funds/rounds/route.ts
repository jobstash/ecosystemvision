import type { NextRequest } from 'next/server';

import { MW_URL } from '@/shared/core/envs';
import { sentryMessage } from '@/shared/utils/sentry-message';

export const dynamic = 'force-dynamic';

const RESPONSE_HEADERS = {
  'Cache-Control': 'no-store, max-age=0',
  'Content-Type': 'application/json; charset=utf-8',
};

export const GET = async (request: NextRequest) => {
  const upstreamUrl = new URL('/funds/rounds', MW_URL);
  request.nextUrl.searchParams.forEach((value, key) => {
    upstreamUrl.searchParams.append(key, value);
  });

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    return new Response(upstreamResponse.body, {
      headers: RESPONSE_HEADERS,
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
    });
  } catch (error) {
    sentryMessage(
      'fundRoundStagesProxy',
      JSON.stringify({
        url: upstreamUrl.toString(),
        msg: error instanceof Error ? error.message : String(error),
      }),
    );

    return Response.json(
      { message: 'Unable to load fund round stages' },
      { headers: RESPONSE_HEADERS, status: 502 },
    );
  }
};
