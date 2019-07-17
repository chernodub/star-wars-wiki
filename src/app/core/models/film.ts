import { FilmDTO } from '../services/dto/film';

/**
 * Model for Film
 */
export class Film {
  /**
   * name
   */
  name: string;
  /**
   * director
   */
  director: string;
  /**
   * short description
   */
  description: string;
  constructor(film: FilmDTO) {
    this.name = film.title;
    this.director = film.director;
    this.description = film.opening_crawl;
  }
}
