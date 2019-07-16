import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  // TODO: remove default credentials
  form = {
    email: 'test@test.com',
    password: '123456'
  };
  constructor(private authorizationService: AuthorizationService) {}

  ngOnInit(): void {}

  /**
   * Trying to authorize with email and password
   */
  login(): void {
    this.authorizationService.loginWithEmail(
      this.form.email,
      this.form.password
    );
  }
}
