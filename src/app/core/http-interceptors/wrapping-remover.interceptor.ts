import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Used for removing the data wrapper (interface above is describing it)
 */
@Injectable()
export class WrappingRemoverInterceptor implements HttpInterceptor {
  private mapFields = (x): Object => (x ? (x['fields'] ? x['fields'] : x) : x);
  /** @inheritdoc */
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((response) => {
        if (response instanceof HttpResponse) {
          if (response.body instanceof Array) {
            return response.clone({ body: response.body.map(this.mapFields) });
          }
          return response.clone({ body: this.mapFields(response.body) });
        }
      }),
    );
  }
}
