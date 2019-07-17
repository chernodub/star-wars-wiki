import { FilmDTO } from '../services/dto/film.model';

export class Film {
  name: string;
  director: string;
  description: string;
  constructor(film: FilmDTO) {
    this.name = film.title;
    this.director = film.director;
    this.description = film.opening_crawl;
  }
}
