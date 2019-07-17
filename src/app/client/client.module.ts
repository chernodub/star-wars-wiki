import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageModule } from './login-page/login-page.module';
import { MainPageModule } from './main-page/main-page.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, LoginPageModule, MainPageModule],
  exports: []
})
export class ClientModule {}
