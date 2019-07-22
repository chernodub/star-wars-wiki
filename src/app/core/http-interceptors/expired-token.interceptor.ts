import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, OperatorFunction } from 'rxjs';
import { catchError, switchMapTo, concatMap } from 'rxjs/operators';

import { AuthorizationService } from '../services/authorization.service';

/**
 * Refreshes token if it's expired and makes request again
 */
@Injectable()
export class ExpiredTokenInterceptor implements HttpInterceptor {
  public constructor(private authorizationService: AuthorizationService) {}
  /**
   * Refreshes token if it's expired and makes request again
   */
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(this.handleExpiredToken(() => next.handle(req)));
  }

  /**
   * Retries request if there is a expired token
   * @param buildObservable function that builds proper observable to retry request with refreshing of token
   */
  private handleExpiredToken<T>(
    buildObservable: () => Observable<T>,
  ): OperatorFunction<T, T> {
    return catchError((error: HttpErrorResponse) => {
      if (
        error.status === 401 &&
        error.error.error === 'Auth token is expired'
      ) {
        return this.authorizationService
          .refreshToken()
          .pipe(concatMap(buildObservable));
      }
      return EMPTY;
    });
  }
}
