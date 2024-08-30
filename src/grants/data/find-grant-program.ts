import { MW_URL } from '@/shared/core/envs';
import { errMsg, ResponseError } from '@/shared/core/errors';
import { sentryMessage } from '@/shared/utils/sentry-message';

import { grantDtoInfiniteListPageSchema } from '@/grants/core/schemas';
import { dtoToGrant } from '@/grants/utils/dto-to-grant';

const LABEL = 'findGrantProgram';
const GRANTS_QUERY_URL = `${MW_URL}/grants/query`;

interface Props {
  page: number;
  query: string;
  limit?: number;
}

export const findGrantProgram = async ({ page, query, limit = 10 }: Props) => {
  if (typeof window !== 'undefined' && !window.navigator.onLine) {
    throw new Error(errMsg.OFFLINE);
  }

  try {
    const res = await fetch(GRANTS_QUERY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page,
        query,
        limit,
      }),
    });

    if (!res.ok) {
      throw new ResponseError(errMsg.ERR_RESPONSE, res);
    }

    const jsonData = await res.json();
    const result = grantDtoInfiniteListPageSchema.safeParse(jsonData);
    if (!result.success) {
      throw new ResponseError(
        errMsg.INVALID_RESPONSE_SCHEMA,
        res,
        JSON.stringify({ details: result.error.issues }),
      );
    }

    return { ...result.data, data: result.data.data.map(dtoToGrant) };
  } catch (err: unknown) {
    if (err instanceof ResponseError) {
      sentryMessage(
        LABEL,
        JSON.stringify({ url: GRANTS_QUERY_URL, ...(await err.toJSON()) }),
      );

      if (err.res.status === 400) {
        const jsonRes = await err.res.json();
        throw new Error(jsonRes.message || errMsg.ERR_BAD_REQUEST);
      }
    } else {
      sentryMessage(
        LABEL,
        JSON.stringify({ url: GRANTS_QUERY_URL, msg: (err as Error).message }),
      );
    }

    throw new Error(errMsg.INTERNAL);
  }
};
