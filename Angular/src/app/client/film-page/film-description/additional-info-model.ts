import { Observable } from 'rxjs';

import { ObjectWithName } from './object-with-name-model';

/** Model for describing a tab in the film description page */
export interface AdditionalInfo {
  /** Tab title */
  title: string;
  /** Observable with data with name field */
  data$: Observable<ObjectWithName[]>;
  /** Router link */
  routerLink: string;
}
