import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfilesPage } from './perfiles.page';
import { ChildComponent } from './card-persona';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: PerfilesPage }])
    ,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-4846024327481940',
      adSlot: 7259870550,
      adtest: 'on'
    })
  ],
  declarations: [PerfilesPage, ChildComponent]
})
export class Tab1PageModule {}
