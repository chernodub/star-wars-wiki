import { Component } from '@angular/core';
import { AuthorizationService } from '../../core/services/authorization.service';

/**
 * Login form
 */
@Component({
  selector: 'app-login-window',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  // TODO: remove default credentials
  /**
   * Email field value
   */
  email = 'test@test.com';
  /**
   * Password field value
   */
  password = '123456';

  constructor(private authorizationService: AuthorizationService) {}

  /**
   * Trying to authorize with email and password
   */
  login(): void {
    this.authorizationService
      .loginWithEmail(this.email, this.password)
      .subscribe();
  }
}
