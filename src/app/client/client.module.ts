import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatButtonModule,
  MatTabsModule,
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { FilmsListComponent } from '../shared/films-list/films-list.component';
import { SharedModule } from '../shared/shared.module';

import { CharacterPageComponent } from './character-page/character-page.component';
import { FilmDescriptionComponent } from './film-page/film-description/film-description.component';

const clientRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'films' },
  {
    path: 'films',
    component: FilmsListComponent,
  },
  {
    path: 'films/:id',
    component: FilmDescriptionComponent,
  },
  {
    path: 'character/:id',
    component: CharacterPageComponent,
  },
];
/**
 * Module for user pages
 */
@NgModule({
  declarations: [CharacterPageComponent, FilmDescriptionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(clientRoutes),
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    SharedModule,
  ],
})
export class ClientModule {}
