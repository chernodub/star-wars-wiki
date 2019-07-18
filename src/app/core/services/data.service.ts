import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Film } from '../models/film';
import { Observable, empty } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { AppConfig } from '../../../environments/environment';
import { WrapDTO } from './dto/wrap-dto';
import { FilmDTO } from './dto/film-dto';

/**
 * Used to get data about films and other things
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {
  public constructor(
    private http: HttpClient,
    private config: AppConfig,
    private authorizationService: AuthorizationService
  ) {}

  /**
   * Used to get Film[]
   */
  getFilms(): Observable<Film[]> {
    const url = new URL(this.config.filmsUrl);
    url.searchParams.append('auth', localStorage.idToken);
    const $ = this.http.get<WrapDTO<FilmDTO>[]>(url.toString()).pipe(
      map((dataWrapArray) => dataWrapArray.map((row) => new Film(row.fields))),
      catchError((error) => {
        // TODO: find out what is the status code of token expiration and the fix this thing here
        if (error.status === 401 && error.statusText !== 'Unauthorized') {
          this.authorizationService.refreshToken().subscribe();
          return $;
        }
        return empty();
      })
    );
    return $;
  }
}
