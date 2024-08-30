import { CallHandler, ExecutionContext, HttpException, Logger, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { I18nContext, I18nValidationException } from 'nestjs-i18n';
import { formatI18nErrors } from 'nestjs-i18n/dist/utils';
import { catchError, throwError } from 'rxjs';

export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((exception) => {
        const request: Request = context.switchToHttp().getRequest();
        Logger.error('Error processing the http request', {
          request: {
            route: request.route,
            url: request.originalUrl,
            params: request.params,
            query: request.query,
            method: request.method,
            body: request.body,
            ip: request.ips,
          },
          error: exception,
        });
        return throwError(() => {
          let errors = exception?.errors;
          let message =
            exception?.response?.message || exception?.message || exception?.detail || 'Something went wrong';
          let errorKey = message;
          const statusCode = exception.status || exception.statusCode || exception?.response?.statusCode || 500;
          const i18n = I18nContext.current();
          if (exception instanceof I18nValidationException) {
            errorKey = 'VALIDATION_ERROR';
            errors = formatI18nErrors(errors, i18n.service, {
              lang: i18n.lang,
            });
          } else {
            const splitter = errorKey.split('.');
            errorKey = splitter[1] ? splitter[1] : errorKey;
            message = i18n.t(message);
          }
          return new HttpException(
            {
              message,
              key: errorKey,
              timestamp: new Date().toISOString(),
              route: request.path,
              method: request.method,
              errors,
            },
            statusCode,
          );
        });
      }),
    );
  }
}
