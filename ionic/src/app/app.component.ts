import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import { first, map, mergeMap } from 'rxjs/operators';

import { USER } from './services/app-config';
import { AuthorizationService } from './services/authorization.service';

/** App */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  /** Username */
  public username$: Observable<string>;

  /** App pages */
  public appPages = [
    {
      title: 'Films',
      url: '/films',
      icon: 'home',
    },
    {
      title: 'Characters',
      url: '/characters',
      icon: 'list',
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    private authService: AuthorizationService,
    private menu: MenuController,
    private faio: FingerprintAIO,
  ) {
    this.initializeApp();
    this.username$ = this.router.events.pipe(
      mergeMap(() => from(this.storage.get(USER))),
      map(user => (user ? user.email : '')),
    );
  }

  /** Initialize app */
  public initializeApp(): void {
    this.platform
      .ready()
      .then(() => {
        this.statusBar.styleLightContent();
        this.splashScreen.hide();
        return this.storage.get(USER);
      })
      .then(user => {
        if (!user) {
          return Promise.reject();
        }
        return this.faio
          .show({
            clientId: 'StarWars',
            clientSecret: 'dimas-fucker',
            disableBackup: true,
            localizedFallbackTitle: 'Use Pin',
            localizedReason: 'Please authenticate',
          })
          .then(result => {
            console.log(result);
            this.router.navigate(['films']);
          });
      })
      .catch(() => this.logOut());
  }

  /** Log out  */
  public logOut(): void {
    this.authService
      .logOut()
      .pipe(first())
      .subscribe(() => this.menu.close());
  }
}
