import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginFormComponent } from './login-form.component';

/**
 * Login page module
 */
@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    SharedModule,
    MatCardModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: LoginFormComponent,
      },
    ]),
  ],
})
export class LoginPageModule {}
