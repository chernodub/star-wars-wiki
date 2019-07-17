import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmDescriptionComponent } from './film-description/film-description.component';
import { AuthGuard } from '../../core/guard/auth.guard';

const mainWindowRoutes: Routes = [
  { path: 'films', component: FilmsListComponent, canActivate: [AuthGuard] },
  {
    path: 'films/:id',
    component: FilmDescriptionComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [FilmsListComponent, FilmDescriptionComponent],
  imports: [CommonModule, RouterModule.forChild(mainWindowRoutes)],
  exports: [RouterModule]
})
export class MainWindowModule {}
