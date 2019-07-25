import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
} from '@angular/router';

import { AppStateService } from '../services/app-state.service';

/**
 * Checks if user is authorized
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public constructor(
    private router: Router,
    private appStateService: AppStateService,
  ) {}

  /**
   * Used for allowing or not allowing to get into the main and login pages
   * @param next next route
   * @param state current route
   */
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    this.appStateService.stopLoading();
    if (localStorage.idToken) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
