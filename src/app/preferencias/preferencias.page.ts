import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { LoginServiceService } from '../services/login-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'preferencias.page.html',
  styleUrls: ['preferencias.page.scss'],
})
export class PreferenciasPage {
  usuario: Usuario;
  sexoHombre: boolean;
  sexoMujer: boolean;
  loader: any;
  edad: any = {
    lower: 0,
    upper: 0,
  };
  constructor(
    private fireAuth: AngularFireAuth,
    private usuarioService: UsuarioService,
    private alertService: AlertService,
    private loginService: LoginServiceService,
    private loadingController: LoadingController,
  ) {
    this.usuario = new Usuario();
    this.loading();
    usuarioService
      .getUsuario(this.fireAuth.auth.currentUser.uid)
      .subscribe((user) => {
        this.usuario = user;

        this.sexoHombre = this.usuario.hombre === 1 ? true : false;
        this.sexoMujer = this.usuario.mujer === 1 ? true : false;
        this.edad = {
          lower: this.usuario.edadBusquedaMin,
          upper: this.usuario.edadBusquedaMax,
        };
        this.loader.dismiss();
      });
  }

  async modificarPreferencias() {
    this.usuario.mujer = this.sexoMujer ? 1 : 0;
    this.usuario.hombre = this.sexoHombre ? 1 : 0;
    this.usuario.edadBusquedaMin = this.edad.lower;
    this.usuario.edadBusquedaMax = this.edad.upper;
    this.loading();
    this.usuarioService
      .modificarUsuario(this.usuario)
      .subscribe((done) => {
        if (done.error === false)
          this.alertService.presentToast('Se modificaron correctamente los parametros');
        else {
          this.alertService.presentToast(done.message);
        }
        this.loader.dismiss();
      }, (error) => this.alertService.presentToast(error));
  }

  cerrarLogin() {
    this.loginService.logout();
  }


  async loading() {
    this.loader = await this.loadingController.create({
      message: 'Cargando...',
      translucent: true,
    });
    this.loader.present();
  }
}
