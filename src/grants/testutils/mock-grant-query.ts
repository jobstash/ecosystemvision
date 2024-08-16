import { delay, http, HttpResponse } from 'msw';

import { errMsg } from '@/shared/core/errors';

import {
  DEFAULT_MSW_OPTIONS,
  MockQueryResult,
  MswOptions,
} from '@/shared/testutils/misc';

import { grantQueryUrls } from '@/grants/core/query-urls';
import { Grant } from '@/grants/core/schemas';

import { fakeGrant } from '@/grants/testutils/fake-grant';

export const mockGrantQuery = (
  result: MockQueryResult,
  options?: MswOptions & { data?: Grant },
) =>
  http.get(`${grantQueryUrls.base}/:grantId`, async ({ params }) => {
    const { networkDelay } = options || DEFAULT_MSW_OPTIONS;
    await delay(networkDelay);

    const grantId = params.grantId as string;

    const successResponse = HttpResponse.json({
      success: true,
      message: 'Grant retrieved successfully',
      data: options?.data || fakeGrant({ id: grantId }),
    });

    const internalErrorResponse = HttpResponse.json(
      { message: errMsg.INTERNAL },
      { status: 500 },
    );

    switch (result) {
      case MockQueryResult.SUCCESS: {
        return successResponse;
      }

      case MockQueryResult.NOT_FOUND: {
        return HttpResponse.json(
          { message: errMsg.NOT_FOUND },
          { status: 404 },
        );
      }

      case MockQueryResult.FETCH_ERROR: {
        return internalErrorResponse;
      }

      case MockQueryResult.NETWORK_ERROR: {
        return HttpResponse.error();
      }

      default: {
        throw new Error(`Unhandled mock query result: ${result}`);
      }
    }
  });
