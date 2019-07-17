import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginWindowComponent } from './client/login-window/login-window.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'films',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginWindowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
