import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;
const ENVIRONMENT = (process.env.NODE_ENV ?? 'development') as string;

if (SENTRY_DSN && ENVIRONMENT !== 'development') {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENVIRONMENT,
    
    // Enable server-side error tracking
    tracesSampleRate: 0.1, // 10% of transactions
    
    // Ignore common noise
    ignoreErrors: [
      'ResizeObserver loop completed with undelivered notifications',
    ],
    
    // Don't send events in development
    beforeSend(event) {
      if (ENVIRONMENT === 'development') {
        return null;
      }
      return event;
    },
  });
}

export function logError(error: Error, context?: Record<string, unknown>) {
  if (SENTRY_DSN && ENVIRONMENT !== 'development') {
    Sentry.captureException(error, { extra: context });
  } else {
    console.error('Error:', error.message, context);
  }
}

export function logMessage(message: string, level?: Sentry.SeverityLevel) {
  if (SENTRY_DSN && ENVIRONMENT !== 'development') {
    Sentry.captureMessage(message, level);
  } else {
    console.log(`[${level ?? 'info'}]`, message);
  }
}
