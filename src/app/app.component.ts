import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, ActivationStart } from '@angular/router';

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
    this.router.events.subscribe((event) => {
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
}
