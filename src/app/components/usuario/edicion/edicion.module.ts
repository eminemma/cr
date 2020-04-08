import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdicionPageRoutingModule } from './edicion-routing.module';
import { EdicionPage } from './edicion.page';
import { CameraImagePage } from './camera-image';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdicionPageRoutingModule,
    ImageCropperModule,
    DragulaModule.forRoot()
  ],
  declarations: [EdicionPage, CameraImagePage]
})
export class EdicionModule {
}
