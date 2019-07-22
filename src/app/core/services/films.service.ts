import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AppConfig } from '../../../environments/environment';
import { Film } from '../models/film';

import { AppStateService } from './app-state.service';
import { FilmDTO } from './dto/film-dto';
import { WrapDTO } from './dto/wrap-dto';

/**
 * Used to get data about films and other things
 */
@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  public constructor(
    private http: HttpClient,
    private config: AppConfig,
    private appStateService: AppStateService,
  ) {}

  /**
   * Used to get Film[]
   */
  public getFilms(): Observable<Film[]> {
    return this.http
      .get<WrapDTO<FilmDTO>[]>(this.config.filmsURL + '.json')
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
                  producedBy: film.fields.producer,
                },
                idx,
              ),
          ),
        ),
      );
  }

  /**
   * Returns film by id
   * @param id number of episode
   */
  public getFilmById(id: number): Observable<Film> {
    return this.http
      .get<WrapDTO<FilmDTO>>(`${this.config.filmsURL}/${id}.json`)
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
                producedBy: film.producer,
              },
              id,
            );
          }
          return null;
        }),
      );
  }
}
