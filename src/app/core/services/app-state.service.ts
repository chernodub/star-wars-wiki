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
  startLoading(): void {
    this.isLoading$.next(true);
  }

  /**
   * Unpause application
   */
  stopLoading(): void {
    this.isLoading$.next(false);
  }
}
