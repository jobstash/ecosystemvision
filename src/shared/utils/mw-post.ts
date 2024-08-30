import { z } from 'zod';

import { errMsg, ResponseError } from '@/shared/core/errors';
import { sentryMessage } from '@/shared/utils/sentry-message';

interface Props<R extends z.ZodTypeAny, P extends z.ZodTypeAny> {
  url: string;
  label: string;
  payload: z.infer<P>;
  payloadSchema: P;
  responseSchema: R;
  options?: RequestInit;
}

export const mwPOST = async <R extends z.ZodTypeAny, P extends z.ZodTypeAny>(
  props: Props<R, P>,
) => {
  if (typeof window !== 'undefined' && !window.navigator.onLine) {
    throw new Error(errMsg.OFFLINE);
  }

  const { url, payload, payloadSchema, responseSchema, options, label } = props;

  const payloadResult = payloadSchema.safeParse(payload);
  if (!payloadResult.success) {
    throw new Error(payloadResult.error.errors[0].message);
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payloadResult.data),
      ...options,
    });

    if (!res.ok) {
      throw new ResponseError(errMsg.ERR_RESPONSE, res);
    }

    const jsonData = await res.json();
    const result = responseSchema.safeParse(jsonData);
    if (!result.success) {
      throw new ResponseError(
        errMsg.INVALID_RESPONSE_SCHEMA,
        res,
        JSON.stringify({ details: result.error.issues }),
      );
    }

    return result.data as z.infer<typeof responseSchema>;
  } catch (err: unknown) {
    if (err instanceof ResponseError) {
      sentryMessage(label, JSON.stringify({ url, ...(await err.toJSON()) }));

      if (err.res.status === 400) {
        const jsonRes = await err.res.json();
        throw new Error(jsonRes.message || errMsg.ERR_BAD_REQUEST);
      }
    } else {
      sentryMessage(
        label,
        JSON.stringify({ url, msg: (err as Error).message }),
      );
    }

    throw new Error(errMsg.INTERNAL);
  }
};
