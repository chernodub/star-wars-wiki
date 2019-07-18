import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, switchMapTo, retry } from 'rxjs/operators';
import { Film } from '../models/film';
import { Observable, EMPTY, OperatorFunction, throwError, of } from 'rxjs';
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
   * retries request if there is a expired token
   * @param buildObservable function that builds proper observable to retry request with refreshing of token
   */
  public handleExpiredToken<T>(
    buildObservable: () => Observable<T>
  ): OperatorFunction<T, T> {
    return catchError((error) => {
      // TODO: find out what is the status code of token expiration and the fix this thing here
      if (
        error.status === 401 &&
        error.error.error === 'Auth token is expired'
      ) {
        return this.authorizationService
          .refreshToken()
          .pipe(switchMapTo(buildObservable()));
      }

      return EMPTY;
    });
  }

  /**
   * Used to get Film[]
   */
  public getFilms(): Observable<Film[]> {
    const url = new URL(this.config.filmsURL + '.json');
    url.searchParams.append('auth', localStorage.idToken);
    const buildObservable = (): Observable<Film[]> => {
      return this.http.get<WrapDTO<FilmDTO>[]>(url.toString()).pipe(
        map((dataWrapArray) =>
          dataWrapArray.map(
            (row, idx) =>
              new Film(
                {
                  name: row.fields.title,
                  director: row.fields.director,
                  description: row.fields.opening_crawl,
                  episode_id: row.fields.episode_id,
                  releaseDate: new Date(row.fields.release_date),
                  created: new Date(row.fields.created),
                  edited: new Date(row.fields.edited)
                },
                idx
              )
          )
        ),
        this.handleExpiredToken(buildObservable)
      );
    };
    return buildObservable();
  }

  /**
   * Returns film by id
   * @param id number of episode
   */
  public getFilmById(id: number): Observable<Film> {
    const url = new URL(`${this.config.filmsURL}/${id}.json`);
    url.searchParams.append('auth', localStorage.idToken);
    const buildObservable = (): Observable<Film> => {
      return this.http.get<WrapDTO<FilmDTO>>(url.toString()).pipe(
        map((result) => {
          if (result.fields) {
            const film = result.fields;
            return new Film({
              name: film.title,
              director: film.director,
              description: film.opening_crawl,
              episode_id: film.episode_id,
              releaseDate: new Date(film.release_date),
              created: new Date(film.created),
              edited: new Date(film.edited)
            });
          }
          return null;
        }),
        this.handleExpiredToken(buildObservable)
      );
    };
    return buildObservable();
  }
}
