import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import {
  switchMapTo,
  first,
  tap,
  map,
  mergeMapTo,
  mergeMap,
} from 'rxjs/operators';

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
  ) {
    this.initializeApp();
    this.username$ = this.router.events.pipe(
      mergeMap(() => from(this.storage.get(USER))),
      map(user => (user ? user.email : '')),
    );
  }

  /** Initialize app */
  public initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /** Log out  */
  public logOut(): void {
    this.authService
      .logOut()
      .pipe(first())
      .subscribe(() => this.menu.close());
  }
}
