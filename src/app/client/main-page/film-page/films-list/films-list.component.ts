import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Film } from '../../../../core/models/film';
import { AppStateService } from '../../../../core/services/app-state.service';
import { FilmsService } from '../../../../core/services/films.service';

/**
 * List of films
 */
@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css'],
})
export class FilmsListComponent {
  /**
   * table data
   */
  public films$: Observable<Film[]>;
  public constructor(
    private filmsService: FilmsService,
    private appStateService: AppStateService,
  ) {
    this.films$ = this.filmsService
      .getFilms()
      .pipe(tap(() => this.appStateService.stopLoading()));
  }

  /**
   * Opens the window with film description
   */
  public open(): void {
    this.appStateService.startLoading();
  }
}
