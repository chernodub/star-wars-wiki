import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import { STORAGE_USER_KEY } from './services/app-config';
import { AuthorizationService } from './services/authorization.service';

/** App */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  /** Username */
  public username$: Subject<string>;

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
    private storage: Storage,
    private authService: AuthorizationService,
    private menu: MenuController,
  ) {
    this.initializeApp();
    this.username$ = this.authService.username$;
  }

  /** Initialize app */
  public initializeApp(): void {
    this.platform
      .ready()
      .then(() => {
        this.statusBar.styleLightContent();
        this.splashScreen.hide();
        return this.storage.get(STORAGE_USER_KEY);
      })
      .then(() => this.menu.close());
  }

  /** Log out  */
  public logOut(): void {
    this.authService
      .logOut()
      .pipe(first())
      .subscribe(() => this.menu.close());
  }
}
