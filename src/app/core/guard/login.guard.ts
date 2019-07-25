import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AppStateService } from '../services/app-state.service';

/** Checks whether a user can open the login window */
@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  public constructor(
    private router: Router,
    private appStateService: AppStateService,
  ) {}
  /**
   * @inheritdoc
   */
  public canActivate(): boolean {
    this.appStateService.stopLoading();
    if (localStorage.idToken) {
      this.router.navigate(['films']);
      return false;
    }
    return true;
  }
}
