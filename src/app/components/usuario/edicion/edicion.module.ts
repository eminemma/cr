import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdicionPageRoutingModule } from './edicion-routing.module';
import { EdicionPage } from './edicion.page';
import { CameraImagePage } from './camera-image';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DragulaModule } from 'ng2-dragula';
import { TrackspotifyPageModule } from 'src/app/components/trackspotify/trackspotify.module';
import { TrackspotifyPage } from 'src/app/components/trackspotify/trackspotify.page';
import { ArtistspotifyPageModule } from 'src/app/components/artistspotify/artistspotify.module';
import { ArtistspotifyPage } from 'src/app/components/artistspotify/artistspotify.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdicionPageRoutingModule,
    ImageCropperModule,
    TrackspotifyPageModule,
    ArtistspotifyPageModule,
    DragulaModule.forRoot()
  ],
  entryComponents: [ TrackspotifyPage ],
  declarations: [EdicionPage, CameraImagePage]
})
export class EdicionModule {
}
