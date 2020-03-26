import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Crear1PageRoutingModule } from './crear1-routing.module';

import { Crear1Page } from './crear1.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Crear1PageRoutingModule
  ],
  declarations: [Crear1Page]
})
export class Crear1PageModule {}
