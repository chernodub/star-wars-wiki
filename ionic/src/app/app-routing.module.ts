import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'films',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/films-list/films-list.module').then(
        m => m.FilmsListPageModule,
      ),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./pages/list/list.module').then(m => m.ListPageModule),
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
  },
  {
    path: 'characters',
    loadChildren: () =>
      import('./pages/characters-list/characters-list.module').then(
        m => m.CharactersListPageModule,
      ),
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
