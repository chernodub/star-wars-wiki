import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable, EMPTY, from } from 'rxjs';
import { tap, mapTo, first, switchMap } from 'rxjs/operators';

import { User } from '../models/user';

import { AppConfig, USER } from './app-config';
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
    private config: AppConfig,
    private router: Router,
    private storage: Storage,
  ) {}

  private mapUser(user: LoginDTO): User {
    return new User({
      displayName: user.email,
      email: user.email,
      idToken: user.idToken,
      refreshToken: user.refreshToken,
    });
  }
  /**
   * loginWithEmail
   * Gets the authorization token from the server
   */
  public loginWithEmail(email: string, password: string): Observable<void> {
    const url = new URL(this.config.loginURL);
    return this.http
      .post<LoginDTO>(url.toString(), {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        switchMap(result => {
          const user = this.mapUser(result);
          return from(
            this.storage.set(USER, {
              localId: user.localId,
              email: user.email,
              idToken: user.idToken,
              refreshToken: user.refreshToken,
            }),
          );
        }),
        tap(
          () => this.router.navigateByUrl(''),
          error => {
            console.log(error);
          },
        ),
        switchMap(() => EMPTY),
      );
  }

  /**
   * Request for token refreshing
   */
  public refreshToken(): Observable<void> {
    const url = new URL(this.config.refreshTokenURL);
    return from(this.storage.get(USER)).pipe(
      switchMap((user: User) =>
        this.http
          .post(url.toString(), {
            grant_type: 'refresh_token',
            refresh_token: user.refreshToken,
          })
          .pipe(
            tap(result => {
              this.storage.set(USER, {
                ...user,
                idToken: result['id_token'],
                refreshToken: result['refresh_token'],
              });
            }),
            mapTo(null),
          ),
      ),
    );
  }

  /** Log out */
  public logOut(): Observable<void> {
    return from(this.storage.set(USER, null)).pipe(
      tap(() => this.router.navigate(['login'])),
    );
  }
}
