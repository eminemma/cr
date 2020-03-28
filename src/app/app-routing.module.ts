import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'condiciones',
    loadChildren: () => import('./components/condiciones/condiciones.module').then( m => m.CondicionesPageModule)
    ,
    canActivate: [AuthGuard]
  },
  {
    path: 'politicas',
    loadChildren: () => import('./components/politicas/politicas.module').then( m => m.PoliticasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'crear1',
    loadChildren: () => import('./components/usuario/crear1/crear1.module').then( m => m.Crear1PageModule)
  },
  {
    path: 'crear2',
    loadChildren: () => import('./components/usuario/crear2/crear2.module').then( m => m.Crear2PageModule)
  },
  {
    path: 'crear3',
    loadChildren: () => import('./components/usuario/crear3/crear3.module').then( m => m.Crear3PageModule)
  },
  {
    path: 'cropp',
    loadChildren: () => import('./components/cropp/cropp.module').then( m => m.CroppPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
