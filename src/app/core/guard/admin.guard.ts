import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

/** Used for allowing user to get into admin routes */
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  /** @inheritdoc */
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    // TODO
    return true;
  }
}
