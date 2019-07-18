import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FilmsListComponent } from './film-page/films-list/films-list.component';
import { FilmDescriptionComponent } from './film-page/film-description/film-description.component';
import { AuthGuard } from '../../core/guard/auth.guard';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material';

const mainPageRoutes: Routes = [
  { path: 'films', component: FilmsListComponent, canActivate: [AuthGuard] },
  {
    path: 'films/:id',
    component: FilmsListComponent,
    canActivate: [AuthGuard]
  }
];
/**
 * Module for the main user page
 */
@NgModule({
  declarations: [FilmsListComponent, FilmDescriptionComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    RouterModule.forChild(mainPageRoutes)
  ],
  exports: [RouterModule]
})
export class MainPageModule {}
