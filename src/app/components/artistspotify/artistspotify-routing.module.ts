import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistspotifyPage } from './artistspotify.page';

const routes: Routes = [
  {
    path: '',
    component: ArtistspotifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistspotifyPageRoutingModule {}
