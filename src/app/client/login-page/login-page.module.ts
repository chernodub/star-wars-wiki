import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatButtonModule,
  MatCardModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LoginFormComponent } from './login-form.component';
@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    SharedModule,
    MatCardModule
  ],
  exports: [LoginFormComponent]
})
export class LoginPageModule {}
