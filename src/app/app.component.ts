import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { AppStateService } from './core/services/app-state.service';

/**
 * Core component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('enterAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 })),
      ]),
      transition('* => void', [animate(200, style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent implements OnDestroy {
  /**
   * Is application paused
   */
  public loading$ = this.appStateService.isLoading$;
  private loadingSubscription: Subscription;
  public constructor(
    private appStateService: AppStateService,
    private router: Router,
  ) {
    this.loadingSubscription = this.router.events
      .pipe(filter((event) => event instanceof ActivationStart))
      .subscribe(() => this.appStateService.startLoading());
  }

  /** Unsubscribe form router events */
  public ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
