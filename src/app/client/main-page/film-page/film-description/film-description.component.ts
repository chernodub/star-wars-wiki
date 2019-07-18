import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { Film } from '../../../../core/models/film';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

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
    private route: ActivatedRoute
  ) {
    this.film$ = this.dataService
      .getFilmById(+this.route.snapshot.paramMap.get('id'))
      .pipe(tap((x) => console.log(x)));
  }
}
