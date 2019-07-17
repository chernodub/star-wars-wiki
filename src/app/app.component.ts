import { Component } from '@angular/core';
import { AppStateService } from './core/services/app-state.service';
import { skip, tap } from 'rxjs/operators';

/**
 * Core component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Is application paused
   */
  public loading: boolean;

  /**
   * Is user logged in
   * used for rendering navbar
   */
  authorized: boolean;
  constructor(private appStateService: AppStateService) {
    this.appStateService.isLoading$.pipe(
      skip(1),
      tap((isLoading) => {
        this.loading = isLoading;
        this.authorized = !!localStorage.idToken;
      })
    );
  }
}
