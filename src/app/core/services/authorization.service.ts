import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from './dto/login.model';
import { first } from 'rxjs/operators';
import { AppStateService } from './app-state.service';
import { Router } from '@angular/router';

const LOGIN_URL =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';
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
  public loginWithEmail(email: string, password: string): void {
    this.appStateService.setLoading();
    const url = new URL(`${LOGIN_URL}${API_KEY}`);
    this.http
      .post<LoginDTO>(url.toString(), {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(first())
      .subscribe(
        (result) => {
          this.appStateService.idToken = result.idToken;
          this.router.navigateByUrl('');
        },
        (error) => {
          console.log(error);
          this.appStateService.unsetLoading();
        }
      );
  }
  // TODO: make the refreshing of token
}
