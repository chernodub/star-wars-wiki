import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageModule } from './login-page/login-page.module';
import { MainPageModule } from './main-page/main-page.module';
import { LoginFormComponent } from './login-page/login-form.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, LoginPageModule, MainPageModule],
  exports: [LoginFormComponent]
})
export class ClientModule {}
