import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'perfiles',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../perfiles/perfiles.module').then(m => m.Tab1PageModule)
              ,
    canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'conversaciones',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../conversaciones/conversaciones.module').then(m => m.ConversacionesModule)
              ,
    canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'preferencias',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../preferencias/preferencias.module').then(m => m.PreferenciasModule)
              ,
    canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'imagenesPerfil',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../components/usuario/edicion/edicion.module').then(m => m.EdicionModule)
              ,
    canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../components/chat/chat.module').then(m => m.ChatPageModule)
              ,
    canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/principal/perfiles',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/principal/perfiles',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
