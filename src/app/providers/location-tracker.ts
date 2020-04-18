import { Injectable, NgZone } from "@angular/core";
import {
    BackgroundGeolocation,
    BackgroundGeolocationConfig,
    BackgroundGeolocationResponse,
    BackgroundGeolocationEvents
  } from "@ionic-native/background-geolocation/ngx";
import { Geolocation } from "@ionic-native/geolocation";
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioService } from '../services/usuario.service';

import { filter } from 'rxjs/operators';

@Injectable()
export class LocationTracker {
  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  constructor(
      public zone: NgZone,
      private backgroundGeolocation: BackgroundGeolocation,
      private fireAuth: AngularFireAuth,
      private usuarioService: UsuarioService
    ) {}

  startTracking() {
      
    // Background Tracking

    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 1000,
    };

    this.backgroundGeolocation.configure(config).then(() => {
        this.backgroundGeolocation
          .on(BackgroundGeolocationEvents.location)
          .subscribe((location: BackgroundGeolocationResponse) => {
             
            /*this.usuarioService.actualizarPosicon(this.fireAuth.auth.currentUser.uid,location.longitude,location.latitude).then(data => {
              console.log(data);
            });*/
            // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
            // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
            // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          });
      });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();

    // Foreground Tracking

    let options = {
      frequency: 3000,
      enableHighAccuracy: true,
    };
    

 
  }

  stopTracking() {
    console.log("stopTracking");

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }
}
