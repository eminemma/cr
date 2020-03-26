import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CroppPageRoutingModule } from './cropp-routing.module';

import { CroppPage } from './cropp.page';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CroppPageRoutingModule,
    ImageCropperModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [CroppPage]
})
export class CroppPageModule {}
