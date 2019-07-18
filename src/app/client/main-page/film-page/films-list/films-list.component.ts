import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { AppStateService } from '../../../../core/services/app-state.service';
import { Film } from '../../../../core/models/film';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * List of films
 */
@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  /**
   * table data
   */
  films$: Observable<Film[]>;
  public constructor(
    private dataService: DataService,
    private appStateService: AppStateService
  ) {}

  /**
   * Getting the initial data for the table
   */
  public ngOnInit(): void {
    this.films$ = this.dataService
      .getFilms()
      .pipe(tap(() => this.appStateService.stopLoading()));
  }

  /**
   * Opens the window with film description
   */
  public open(id: string | number): void {
    console.log(id);
  }
}
