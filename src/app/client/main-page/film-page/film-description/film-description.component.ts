import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Film } from '../../../../core/models/film';
import { AppStateService } from '../../../../core/services/app-state.service';
import { DataService } from '../../../../core/services/data.service';

/**
 * Film description page
 */
@Component({
  selector: 'app-film-description',
  templateUrl: './film-description.component.html',
  styleUrls: ['./film-description.component.css']
})
export class FilmDescriptionComponent {
  /**
   * Film to render on description page
   */
  public film$: Observable<Film>;

  public constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private appStateService: AppStateService
  ) {
    this.film$ = this.dataService
      .getFilmById(+this.route.snapshot.paramMap.get('id'))
      .pipe(tap(() => this.appStateService.stopLoading()));
  }
}
