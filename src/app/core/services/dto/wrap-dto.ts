import { FilmDTO } from './film-dto';

/**
 * Used to define data from server
 */
export interface WrapDTO<T extends FilmDTO> {
  /** primary key */
  pk: number;
  /** model */
  model: string;
  /** the fields itself (Film, Person, etc.) */
  fields: T;
}
