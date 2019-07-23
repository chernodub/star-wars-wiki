import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { tap, skip } from 'rxjs/operators';

import { Character } from '../../../../core/models/character';
import { Film } from '../../../../core/models/film';
import { AppStateService } from '../../../../core/services/app-state.service';
import { FilmsService } from '../../../../core/services/films.service';

/**
 * Film description page
 */
@Component({
  selector: 'app-film-description',
  templateUrl: './film-description.component.html',
  styleUrls: ['./film-description.component.css'],
})
export class FilmDescriptionComponent {
  /**
   * Film to render on description page
   */
  public film$: Observable<Film>;

  /**
   * Used in template for render the several tabs with the list of additional info items
   */
  public additionalInfoArray: {
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
  }[] = [];

  public constructor(
    private filmsService: FilmsService,
    private route: ActivatedRoute,
    private appStateService: AppStateService,
  ) {
    this.film$ = this.filmsService
      .getFilmById(+this.route.snapshot.paramMap.get('id'))
      .pipe(
        tap((film) => {
          this.appStateService.stopLoading();
          this.additionalInfoArray.push({
            title: 'Characters',
            data$: this.filmsService.getCharacters(film.characters),
            routerLink: '/character/',
          });
          this.additionalInfoArray.push({
            title: 'Planets',
            data$: this.filmsService.getPlanets(film.planets),
            routerLink: '/planets/',
          });
        }),
      );
  }
}
