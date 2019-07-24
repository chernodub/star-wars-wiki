import { Observable } from 'rxjs';

/** Model for describing a tab in the film description page */
export interface AdditionalInfo {
  /** Tab title */
  title: string;
  /** Observable with data with name field */
  data$: Observable<
    {
      /** Name */
      name: string;
    }[]
  >;
  /** Router link */
  routerLink: string;
}
