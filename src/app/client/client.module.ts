import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginWindowModule } from './login-window/login-window.module';
import { MainWindowModule } from './main-window/main-window.module';
import { LoginWindowComponent } from './login-window/login-window.component';
import { MainWindowComponent } from './main-window/main-window.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, LoginWindowModule, MainWindowModule],
  exports: [LoginWindowComponent, MainWindowComponent]
})
export class ClientModule {}
