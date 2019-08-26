import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { STORAGE_USER_KEY } from '../services/app-config';

/**
 * Checks if user is authorized
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  public constructor(private router: Router, private storage: Storage) {}

  /**
   * @inheritdoc
   */
  public canLoad(): Observable<boolean> {
    return from(this.storage.get(STORAGE_USER_KEY)).pipe(
      map(user => !!user),
      tap(isLogged => {
        if (!isLogged) {
          this.router.navigate(['login']);
        }
      }),
    );
  }
}
