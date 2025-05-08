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
  dsn: 'https://9a7126eecba5734903eb209d2a1bd935@o4509231087812608.ingest.de.sentry.io/4509231092793424',
  tunnel: '/sentry-tunnel',
  tracesSampleRate: 1,
  replaysSessionSampleRate: 1,
  replaysOnErrorSampleRate: 1,
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
