import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Character } from '../../models/character';
import { AppConfig } from '../app-config';
import { CharacterDTO } from '../dto/character-dto';

/**
 * Characters service
 */
@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private http: HttpClient, private config: AppConfig) {}

  private mapCharacter(character: CharacterDTO, idx: number): Character {
    return new Character(
      {
        birthYear: character.birth_year,
        eyeColor: character.eye_color,
        gender: character.gender,
        height: character.height,
        homeworldId: character.homeworld,
        mass: character.mass,
        name: character.name,
        skinColor: character.skin_color,
      },
      idx,
    );
  }
  /**
   * Gets all characters by their ids
   * @param ids Indexes of characters in db
   */
  public getCharacters(ids?: number[]): Observable<Character[]> {
    return this.http
      .get<CharacterDTO[]>(`${this.config.charactersURL}.json`)
      .pipe(
        map(result => {
          const characters = result.map(this.mapCharacter);
          if (!ids || !ids.length) {
            return characters;
          }
          return characters.filter(
            character => ids.findIndex(id => id === character.number) + 1,
          );
        }),
      );
  }

  /**
   * getCharacterById
   */
  public getCharacterById(id: number): Observable<Character> {
    return this.http
      .get<CharacterDTO>(`${this.config.charactersURL}/${id}.json`)
      .pipe(map(this.mapCharacter));
  }
}
