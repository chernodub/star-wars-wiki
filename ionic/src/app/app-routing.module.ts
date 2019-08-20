import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'films',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'films',
    loadChildren: () =>
      import('./pages/films-list/films-list.module').then(
        m => m.FilmsListPageModule,
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'characters',
    loadChildren: () =>
      import('./pages/characters-list/characters-list.module').then(
        m => m.CharactersListPageModule,
      ),
    canLoad: [AuthGuard],
  },
];

/** Routing module */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
