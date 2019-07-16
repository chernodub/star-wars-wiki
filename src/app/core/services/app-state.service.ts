import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  /**
   * Shows whether the app has to be paused
   */
  isLoading = new BehaviorSubject(false);

  /**
   * Authorization token
   */
  idToken: string;

  constructor() {}

  /**
   * Pause application
   */
  setLoading(): void {
    this.isLoading.next(true);
  }

  /**
   * Unpause application
   */
  unsetLoading(): void {
    this.isLoading.next(false);
  }
}
