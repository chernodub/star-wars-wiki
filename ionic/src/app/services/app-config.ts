import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

export const STORAGE_USER_KEY = 'user';
/**
 * Application configurations
 */
@Injectable({
  providedIn: 'root',
})
export class AppConfig {
  /**
   * API URL
   */
  public apiUrl = environment.apiUrl;

  /**
   * Login URL
   */
  public loginURL =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
    environment.apiKey;
  /** URL for refreshing an id token */

  public refreshTokenURL =
    'https://securetoken.googleapis.com/v1/token?key=' + environment.apiKey;
  /**
   * URL for getting films table
   */
  public filmsURL = this.apiUrl + 'swapi/films';
  /** URL for getting characters */
  public charactersURL = this.apiUrl + 'swapi/people';

  /** URL for getting planets */
  public planetURL = this.apiUrl + 'swapi/planets';

  /** URL for checking user */
  public usersURL = this.apiUrl + 'special_users';
}
