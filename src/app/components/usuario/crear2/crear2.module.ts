import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Crear2PageRoutingModule } from './crear2-routing.module';

import { Crear2Page } from './crear2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Crear2PageRoutingModule
  ],
  declarations: [Crear2Page]
})
export class Crear2PageModule {}
