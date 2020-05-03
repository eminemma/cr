import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstlastphotosPageRoutingModule } from './instlastphotos-routing.module';

import { InstlastphotosPage } from './instlastphotos.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstlastphotosPageRoutingModule
  ],
  declarations: [InstlastphotosPage]
})
export class InstlastphotosPageModule {}
