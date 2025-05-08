import {
  breadcrumbsIntegration,
  browserApiErrorsIntegration,
  BrowserClient,
  captureRouterTransitionStart,
  dedupeIntegration,
  defaultStackParser,
  eventFiltersIntegration,
  getCurrentScope,
  globalHandlersIntegration,
  httpClientIntegration,
  httpContextIntegration,
  linkedErrorsIntegration,
  makeFetchTransport,
} from '@sentry/nextjs';

const client = new BrowserClient({
  dsn: 'https://d9c07cf404c1777bcf744cb901dfc7c2@o4504495959703552.ingest.us.sentry.io/4504526099447808',
  tunnel: '/sentry-tunnel',
  tracesSampleRate: 0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
  debug: false,
  transport: makeFetchTransport,
  stackParser: defaultStackParser,
  integrations: [
    eventFiltersIntegration(),
    breadcrumbsIntegration(),
    globalHandlersIntegration(),
    linkedErrorsIntegration(),
    dedupeIntegration(),
    browserApiErrorsIntegration(),
    httpClientIntegration(),
    httpContextIntegration(),
  ],
  denyUrls: [/extensions\//i, /^chrome:\/\//i, /^chrome-extension:\/\//i],
  beforeSend(event) {
    const hasStack = event.exception?.values?.some((e) => e.stacktrace);
    return hasStack ? event : null;
  },
});

if (process.env.NODE_ENV === 'production') {
  getCurrentScope().setClient(client);
  client.init();
}

export const onRouterTransitionStart = captureRouterTransitionStart;
