import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CoreModule } from '../../core/core.module';

import { CharactersListPage } from './characters-list.page';

const routes: Routes = [
  {
    path: '',
    component: CharactersListPage,
  },
];

/** Characters list page */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CharactersListPage],
})
export class CharactersListPageModule {}
