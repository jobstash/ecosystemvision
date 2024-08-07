import { delay, http, HttpResponse } from 'msw';

import { errMsg } from '@/shared/core/errors';

import {
  DEFAULT_MSW_OPTIONS,
  MockInfiniteQueryResult,
  MswOptions,
} from './misc';

interface EndpointOptions<T> {
  url: string;
  data: T;
  limit?: number;
}

export const mockInfiniteListQuery = <T>(
  { url, data }: EndpointOptions<T>,
  result: MockInfiniteQueryResult,
  options?: MswOptions,
) =>
  http.get(url, async ({ request }) => {
    const { networkDelay } = options || DEFAULT_MSW_OPTIONS;

    await delay(networkDelay);

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;

    const emptyResponse = HttpResponse.json({ page: -1, data: [] });
    const successResponse = HttpResponse.json({ page, data });
    const internalErrorResponse = HttpResponse.json(
      { message: errMsg.INTERNAL },
      { status: 500 },
    );

    switch (result) {
      case MockInfiniteQueryResult.SUCCESS: {
        // Empty on further pages
        if (page === 5) {
          return emptyResponse;
        }

        return successResponse;
      }

      case MockInfiniteQueryResult.EMPTY: {
        return emptyResponse;
      }

      case MockInfiniteQueryResult.END_OF_RESULTS: {
        // Empty on next page
        if (page === 2) {
          return emptyResponse;
        }

        // Success on first page
        return successResponse;
      }

      case MockInfiniteQueryResult.NETWORK_ERROR: {
        return HttpResponse.error();
      }

      case MockInfiniteQueryResult.FETCH_ERROR: {
        // Error on next page
        if (page === 2) {
          return internalErrorResponse;
        }

        // Success on first page
        return successResponse;
      }

      default: {
        throw new Error(`Unhandled mock query result: ${result}`);
      }
    }
  });
