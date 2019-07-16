import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainWindowComponent } from './client/main-window/main-window.component';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginWindowComponent } from './client/login-window/login-window.component';

const routes: Routes = [
  { path: '', component: MainWindowComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginWindowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
