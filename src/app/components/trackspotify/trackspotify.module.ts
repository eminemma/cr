import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackspotifyPageRoutingModule } from './trackspotify-routing.module';

import { TrackspotifyPage } from './trackspotify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackspotifyPageRoutingModule
  ],
  declarations: [TrackspotifyPage]
})
export class TrackspotifyPageModule {}
