import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN =
  'https://0d295254822c41989ea49baec3c31a6d@o4504495959703552.ingest.us.sentry.io/4504526099447808';

export async function register() {
  if (process.env.NODE_ENV !== 'production') return;

  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 0,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    debug: false,
    denyUrls: [/extensions\//i, /^chrome:\/\//i, /^chrome-extension:\/\//i],
    beforeSend(event) {
      const hasStack = event.exception?.values?.some((e) => e.stacktrace);
      return hasStack ? event : null;
    },
  });
}

export const onRequestError = Sentry.captureRequestError;
