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
 * Wrapping of the response from the server
 */
interface Wrapper {
  /** Primary key */
  pk: number;
  /** Model */
  model: string;
  /** The result object itself */
  fields: Object;
}

/**
 * Used for removing the data wrapper (interface above is describing it)
 */
@Injectable()
export class WrappingRemoverInterceptor implements HttpInterceptor {
  /** @inheritdoc */
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('.json')) {
      return next.handle(req).pipe(
        map((response) => {
          if (response instanceof HttpResponse) {
            return response.clone({ body: this.modify(response.body) });
          }
        }),
      );
    }
    return next.handle(req);
  }

  /**
   * Modifies the body of response
   */
  public modify(body: Wrapper | Wrapper[]): Object | Object[] {
    if (body instanceof Array) {
      return body.map((x) => x['fields']);
    }
    return body['fields'];
  }
}
