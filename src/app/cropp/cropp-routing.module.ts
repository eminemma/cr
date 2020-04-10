import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CroppPage } from './cropp.page';

const routes: Routes = [
  {
    path: '',
    component: CroppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CroppPageRoutingModule {}
