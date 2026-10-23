import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const ENVIRONMENT = (process.env.NEXT_PUBLIC_ENVIRONMENT ?? process.env.NODE_ENV ?? 'development') as string;

if (SENTRY_DSN && ENVIRONMENT !== 'development') {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENVIRONMENT,
    
    // Enable client-side error tracking
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    
    // Performance monitoring
    tracesSampleRate: 0.1, // 10% of transactions
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
    
    // Ignore common noise
    ignoreErrors: [
      'ResizeObserver loop completed with undelivered notifications',
      'Non-Error promise rejection captured with keys:',
    ],
    
    // Set environment variables for client-side
    beforeSend(event) {
      // Don't send events in development
      if (ENVIRONMENT === 'development') {
        return null;
      }
      return event;
    },
  });
}

export function initSentry() {
  // Client-side initialization is handled above via the module
  // This function can be called to trigger early initialization if needed
}
