import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Character } from '../models/character';

import { AppConfig } from './app-config';
import { AppStateService } from './app-state.service';
import { CharacterDTO } from './dto/character-dto';

/**
 * Characters service
 */
@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(
    private http: HttpClient,
    private config: AppConfig,
    private appStateService: AppStateService,
  ) {}

  private mapCharacter(char: CharacterDTO, idx: number): Character {
    return new Character(
      {
        birthYear: char.birth_year,
        eyeColor: char.eye_color,
        gender: char.gender,
        height: char.height,
        homeworldId: char.homeworld,
        mass: char.mass,
        name: char.name,
        skinColor: char.skin_color,
      },
      idx,
    );
  }
  /**
   * Gets all characters by their ids
   * @param ids Indexes of characters in db
   */
  public getCharacters(ids: number[]): Observable<Character[]> {
    this.appStateService.startLoading();

    return this.http
      .get<CharacterDTO[]>(`${this.config.charactersURL}.json`)
      .pipe(
        map((result) => {
          const chars = result.map(this.mapCharacter);
          if (!ids.length) {
            return chars;
          }
          return chars.filter((char) => char.number in ids);
        }),
      );
  }

  /**
   * getCharacterById
   */
  public getCharacterById(id: number): Observable<Character> {
    this.appStateService.startLoading();
    return this.http
      .get<CharacterDTO>(`${this.config.charactersURL}/${id}.json`)
      .pipe(map(this.mapCharacter));
  }
}
