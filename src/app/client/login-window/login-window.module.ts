import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import {
  MatInputModule,
  MatButtonModule,
  MatCardModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginWindowComponent } from './login-window.component';
@NgModule({
  declarations: [LoginFormComponent, LoginWindowComponent],
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
