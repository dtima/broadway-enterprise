interface LogContext {
  userId?: string;
  requestId?: string;
  service?: string;
  metadata?: Record<string, any>;
}

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

class Logger {
  private service: string;

  constructor(service: string = 'broadway-enterprise') {
    this.service = service;
  }

  private log(level: LogLevel, message: string, context: LogContext = {}) {
    const logEntry = {
      level,
      message,
      service: context.service || this.service,
      userId: context.userId,
      requestId: context.requestId,
      metadata: context.metadata || {},
      timestamp: new Date().toISOString(),
    };

    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      const consoleMethod = level === LogLevel.ERROR || level === LogLevel.FATAL ? 'error' : 
                           level === LogLevel.WARN ? 'warn' : 'log';
      console[consoleMethod](`[${level.toUpperCase()}] ${message}`, logEntry);
    }

    // Production logging (integrate with monitoring service)
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to monitoring service (Sentry, LogRocket, etc.)
      this.sendToMonitoringService(logEntry);
    }
  }

  private async sendToMonitoringService(logEntry: any) {
    try {
      // Example: Send to external logging service
      // await fetch('/api/logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(logEntry),
      // });
    } catch (error) {
      console.error('Failed to send log to monitoring service:', error);
    }
  }

  debug(message: string, context?: LogContext) {
    this.log(LogLevel.DEBUG, message, context);
  }

  info(message: string, context?: LogContext) {
    this.log(LogLevel.INFO, message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log(LogLevel.WARN, message, context);
  }

  error(message: string, error?: Error, context?: LogContext) {
    const errorContext = {
      ...context,
      metadata: {
        ...context?.metadata,
        error: error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        } : undefined,
      },
    };
    this.log(LogLevel.ERROR, message, errorContext);
  }

  fatal(message: string, error?: Error, context?: LogContext) {
    const errorContext = {
      ...context,
      metadata: {
        ...context?.metadata,
        error: error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        } : undefined,
      },
    };
    this.log(LogLevel.FATAL, message, errorContext);
  }
}

// Create singleton logger instances
export const logger = new Logger();
export const apiLogger = new Logger('api');
export const authLogger = new Logger('auth');
export const dbLogger = new Logger('database');

// Request ID middleware helper
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
