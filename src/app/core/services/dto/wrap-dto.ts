/**
 * Used to define data from server
 */
export class WrapDTO<T> {
  /** primary key */
  pk: number;
  /** model */
  model: string;
  /** the fields itself (Film, Person, etc.) */
  fields: T;
}
