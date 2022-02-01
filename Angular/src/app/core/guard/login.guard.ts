import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';

import { AppStateService } from '../services/app-state.service';
import { BrowserStorageService } from '../services/browser-storage.service';

/** Checks whether a user can open the login window */
@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanLoad {
  public constructor(
    private router: Router,
    private appStateService: AppStateService,
    private storage: BrowserStorageService,
  ) {}
  /**
   * @inheritdoc
   */
  public canLoad(): boolean {
    this.appStateService.stopLoading();
    if (this.storage.getItem('idToken')) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
