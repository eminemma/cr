import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtistspotifyPageRoutingModule } from './artistspotify-routing.module';

import { ArtistspotifyPage } from './artistspotify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistspotifyPageRoutingModule
  ],
  declarations: [ArtistspotifyPage]
})
export class ArtistspotifyPageModule {}
