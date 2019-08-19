import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { FilmModalComponent } from './film-modal/film-modal.component';
import { FilmsListPage } from './films-list.page';

const routes: Routes = [
  {
    path: '',
    component: FilmsListPage,
  },
];

/** Films list module */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [FilmModalComponent],
  declarations: [FilmsListPage, FilmModalComponent],
})
export class FilmsListPageModule {}
