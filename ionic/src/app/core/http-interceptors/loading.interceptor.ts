import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable, from } from 'rxjs';
import { tap, switchMap, switchMapTo } from 'rxjs/operators';

/**
 * Starts loading when request begins and closes it when request is ended
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private loading: Promise<HTMLIonLoadingElement>;

  constructor(public loadingController: LoadingController) {}

  /** @inheritdoc */
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!this.loading) {
      this.loading = this.loadingController.create({
        message: 'Loading',
      });
      return from(this.loading).pipe(
        switchMap(loadingModal =>
          from(loadingModal.present()).pipe(
            switchMapTo(next.handle(req)),
            tap(() => {
              loadingModal.dismiss().then(() => (this.loading = null));
            }),
          ),
        ),
      );
    }
    return next.handle(req);
  }
}
