// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// Import 'zone.js/dist/zone-error';  // Included with Angular CLI.
import { Injectable } from '@angular/core';

/**
 * Application configurations
 */
@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  /**
   * APP KEY for api
   */
  private apiKey = 'AIzaSyD95xTCEn5PZT5G2SuGG_p5wL8-z8y6bS4';

  /**
   * API URL
   */
  public apiUrl = 'https://starwarswiki.firebaseio.com/';

  /**
   * URL for getting films table
   */
  get filmsURL(): string {
    return this.apiUrl + 'swapi/films';
  }

  /** URL for refreshing an id token */
  get refreshTokenURL(): string {
    return 'https://securetoken.googleapis.com/v1/token?key=' + this.apiKey;
  }
  /**
   * Login URL
   */
  get loginURL(): string {
    return (
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
      this.apiKey
    );
  }
}
