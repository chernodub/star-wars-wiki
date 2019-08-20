import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../models/user';
import { AppConfig, USER } from '../services/app-config';

/**
 * Adds the auth key to url
 */
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  public constructor(private config: AppConfig, private storage: Storage) {}

  /**
   * Adds the auth key to url if we request the api
   */
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.url.includes(this.config.apiUrl)) {
      return from(this.storage.get(USER)).pipe(
        switchMap((user: User) => {
          const clone = req.clone({
            params: new HttpParams().set('auth', user.idToken),
          });
          return next.handle(clone);
        }),
      );
    }
    return next.handle(req);
  }
}
