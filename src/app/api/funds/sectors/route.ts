import { MW_URL } from '@/shared/core/envs';
import { sentryMessage } from '@/shared/utils/sentry-message';

export const dynamic = 'force-dynamic';

const RESPONSE_HEADERS = {
  'Cache-Control': 'no-store, max-age=0',
  'Content-Type': 'application/json; charset=utf-8',
};

export const GET = async () => {
  const upstreamUrl = new URL('/funds/sectors', MW_URL);

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
      'fundSectorsProxy',
      JSON.stringify({
        url: upstreamUrl.toString(),
        msg: error instanceof Error ? error.message : String(error),
      }),
    );

    return Response.json(
      { message: 'Unable to load fund sectors' },
      { headers: RESPONSE_HEADERS, status: 502 },
    );
  }
};
