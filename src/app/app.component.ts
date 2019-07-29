import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppStateService } from './core/services/app-state.service';

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
  /** Is user admin */
  public get isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }
  /** Is current page /login */
  public isLoginPage: boolean;
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
