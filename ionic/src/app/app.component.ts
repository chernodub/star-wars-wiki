import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

/** App */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
    {
      title: 'List',
      url: '/list',
      icon: 'list',
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  /** Initialize app */
  public initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
