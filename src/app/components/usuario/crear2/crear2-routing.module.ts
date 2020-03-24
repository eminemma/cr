import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Crear2Page } from './crear2.page';

const routes: Routes = [
  {
    path: '',
    component: Crear2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Crear2PageRoutingModule {}
