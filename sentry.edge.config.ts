// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://0d295254822c41989ea49baec3c31a6d@o4504495959703552.ingest.us.sentry.io/4504526099447808',

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    // spotlight: process.env.NODE_ENV === 'development',

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
