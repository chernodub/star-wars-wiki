import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Film } from '../../../../core/models/film';
import { AppStateService } from '../../../../core/services/app-state.service';
import { FilmsService } from '../../../../core/services/films.service';

import { AdditionalInfo } from './additional-info-model';

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
  public additionalInfoArray: AdditionalInfo[] = [];

  public constructor(
    private filmsService: FilmsService,
    private route: ActivatedRoute,
    private appStateService: AppStateService,
  ) {
    this.film$ = this.filmsService
      .getFilmById(+this.route.snapshot.paramMap.get('id'))
      .pipe(
        tap((film) => {
          this.additionalInfoArray.push({
            title: 'Characters',
            data$: this.filmsService
              .getCharacters(film.characters)
              .pipe(tap(() => this.appStateService.stopLoading())),
            routerLink: '/character/',
          });
          this.additionalInfoArray.push({
            title: 'Planets',
            data$: this.filmsService
              .getPlanets(film.planets)
              .pipe(tap(() => this.appStateService.stopLoading())),
            routerLink: '/planets/',
          });
        }),
      );
  }
}
