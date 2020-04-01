import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Usuario } from "src/app/models/Usuario";
import { UsuarioService } from "src/app/services/usuario.service";
import { AlertService } from "src/app/services/alert.service";
import { LoadingService } from "src/app/services/loading.service";
import { LoginServiceService } from "../services/login-service.service";
@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page {
  usuario: Usuario;
  constructor(
    private fireAuth: AngularFireAuth,
    private usuarioService: UsuarioService,
    private alertService: AlertService,
    private loginService: LoginServiceService
  ) {
    this.usuario = new Usuario();
    usuarioService.getUsuario(this.fireAuth.auth.currentUser.uid).subscribe(user => {
      this.usuario = user;
    });
  }

  async modificarPreferencias() {
    this.usuario.hombre = (this.usuario.hombre) ? 1 : 0;
    this.usuario.hombre = (this.usuario.hombre) ? 1 : 0;

    let asyncResult = await this.usuarioService
      .modificarUsuario(this.usuario)
      .subscribe(done => {
        if(done.error === false)
          this.alertService.presentToast(
            "Se modificaron correctamente los parametros"
          );
        else{
          this.alertService.presentToast(
            done.message
          );
          }
      },
      (error) =>  this.alertService.presentToast(
        error
      )
      );
  }

  cerrarLogin() {
    this.loginService.logout();
  }
}
