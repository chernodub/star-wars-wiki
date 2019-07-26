import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Film } from '../../core/models/film';
import { RouteData } from '../../core/models/route-data';
import { AppStateService } from '../../core/services/app-state.service';
import { FilmsService } from '../../core/services/films.service';

/**
 * List of films
 */
@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsListComponent {
  /** Parameters for component concerning current url */
  public routeData: RouteData;

  /**
   * table data
   */
  public films$: Observable<Film[]>;
  public constructor(
    private filmsService: FilmsService,
    private appStateService: AppStateService,
    private route: ActivatedRoute,
  ) {
    route.data.subscribe((data: RouteData) => {
      this.routeData = data;
    });

    this.films$ = this.filmsService
      .getFilms()
      .pipe(tap(() => this.appStateService.stopLoading()));
  }

  /** Inner text for opening film butt */
  get buttonText(): string {
    if (this.routeData) {
      return this.routeData.isAdminModule ? 'Edit' : 'Open';
    }
    return 'Open';
  }

  /** Link for film concerning user status */
  get filmLink(): string {
    if (this.routeData) {
      return this.routeData.isAdminModule ? '/admin/films/' : '/films/';
    }
    return '/films/';
  }
}
