import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Crear1Page } from './crear1.page';

const routes: Routes = [
  {
    path: '',
    component: Crear1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Crear1PageRoutingModule {}
