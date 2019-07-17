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
  apiKey = 'AIzaSyD95xTCEn5PZT5G2SuGG_p5wL8-z8y6bS4';

  /**
   * Login URL
   */
  loginUrl =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';

  /**
   * API URL
   */
  apiUrl = 'https://starwarswiki.firebaseio.com';

  /**
   * URL for getting films table
   */
  filmsUrl = this.apiUrl + '/swapi/films.json';
}
