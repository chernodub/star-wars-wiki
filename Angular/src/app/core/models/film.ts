/**
 * Model for Film
 */
export class Film {
  /** Name */
  public name: string;
  /** Director */
  public director: string;
  /** Short description*/
  public description: string;

  /** Release date */
  public releaseDate: Date;

  /** Id */
  public episodeId: number;

  /** Number in db */
  public number: number;

  /** Name of producer */
  public producedBy: string;

  /** Characters */
  public characters: number[];

  /** Planets */
  public planets: number[];

  /** Vehicles */
  public vehicles: number[];

  /** Starships */
  public starships: number[];

  /** Species */
  public species: number[];

  public constructor(film: Partial<Film>, idx?: number) {
    this.name = film.name;
    this.director = film.director;
    this.description = film.description;
    this.episodeId = film.episodeId;
    this.releaseDate = film.releaseDate;
    this.producedBy = film.producedBy;
    this.characters = film.characters;
    this.planets = film.planets;
    this.vehicles = film.vehicles;
    this.starships = film.starships;
    this.species = film.species;
    this.number = idx;
  }
}
