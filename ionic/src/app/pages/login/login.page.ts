import { Component } from '@angular/core';

import { AuthorizationService } from '../../services/authorization.service';

/**
 * Login page
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class LoginPage {
  /** Email field value */
  public email: string;

  /** Password field value */
  public password: string;

  constructor(private authService: AuthorizationService) {}

  /** Login event */
  public onSubmit(event: Event): void {
    event.preventDefault();
    this.authService.loginWithEmail(this.email, this.password).subscribe();
  }
}
