import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, ActivationStart } from '@angular/router';
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
export class AppComponent {
  /**
   * Is application paused
   */
  public loading$ = this.appStateService.isLoading$;
  public constructor(
    private appStateService: AppStateService,
    private router: Router,
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof ActivationStart),
        tap(() => this.appStateService.startLoading()),
      )
      .subscribe();
  }
}
