import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UsersService } from '../services/admin/users.service';
import { AppStateService } from '../services/app-state.service';

/** Used for allowing user to get into admin routes */
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  public constructor(
    private appStateService: AppStateService,
    private usersService: UsersService,
    private router: Router,
  ) {}
  /** @inheritdoc */
  public canActivate(): Observable<boolean> {
    return this.usersService.isUserAdmin().pipe(
      tap((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate(['']);
        }
        this.appStateService.stopLoading();
      }),
    );
  }
}
