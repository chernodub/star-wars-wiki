import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatTabsModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

import { FilmsListComponent } from '../shared/films-list/films-list.component';
import { SharedModule } from '../shared/shared.module';

import { FilmPageComponent } from './film-page/film-page.component';

const adminRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'films' },
  {
    path: 'films',
    component: FilmsListComponent,
    data: { isAdminModule: true },
  },
  {
    path: 'films/:id',
    component: FilmPageComponent,
    data: { isAdminModule: true },
  },
];

/** Module for admin pages */
@NgModule({
  declarations: [FilmPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    SharedModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class AdminModule {}
