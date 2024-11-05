import { notFound } from 'next/navigation';

import { z } from 'zod';

import { errMsg, ResponseError } from '@/shared/core/errors';
import { sentryMessage } from '@/shared/utils/sentry-message';

interface Props<T> {
  url: string;
  label: string;
  responseSchema: T;
  options?: RequestInit;
}

export const mwGET = async <T extends z.ZodTypeAny>(props: Props<T>) => {
  if (typeof window !== 'undefined' && !window.navigator.onLine) {
    throw new Error(errMsg.OFFLINE);
  }

  const { url, responseSchema, options, label } = props;

  try {
    const res = await fetch(url, {
      method: 'GET',
      ...options,
      next: {
        revalidate: 43200, // 12 hours
      },
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
      const errInfo = await err.toJSON();
      sentryMessage(label, JSON.stringify({ url, ...errInfo }));

      if (err.res.status === 404) {
        notFound();
      } else if (err.res.status === 400) {
        const jsonRes = await err.res.json();
        throw new Error(jsonRes.message || errMsg.ERR_BAD_REQUEST);
      }

      throw new Error(errMsg.INTERNAL);
    } else {
      sentryMessage(
        label,
        JSON.stringify({ url, msg: (err as Error).message }),
      );
      throw new Error(errMsg.INTERNAL);
    }
  }
};
