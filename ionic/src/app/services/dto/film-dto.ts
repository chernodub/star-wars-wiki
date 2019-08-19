/**
 * DTO model for film
 */
export interface FilmDTO {
  /**
   * Characters
   */
  characters: number[];

  /**
   * Date of creation
   */
  created: string;
  /**
   * Director
   */
  director: string;
  /**
   * Date of edition
   */
  edited: string;
  /**
   * Id of episode
   */
  episode_id: number;
  /**
   * Description
   */
  opening_crawl: string;
  /**
   * Planets ids
   */
  planets: number[];
  /**
   * Producer
   */
  producer: string;
  /**
   * Date of release
   */
  release_date: string;
  /**
   * Species ids
   */
  species: number[];
  /**
   * Starships ids
   */
  starships: number[];
  /**
   * Name of film
   */
  title: string;
  /**
   * Vehicle ids
   */
  vehicles: number[];

  /** Image url */
  image_url: string;
}
