import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainWindowComponent } from './main-window.component';

@NgModule({
  declarations: [MainWindowComponent],
  imports: [CommonModule],
  exports: [MainWindowComponent]
})
export class MainWindowModule {}
