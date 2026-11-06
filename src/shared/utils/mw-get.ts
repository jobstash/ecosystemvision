import { notFound } from 'next/navigation';

import { z } from 'zod';

import { errMsg, ResponseError } from '@/shared/core/errors';

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

  const res = await fetch(url, {
    method: 'GET',
    ...options,
    // Organization, project, and funding projections are updated by the
    // ingestion workers. Serving a persisted Next.js fetch-cache entry here
    // can therefore expose superseded data for hours after the database and
    // middleware are already correct.
    cache: 'no-store',
  });

  if (res.status === 404) {
    notFound();
  }

  // A fixed base supports relative browser requests for diagnostics only.
  // Never change the fetch URL or expose credentials, queries, or response bodies.
  const pathname = new URL(url, 'http://diagnostic.invalid').pathname;
  const context = `${label} (${res.status} ${pathname})`;
  if (!res.ok) {
    throw new ResponseError(`${context}: ${errMsg.ERR_RESPONSE}`, res);
  }

  let jsonData: unknown;
  try {
    jsonData = await res.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new ResponseError(`${context}: ${errMsg.INVALID_JSON}`, res);
    }
    throw error;
  }

  const result = responseSchema.safeParse(jsonData);
  if (!result.success) {
    const details = result.error.issues.map(({ code, path }) => ({
      code,
      path,
    }));
    const info = JSON.stringify({ details });
    throw new ResponseError(
      `${context}: ${errMsg.INVALID_RESPONSE_SCHEMA}: ${info}`,
      res,
      info,
    );
  }

  return result.data as z.infer<typeof responseSchema>;
};
