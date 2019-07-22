import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * State of application service
 */
@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  /**
   * Shows whether the app has to be paused
   */
  public isLoading$ = new BehaviorSubject(false);

  /**
   * Pause application
   */
  public startLoading(): void {
    this.isLoading$.next(true);
  }

  /**
   * Unpause application
   */
  public stopLoading(): void {
    this.isLoading$.next(false);
  }
}
