import { Component } from '@angular/core';
import { AuthorizationService } from '../../core/services/authorization.service';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.css']
})
export class LoginWindowComponent {
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
    this.authorizationService.loginWithEmail(this.email, this.password);
  }
}
