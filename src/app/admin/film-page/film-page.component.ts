import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';

import { FilmDescriptionComponent } from '../../client/main-page/film-description/film-description.component';
import { Film } from '../../core/models/film';

/** Page for editing film */
@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.css'],
})
export class FilmPageComponent extends FilmDescriptionComponent {
  /** Is editing template activated */
  public isEditing: boolean;

  /** Copy of film (needed for cancel editing and restoring default data) */
  public filmCopy: Film;

  /** Activate editing of film */
  public startEditing(initialFilm: Film): void {
    this.filmCopy = new Film(initialFilm, initialFilm.number);
    this.toggleEditing(true);
  }

  /** Stops editing */
  public stopEditing(film: Film): void {
    this.toggleEditing(false);
    Object.assign(film, this.filmCopy);
  }
  private toggleEditing = (value: boolean) => (this.isEditing = value);

  /** Saves new film data */
  public save(film: Film): void {
    this.toggleEditing(false);
    this.filmsService
      .saveFilm(film)
      .pipe(tap(() => this.appStateService.stopLoading()))
      .subscribe();
  }
}
