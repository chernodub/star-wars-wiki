import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

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
export class LoginPage implements OnInit, OnDestroy {
  /** Email field value */
  public email;

  /** Password field value */
  public password;

  /** Exit button subscription */
  private exitButtonSubscription$: Subscription;

  private isExitButtonClickedOnce: boolean;

  private readonly exitButtonEventTimeout = 1000;

  constructor(
    private authService: AuthorizationService,
    private platform: Platform,
    private toastController: ToastController,
  ) {
    this.authService.tryFingerprintAuth();
  }

  /** Login event */
  public onSubmit(event: Event): void {
    event.preventDefault();
    this.authService.loginWithEmail(this.email, this.password).subscribe();
  }
  /** @inheritdoc */
  public ngOnInit(): void {
    this.exitButtonSubscription$ = this.platform.backButton.subscribe(() => {
      if (this.isExitButtonClickedOnce) {
        navigator['app'].exitApp();
      } else {
        this.isExitButtonClickedOnce = true;
        this.toastController
          .create({
            message: 'Tap to back button again to exit app',
            duration: this.exitButtonEventTimeout,
          })
          .then(toast => toast.present());
        setTimeout(
          () => (this.isExitButtonClickedOnce = false),
          this.exitButtonEventTimeout,
        );
      }
    });
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.exitButtonSubscription$.unsubscribe();
  }
}
