import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './core/guard/admin.guard';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginGuard } from './core/guard/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user' },
  {
    path: 'user',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login-page/login-page.module').then((m) => m.LoginPageModule),
    canLoad: [LoginGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canLoad: [AuthGuard, AdminGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'user',
  },
];

/** Main routing module */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
