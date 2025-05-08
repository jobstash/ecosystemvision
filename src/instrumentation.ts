import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN =
  'https://9a7126eecba5734903eb209d2a1bd935@o4509231087812608.ingest.de.sentry.io/4509231092793424';

export async function register() {
  if (process.env.NODE_ENV !== 'production') return;

  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1,
    replaysSessionSampleRate: 1,
    replaysOnErrorSampleRate: 1,
    debug: false,
    denyUrls: [/extensions\//i, /^chrome:\/\//i, /^chrome-extension:\/\//i],
    beforeSend(event) {
      const hasStack = event.exception?.values?.some((e) => e.stacktrace);
      return hasStack ? event : null;
    },
  });
}

export const onRequestError = Sentry.captureRequestError;
