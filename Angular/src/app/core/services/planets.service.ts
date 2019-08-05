import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, find, findIndex } from 'rxjs/operators';

import { Planet } from '../models/planet';

import { AppConfig } from './app-config';
import { AppStateService } from './app-state.service';
import { PlanetDTO } from './dto/planet-dto';

/**
 * Planets service
 */
@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  public constructor(
    private http: HttpClient,
    private config: AppConfig,
    private appStateService: AppStateService,
  ) {}

  private mapPlanet(planet: PlanetDTO, idx: number): Planet {
    return new Planet(
      {
        climate: planet.climate,
        population: planet.population,
        diameter: planet.diameter,
        gravity: planet.gravity,
        name: planet.name,
        orbitalPeriod: planet.orbital_period,
        rotationPeriod: planet.rotation_period,
        surfaceWater: planet.surface_water,
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
        return planets.filter(
          (planet) => ids.findIndex((id) => id === planet.number) + 1,
        );
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
