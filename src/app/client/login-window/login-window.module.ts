import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatButtonModule,
  MatCardModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LoginWindowComponent } from './login-window.component';
@NgModule({
  declarations: [LoginWindowComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    SharedModule,
    MatCardModule
  ],
  exports: [LoginWindowComponent]
})
export class LoginWindowModule {}
