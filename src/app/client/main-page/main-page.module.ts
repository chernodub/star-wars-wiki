import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FilmsListComponent } from './film-page/films-list/films-list.component';
import { FilmDescriptionComponent } from './film-page/film-description/film-description.component';
import { AuthGuard } from '../../core/guard/auth.guard';
import { FilmPageComponent } from './film-page/film-page.component';
import { MatExpansionModule } from '@angular/material/expansion';

const mainPageRoutes: Routes = [
  { path: 'films', component: FilmsListComponent, canActivate: [AuthGuard] },
  {
    path: 'films/:id',
    component: FilmDescriptionComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [
    FilmsListComponent,
    FilmDescriptionComponent,
    FilmPageComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    RouterModule.forChild(mainPageRoutes)
  ],
  exports: [RouterModule]
})
export class MainPageModule {}
