import { Observable } from 'rxjs';

/**
 * Used to describe any object with name field
 */
export interface ObjectWithName {
  /** Name */
  name: string;

  /** Number */
  number: number;
}
/** Model for describing a tab in the film description page */
export interface AdditionalInfo {
  /** Tab title */
  title: string;
  /** Observable with data with name field */
  data$: Observable<ObjectWithName[]>;
  /** Router link */
  routerLink: string;
}
