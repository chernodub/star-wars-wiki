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

  /** Copy of film (needed for cancel editing) */
  public filmCopy: Film = new Film({});

  /** Activate editing of film */
  public startEditing(initialFilm: Film): void {
    this.filmCopy = new Film(initialFilm, initialFilm.number);
    this.toggleEditing();
  }

  /** Stops editing */
  public stopEditing(): Film {
    this.toggleEditing();
    return new Film(this.filmCopy, this.filmCopy.number);
  }
  private toggleEditing = () => (this.isEditing = !this.isEditing);

  /** Saves new film data */
  public save(film: Film): void {
    this.toggleEditing();
    this.filmsService
      .saveFilm(film)
      .pipe(tap(() => this.appStateService.stopLoading()))
      .subscribe();
  }
}
