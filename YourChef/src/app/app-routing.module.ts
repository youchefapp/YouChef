import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'receta', loadChildren: './pages/receta/receta.module#RecetaPageModule' },
  { path: 'register', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'cocinadas/:categoria', loadChildren: './pages/cocinadas/cocinadas.module#CocinadasPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
