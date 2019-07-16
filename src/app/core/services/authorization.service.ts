import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { first } from 'rxjs/operators';
import { AppStateService } from './app-state.service';
import { Router } from '@angular/router';

const LOGIN_URL =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';
const REGISTER_URL =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=';
const API_KEY = 'AIzaSyD95xTCEn5PZT5G2SuGG_p5wL8-z8y6bS4';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor(
    private http: HttpClient,
    private appStateService: AppStateService,
    private router: Router
  ) {}
  /**
   * loginWithEmail
   * Gets the authorization token from the server
   */
  public loginWithEmail(email: string, password: string): Observable<Login> {
    this.appStateService.setLoading();
    const observable = this.http.post<Login>(`${LOGIN_URL}${API_KEY}`, {
      email: email,
      password: password
    });
    observable.pipe(first()).subscribe(
      (result) => {
        this.appStateService.idToken = result.idToken;
        this.appStateService.unsetLoading();
        this.router.navigateByUrl('');
      },
      (error) => {
        console.log(error);

        this.appStateService.unsetLoading();
      }
    );
    return observable;
  }
}
