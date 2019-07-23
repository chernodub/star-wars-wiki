import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';

import { LoadingComponent } from './loading/loading.component';

/**
 * Module for components shared across all the project
 */
@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [LoadingComponent],
})
export class SharedModule {}
