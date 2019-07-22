import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
} from '@angular/router';

/**
 * Checks if user is authorized
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public constructor(private router: Router) {}

  /**
   * Used for allowing or not allowing to get into the main and login pages
   * @param next next route
   * @param state current route
   */
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (localStorage.idToken) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
