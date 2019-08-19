import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Character } from '../models/character';
import { Film } from '../models/film';

import { CharactersService } from './api/characters.service';
import { FilmsService } from './api/films.service';

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
  ) {}

  /**
   * Get films from storage if they are cached
   * or get them from API
   */
  public getFilms(): Observable<Film[]> {
    return from(
      this.storage.get(FILMS).then(storageFilms => {
        if (storageFilms) {
          return storageFilms;
        } else {
          return this.filmsService
            .getFilms()
            .pipe(
              map(films => {
                const sortedFilms = films.sort(
                  (a, b) => a.episodeId - b.episodeId,
                );
                this.storage.set(FILMS, sortedFilms);
                return sortedFilms;
              }),
            )
            .toPromise();
        }
      }),
    );
  }

  /** Get characters */
  public getCharacters(): Observable<Character[]> {
    return from(
      this.storage.get(CHARACTERS).then(storageCharacters => {
        if (storageCharacters) {
          return storageCharacters;
        } else {
          return this.charactersService.getCharacters().toPromise();
        }
      }),
    );
  }
}
