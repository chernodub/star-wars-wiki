import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  public constructor(private router: Router) {}
  /**
   * @inheritdoc
   */
  public canActivate(): boolean {
    if (localStorage.idToken) {
      this.router.navigate(['films']);
      return false;
    }
    return true;
  }
}
