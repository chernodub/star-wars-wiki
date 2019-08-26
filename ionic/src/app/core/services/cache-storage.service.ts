import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from, of } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

import { Character } from '../models/character';
import { Film } from '../models/film';

import { CharactersService } from './api/characters.service';
import { FilmsService } from './api/films.service';
import { LoadingService } from './loading.service';

const FILMS = 'films';
const CHARACTERS = 'characters';

/** Service is used for cache all the data from API */
@Injectable({
  providedIn: 'root',
})
export class CacheStorageService {
  constructor(
    private storage: Storage,
    private filmsService: FilmsService,
    private charactersService: CharactersService,
    private loadingService: LoadingService,
  ) {}

  /**
   * Get films from storage if they are cached
   * or get them from API
   */
  public getFilms(refresh?: boolean): Observable<Film[]> {
    return from(this.storage.get(FILMS)).pipe(
      switchMap((storageFilms: Film[]) => {
        if (storageFilms && !refresh) {
          return of(storageFilms);
        }
        if (!refresh) {
          this.loadingService.startLoading('Getting films...');
        }
        return this.filmsService.getFilms().pipe(
          map(films => {
            const sortedFilms = films.sort((a, b) => a.episodeId - b.episodeId);
            this.storage.set(FILMS, sortedFilms);
            this.loadingService.stopLoading();
            return sortedFilms;
          }),
        );
      }),
    );
  }

  /** Get characters */
  public getCharacters(
    ids?: number[],
    refresh?: boolean,
  ): Observable<Character[]> {
    return from(this.storage.get(CHARACTERS)).pipe(
      switchMap((storageCharacters: Character[]) => {
        if (storageCharacters && !refresh) {
          return of(storageCharacters);
        }

        if (!refresh) {
          this.loadingService.startLoading('Getting characters...');
        }
        return this.charactersService.getCharacters().pipe(
          map(characters => {
            this.storage.set(CHARACTERS, characters);
            if (!ids || !ids.length) {
              return characters;
            }
            this.loadingService.stopLoading();
            return characters.filter(character =>
              ids.includes(character.number),
            );
          }),
        );
      }),
    );
  }
}
