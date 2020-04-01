import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  map: GoogleMap;
  constructor(private loadingController: LoadingController) {}

  async ngOnInit(){
   
  }
  async onButtonClick() {
    
  }
}
