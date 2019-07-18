import { FilmDTO } from '../services/dto/film-dto';

/**
 * Model for Film
 */
export class Film {
  /** Name */
  name: string;
  /** Director */
  director: string;
  /** Short description*/
  description: string;

  /** Release date */
  releaseDate: Date;

  /** Edited */
  edited: Date;

  /** Release date */
  created: Date;

  /** Id */
  episode_id: number;

  /** Number in db */
  number: number;

  public constructor(film: Partial<Film>, idx?: number) {
    this.name = film.name;
    this.director = film.director;
    this.description = film.description;
    this.episode_id = film.episode_id;
    this.releaseDate = film.releaseDate;
    this.created = film.created;
    this.edited = film.edited;
    this.number = idx;
  }
}
