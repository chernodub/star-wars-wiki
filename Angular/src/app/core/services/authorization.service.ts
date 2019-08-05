import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { tap, mapTo, first, switchMap } from 'rxjs/operators';

import { User } from '../models/user';

import { UsersService } from './admin/users.service';
import { AppConfig } from './app-config';
import { AppStateService } from './app-state.service';
import { BrowserStorageService } from './browser-storage.service';
import { LoginDTO } from './dto/login-dto';

/**
 * Used for authorization needs
 */
@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  public constructor(
    private http: HttpClient,
    private appStateService: AppStateService,
    private usersService: UsersService,
    private config: AppConfig,
    private router: Router,
    private storage: BrowserStorageService,
  ) {}

  private mapUser(user: LoginDTO): User {
    return new User(user);
  }
  /**
   * loginWithEmail
   * Gets the authorization token from the server
   */
  public loginWithEmail(email: string, password: string): Observable<void> {
    this.appStateService.startLoading();
    const url = new URL(this.config.loginURL);
    return this.http
      .post<LoginDTO>(url.toString(), {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap(
          (result) => {
            this.storage.setItem('uid', result.localId);
            this.storage.setItem('email', result.email);
            this.storage.setItem('idToken', result.idToken);
            this.storage.setItem('refreshToken', result.refreshToken);
            this.router.navigateByUrl('');
          },
          (error) => {
            console.log(error);
            this.appStateService.stopLoading();
          },
        ),
        switchMap(() =>
          this.usersService.isUserAdmin().pipe(
            first(),
            tap((isUserAdmin) =>
              this.storage.setItem('isAdmin', '' + !!isUserAdmin),
            ),
          ),
        ),
        switchMap(() => EMPTY),
      );
  }

  /**
   * Request for token refreshing
   */
  public refreshToken(): Observable<void> {
    this.appStateService.startLoading();
    const url = new URL(this.config.refreshTokenURL);
    return this.http
      .post(url.toString(), {
        grant_type: 'refresh_token',
        refresh_token: this.storage.getItem('refreshToken'),
      })
      .pipe(
        tap((result) => {
          this.storage.setItem('idToken', result['id_token']);
          this.storage.setItem('refreshToken', result['refresh_token']);
        }),
        mapTo(null),
      );
  }
}
