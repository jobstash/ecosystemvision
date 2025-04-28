import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN =
  'https://0d295254822c41989ea49baec3c31a6d@o4504495959703552.ingest.us.sentry.io/4504526099447808';

export async function register() {
  if (process.env.NODE_ENV !== 'production') return;

  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1,
    debug: false,
    denyUrls: [/extensions\//i, /^chrome:\/\//i, /^chrome-extension:\/\//i],
    beforeSend(event) {
      const hasStackTrace = event?.exception?.values?.some(
        (exceptionValue) => exceptionValue.stacktrace,
      );

      if (!hasStackTrace) {
        return null;
      }

      return event;
    },
  });
}

export const onRequestError = Sentry.captureRequestError;
