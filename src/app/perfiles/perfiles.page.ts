import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { LoadingService } from 'src/app/services/loading.service';
import { interval, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/Usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'perfiles.page.html',
  styleUrls: ['perfiles.page.scss']
})
export class PerfilesPage {
  usuarios: Usuario[];
  usuario: Usuario;
  showSplash = true;

  constructor(
    private usuarioService: UsuarioService,
    private fireAuth: AngularFireAuth,
    private loadingService: LoadingService,
    private env: EnvService,
    private http: HttpClient,
    private geolocation: Geolocation,
  //  private geolocation: Geolocation
  ) {
    this.usuarios = [];
  }
  async ngOnInit() {
    
    interval(1000).subscribe(() => {
      if (this.usuarios.length === 0) {
        this.showSplash = true;
        this.usuarioService.getUsuarios(this.fireAuth.auth.currentUser.uid).subscribe((usuarios: Usuario[]) => {
          this.usuarios = usuarios;
          if(this.usuarios.length > 0) this.showSplash = false;
        });
      }
    });

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
    });
   
  }
  GetChildData(usuario) {
    this.usuarios = this.usuarios.filter(p => p.id !== usuario.id);
  }
}
