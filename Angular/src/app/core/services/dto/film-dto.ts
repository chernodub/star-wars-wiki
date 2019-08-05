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
   * id of episode
   */
  episode_id: number;
  /**
   * description
   */
  opening_crawl: string;
  /**
   * planets ids
   */
  planets: number[];
  /**
   * producer
   */
  producer: string;
  /**
   * date of release
   */
  release_date: string;
  /**
   * species ids
   */
  species: number[];
  /**
   * starships ids
   */
  starships: number[];
  /**
   * name of film
   */
  title: string;
  /**
   * vehicle ids
   */
  vehicles: number[];
}
