import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private appStateService: AppStateService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.appStateService.idToken) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
