import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

/*import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
map: GoogleMap;
*/
@Component({
  selector: 'app-tab2',
  templateUrl: 'conversaciones.page.html',
  styleUrls: ['conversaciones.page.scss']
})
export class ConversacionesPage {
  constructor(private loadingController: LoadingController) {}

  ngInit() {
  }
  onButtonClick() {
  }
}
