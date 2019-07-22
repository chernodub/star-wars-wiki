import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { FilmDescriptionComponent } from './main-page/film-page/film-description/film-description.component';
import { FilmsListComponent } from './main-page/film-page/films-list/films-list.component';
import { MainPageModule } from './main-page/main-page.module';

const clientRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'films' },
  { path: 'films', component: FilmsListComponent, canActivate: [AuthGuard] },
  {
    path: 'films/:id',
    component: FilmDescriptionComponent,
    canActivate: [AuthGuard]
  }
];
/**
 * Module for user pages
 */
@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    MainPageModule,
    SharedModule,
    RouterModule.forChild(clientRoutes)
  ],
  exports: []
})
export class ClientModule {}
