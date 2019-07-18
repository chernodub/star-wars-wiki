import { FilmDTO } from '../services/dto/film-dto';

/**
 * Model for Film
 */
export class Film {
  /** name */
  name: string;
  /** director */
  director: string;
  /** short description*/
  description: string;

  /** release date */
  releaseDate: Date;

  /** edited */
  edited: Date;

  /** release date */
  created: Date;

  /** id */
  id: number;
  public constructor(film: FilmDTO) {
    this.name = film.title;
    this.director = film.director;
    this.description = film.opening_crawl;
    this.id = film.episode_id;
    this.releaseDate = new Date(film.release_date);
    this.created = new Date(film.created);
    this.edited = new Date(film.edited);
  }
}
