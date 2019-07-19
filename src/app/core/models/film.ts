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
  episodeId: number;

  /** Number in db */
  number: number;

  public constructor(film: Partial<Film>, idx?: number) {
    this.name = film.name;
    this.director = film.director;
    this.description = film.description;
    this.episodeId = film.episodeId;
    this.releaseDate = film.releaseDate;
    this.created = film.created;
    this.edited = film.edited;
    this.number = idx;
  }
}
