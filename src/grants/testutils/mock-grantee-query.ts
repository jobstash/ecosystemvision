import { delay, http, HttpResponse } from 'msw';

import { errMsg } from '@/shared/core/errors';

import {
  DEFAULT_MSW_OPTIONS,
  MockQueryResult,
  MswOptions,
} from '@/shared/testutils/misc';

import { grantQueryUrls } from '@/grants/core/query-urls';
import { GranteeDetails } from '@/grants/core/schemas';

import { fakeGrantee } from '@/grants/testutils/fake-grantee';

export const mockGranteeQuery = (
  result: MockQueryResult,
  options: MswOptions & { grantId: string; data?: GranteeDetails },
) =>
  http.get(
    `${grantQueryUrls.grantees(options.grantId)}/:granteeId`,
    async ({ params }) => {
      const { networkDelay } = options || DEFAULT_MSW_OPTIONS;
      await delay(networkDelay);

      const granteeId = params.granteeId as string;

      const successResponse = HttpResponse.json({
        success: true,
        message: 'Grantee retrieved successfully',
        data: options?.data || fakeGrantee({ id: granteeId }),
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
    },
  );
