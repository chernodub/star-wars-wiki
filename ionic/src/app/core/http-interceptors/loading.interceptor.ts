import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable, from } from 'rxjs';
import { tap, switchMap, switchMapTo } from 'rxjs/operators';

/**
 * Used for removing the data wrapper (interface above is describing it)
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(public loadingController: LoadingController) {}

  /** @inheritdoc */
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const loading = this.loadingController.create({
      message: 'Loading',
    });
    return from(loading).pipe(
      switchMap(loadingModal =>
        from(loadingModal.present()).pipe(
          switchMapTo(next.handle(req).pipe(tap(() => loadingModal.dismiss()))),
        ),
      ),
    );
  }
}
