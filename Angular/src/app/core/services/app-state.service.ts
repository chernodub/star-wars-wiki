import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../models/user';

/**
 * State of application service
 */
@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  /** Current logged user */
  public currentUser: User;
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
