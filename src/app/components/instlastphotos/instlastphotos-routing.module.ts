import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstlastphotosPage } from './instlastphotos.page';

const routes: Routes = [
  {
    path: '',
    component: InstlastphotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstlastphotosPageRoutingModule {}
