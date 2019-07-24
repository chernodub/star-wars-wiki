import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Character } from '../models/character';
import { Film } from '../models/film';
import { Planet } from '../models/planet';

import { AppConfig } from './app-config';
import { AppStateService } from './app-state.service';
import { CharacterDTO } from './dto/character-dto';
import { FilmDTO } from './dto/film-dto';
import { PlanetDTO } from './dto/planet-dto';

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

  private mapFilm(film: FilmDTO, idx: number): Film {
    return new Film(
      {
        name: film.title,
        director: film.director,
        description: film.opening_crawl,
        episodeId: film.episode_id,
        releaseDate: new Date(film.release_date),
        producedBy: film.producer,
        characters: film.characters,
        starships: film.starships,
        vehicles: film.vehicles,
        species: film.species,
        planets: film.planets,
      },
      idx,
    );
  }
  /**
   * Used to get Film[]
   */
  public getFilms(): Observable<Film[]> {
    this.appStateService.startLoading();
    return this.http
      .get<FilmDTO[]>(this.config.filmsURL + '.json')
      .pipe(map((filmsDto) => filmsDto.map(this.mapFilm)));
  }

  /**
   * Returns film by id
   * @param id number of episode
   */
  public getFilmById(id: number): Observable<Film> {
    this.appStateService.startLoading();
    return this.http
      .get<FilmDTO>(`${this.config.filmsURL}/${id}.json`)
      .pipe(map(this.mapFilm));
  }

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

  private mapPlanet(planet: PlanetDTO, idx: number): Planet {
    return new Planet(
      {
        climate: planet.climate,
        population: planet.population,
        diameter: planet.diameter,
        gravity: planet.gravity,
        name: planet.name,
        orbital_period: planet.orbital_period,
        rotation_period: planet.rotation_period,
        surface_water: planet.surface_water,
        terrain: planet.terrain,
      },
      idx,
    );
  }

  /**
   * Gets all characters by their ids
   * @param ids Indexes of characters in db
   */
  public getPlanets(ids: number[]): Observable<Planet[]> {
    this.appStateService.startLoading();

    return this.http.get<PlanetDTO[]>(`${this.config.planetURL}.json`).pipe(
      map((result) => {
        const planets = result.map(this.mapPlanet);
        if (!ids.length) {
          return planets;
        }
        return planets.filter((planet) => planet.number in ids);
      }),
    );
  }

  /**
   * Get planet by id
   */
  public getPlanetById(id: number): Observable<Planet> {
    this.appStateService.startLoading();
    return this.http
      .get<PlanetDTO>(`${this.config.planetURL}/${id}.json`)
      .pipe(map(this.mapPlanet));
  }
}
