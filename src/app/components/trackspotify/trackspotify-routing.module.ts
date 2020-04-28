import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackspotifyPage } from './trackspotify.page';

const routes: Routes = [
  {
    path: '',
    component: TrackspotifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackspotifyPageRoutingModule {}
