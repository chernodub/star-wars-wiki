import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatButtonModule,
  MatTabsModule,
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guard/auth.guard';
import { FilmsListComponent } from '../shared/films-list/films-list.component';
import { SharedModule } from '../shared/shared.module';

import { CharacterPageComponent } from './character-page/character-page.component';
import { FilmDescriptionComponent } from './main-page/film-description/film-description.component';

const clientRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'films' },
  { path: 'films', component: FilmsListComponent, canActivate: [AuthGuard] },
  {
    path: 'films/:id',
    component: FilmDescriptionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'character/:id',
    component: CharacterPageComponent,
    canActivate: [AuthGuard],
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
    RouterModule,
    MatTabsModule,
    SharedModule,
  ],
  exports: [],
})
export class ClientModule {}
