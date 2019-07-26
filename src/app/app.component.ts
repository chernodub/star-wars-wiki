import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivationStart, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { AppStateService } from './core/services/app-state.service';
import { RouteData } from './shared/films-list/route-data-model';

/**
 * Core component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  private routerEventSubscription: Subscription;
  /** Is current page /login */
  public isLoginPage: boolean;

  /** Data about current route */
  public routeData$: Observable<RouteData>;
  /**
   * Is application paused
   */
  public loading$ = this.appStateService.isLoading$;
  public constructor(
    private appStateService: AppStateService,
    private router: Router,
  ) {
    this.routerEventSubscription = this.router.events.subscribe((event) => {
      this.isLoginPage = this.router.url === '/login';

      if (event instanceof ActivationStart) {
        this.appStateService.startLoading();
      } else if (this.isLoginPage) {
        this.appStateService.stopLoading();
      }
    });
  }

  /** Log out current session */
  public logOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }
}
