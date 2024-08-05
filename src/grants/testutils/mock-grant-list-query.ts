import { delay, http, HttpResponse } from 'msw';

import { MW_URL } from '@/shared/core/envs';
import { errMsg } from '@/shared/core/errors';

import {
  DEFAULT_MSW_OPTIONS,
  MockInfiniteQueryResult,
  MswOptions,
} from '@/shared/testutils/misc';

import { fakeGrant } from './fake-grant';

export const mockGrantListQuery = (
  result: MockInfiniteQueryResult,
  options?: MswOptions,
) =>
  http.get(`${MW_URL}/grants/list`, async ({ request }) => {
    const { networkDelay } = options || DEFAULT_MSW_OPTIONS;

    await delay(networkDelay);

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const limit = Number(url.searchParams.get('limit')) || 0;

    const data = Array.from({ length: Number(limit || 0) }).map(
      () => fakeGrant,
    );

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
        return internalErrorResponse;
      }
    }
  });
