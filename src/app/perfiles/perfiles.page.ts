import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { LoadingService } from 'src/app/services/loading.service';
import { interval, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/Usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { LocationTracker } from '../../app/providers/location-tracker';

import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  BackgroundGeolocationEvents,
} from '@ionic-native/background-geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ChildComponent } from './card-persona';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'perfiles.page.html',
  styleUrls: ['perfiles.page.scss'],
})
export class PerfilesPage {
  estadoPerfil: Subject<number> = new Subject();
  usuarios: Usuario[];
  usuario: Usuario;
  showSplash = true;
  @ViewChild(ChildComponent, { static: true }) child: ChildComponent;
  constructor(
    private usuarioService: UsuarioService,
    private fireAuth: AngularFireAuth,
    private loadingService: LoadingService,
    private env: EnvService,
    private http: HttpClient,
    private geolocation: Geolocation,
    public locationTracker: LocationTracker,
    private fcm: FCM,
    private alertService: AlertService,
    private backgroundGeolocation: BackgroundGeolocation //  private geolocation: Geolocation
  ) {
    this.usuarios = [];
    this.startBackgroundGeolocation();
  }
  async ngOnInit() {
    /*
    ACTUALIZAR TOKEN DEVICE
    this.fcm.getToken().then(token => {
      this.alertService.presentToast('token fcm ' + token);
      const usuario = new Usuario();
      usuario.id = this.fireAuth.auth.currentUser.uid;
      usuario.idDevice = token;
      this.usuarioService.actualizarDevice(usuario).subscribe((message) => {
        //this.alertService.presentToast(JSON.stringify(message));
      });
    });*/

    // BUSCAR PERFILES
    interval(1000).subscribe(() => {
      console.log('buscando usurios' + this.usuarios.length);
      if (this.usuarios.length === 0) {
        this.showSplash = true;
        this.usuarioService
          .getUsuarios(this.fireAuth.auth.currentUser.uid)
          .subscribe((usuarios: Usuario[]) => {
            this.usuarios = usuarios;
            if (this.usuarios.length > 0) this.showSplash = false;
          });
      }
    });

    /* // GUARDAR POSICION
   let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
    console.log(data.coords.latitude);
    console.log(data.coords.longitude);
      this.usuarioService.actualizarPosicon(this.fireAuth.auth.currentUser.uid,data.coords.longitude,data.coords.latitude).subscribe(data => {
        console.log(data);
      });
    });*/
  }

  startBackgroundGeolocation() {
    console.log('Background1');
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      interval: 1000,
    };
    console.log('Background');
    this.backgroundGeolocation.configure(config).then(() => {
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          this.usuarioService
            .actualizarPosicon(
              this.fireAuth.auth.currentUser.uid,
              location.longitude,
              location.latitude
            )
            .subscribe(
              (data) => {
                console.log(data);
              },
              (error) => {
                console.log(error);
              }
            );
          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
        });
    });

    // start recording location
    this.backgroundGeolocation.start();

    let options = {
      frequency: 3000,
      enableHighAccuracy: true,
    };
    let watch = this.geolocation.watchPosition(options);
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      console.log(data.coords.latitude);
      console.log(data.coords.longitude);
      this.usuarioService
        .actualizarPosicon(
          this.fireAuth.auth.currentUser.uid,
          data.coords.longitude,
          data.coords.latitude
        )
        .subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            console.log(error);
          }
        );
    });
    // If you wish to turn OFF background-tracking, call the #stop method.
    //this.backgroundGeolocation.stop();
  }

  GetChildData(usuario) {
    console.log('usaurios sin filtrados');
    console.log(this.usuarios);
    this.usuarios = this.usuarios.filter((p) => p.id !== usuario.id);
    console.log('usaurios filtrados');
    console.log(this.usuarios);
  }

  like() {
    this.estadoPerfil.next(1);
  }

  notLike() {
    this.estadoPerfil.next(0);
  }

  superLike() {
    this.estadoPerfil.next(2);
  }
}
