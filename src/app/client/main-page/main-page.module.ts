import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatTabsModule,
} from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';

import { FilmDescriptionComponent } from './film-page/film-description/film-description.component';
import { FilmsListComponent } from './film-page/films-list/films-list.component';

/**
 * Module for the main user page
 */
@NgModule({
  declarations: [FilmsListComponent, FilmDescriptionComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    RouterModule,
    MatTabsModule,
  ],
  exports: [RouterModule, FilmDescriptionComponent, FilmsListComponent],
})
export class MainPageModule {}
