import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CondicionesPageRoutingModule } from './condiciones-routing.module';

import { CondicionesPage } from './condiciones.page';

import { Router } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CondicionesPageRoutingModule
  ],
  declarations: [CondicionesPage]
})
export class CondicionesPageModule {
  constructor(private route: Router) { }
}
