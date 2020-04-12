import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Crear3PageRoutingModule } from './crear3-routing.module';
import { Crear3Page } from './crear3.page';
import { CameraImagePage } from './camera-image';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Crear3PageRoutingModule,
    ImageCropperModule
  ],
  declarations: [Crear3Page, CameraImagePage]
})
export class Crear3PageModule {
 
}
