import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';

import { AppStateService } from '../services/app-state.service';

/** Checks whether a user can open the login window */
@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanLoad {
  public constructor(
    private router: Router,
    private appStateService: AppStateService,
  ) {}
  /**
   * @inheritdoc
   */
  public canLoad(): boolean {
    this.appStateService.stopLoading();
    if (localStorage.getItem('idToken')) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
