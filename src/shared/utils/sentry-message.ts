import * as Sentry from '@sentry/nextjs';
import { type SeverityLevel } from '@sentry/nextjs';

export const sentryMessage = (
  label: string,
  msg: string,
  level: SeverityLevel = 'error',
) => {
  const message = `${label}: ${msg}`;
  if (process.env.NODE_ENV === 'production' && !process.env.IS_LOCAL) {
    Sentry.captureMessage(message, level);
  } else {
    console.log(message);
  }
};
