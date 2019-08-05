import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfig } from '../services/app-config';
import { BrowserStorageService } from '../services/browser-storage.service';

/**
 * Adds the auth key to url
 */
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  public constructor(
    private config: AppConfig,
    private storage: BrowserStorageService,
  ) {}

  /**
   * Adds the auth key to url if we request the api
   */
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.url.includes(this.config.apiUrl)) {
      const clone = req.clone({
        params: new HttpParams().set('auth', this.storage.getItem('idToken')),
      });
      return next.handle(clone);
    }
    return next.handle(req);
  }
}
