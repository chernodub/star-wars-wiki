import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatButtonModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { FilmsListComponent } from './films-list/films-list.component';
import { LoadingComponent } from './loading/loading.component';

/**
 * Module for components shared across all the project
 */
@NgModule({
  declarations: [LoadingComponent, FilmsListComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [LoadingComponent, FilmsListComponent],
})
export class SharedModule {}
