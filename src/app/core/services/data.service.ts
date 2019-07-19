import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, OperatorFunction } from 'rxjs';
import { catchError, concatMapTo, map, switchMapTo, tap } from 'rxjs/operators';
import { AppConfig } from '../../../environments/environment';
import { Film } from '../models/film';
import { AppStateService } from './app-state.service';
import { AuthorizationService } from './authorization.service';
import { FilmDTO } from './dto/film-dto';
import { WrapDTO } from './dto/wrap-dto';

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
    private authorizationService: AuthorizationService,
    private appStateService: AppStateService
  ) {}

  /**
   * Retries request if there is a expired token
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
          .pipe(concatMapTo(buildObservable()));
      }

      return EMPTY;
    });
  }

  /**
   * Used to get Film[]
   */
  public getFilms(): Observable<Film[]> {
    return this.http
      .get<WrapDTO<FilmDTO>[]>(this.config.filmsURL + '.json', {
        params: this.getDefaultParams()
      })
      .pipe(
        tap(() => this.appStateService.startLoading()),
        map((dataWrapArray) =>
          dataWrapArray.map(
            (film, idx) =>
              new Film(
                {
                  name: film.fields.title,
                  director: film.fields.director,
                  description: film.fields.opening_crawl,
                  episodeId: film.fields.episode_id,
                  releaseDate: new Date(film.fields.release_date),
                  created: new Date(film.fields.created),
                  edited: new Date(film.fields.edited),
                  producedBy: film.fields.producer
                },
                idx
              )
          )
        ),
        this.handleExpiredToken(this.getFilms)
      );
  }

  /**
   * Returns film by id
   * @param id number of episode
   */
  public getFilmById(id: number): Observable<Film> {
    return this.http
      .get<WrapDTO<FilmDTO>>(`${this.config.filmsURL}/${id}.json`, {
        params: this.getDefaultParams()
      })
      .pipe(
        tap(() => this.appStateService.startLoading()),
        map((result) => {
          if (result.fields) {
            const film = result.fields;
            return new Film(
              {
                name: film.title,
                director: film.director,
                description: film.opening_crawl,
                episodeId: film.episode_id,
                releaseDate: new Date(film.release_date),
                created: new Date(film.created),
                edited: new Date(film.edited),
                producedBy: film.producer
              },
              id
            );
          }
          return null;
        }),
        this.handleExpiredToken(() => this.getFilmById(id))
      );
  }

  /**
   * Interceptor for auth key
   */
  private getDefaultParams(): HttpParams {
    return new HttpParams().set('auth', localStorage.idToken);
  }
}
