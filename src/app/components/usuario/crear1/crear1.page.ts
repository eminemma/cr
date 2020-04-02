import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ImagenCamera } from 'src/app/models/ImagenCamera';
import { Facebook } from '@ionic-native/facebook/ngx';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-crear1',
  templateUrl: './crear1.page.html',
  styleUrls: ['./crear1.page.scss']
})
export class Crear1Page implements OnInit {
  usuario: Usuario;
  imagenes: ImagenCamera[];
  usuarioNombre: string;
  private usuarioForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private fireAuth: AngularFireAuth,
    private facebook: Facebook,
    private loginService: LoginServiceService,
    private loadingService: LoadingService
  ) {
    this.usuario = new Usuario();
    this.usuario.hombre = 1;
    this.usuario.mujer = 1;
    this.usuario.distanciaBusqueda = 100;
    this.usuario.edadBusqueda = 70;
    this.imagenes = [
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera()
    ];
    this.usuario.imagenes = this.imagenes;
    this.loadingService.Loading();
    this.facebook
      .login(["public_profile", "email"])
      .then(rta => {
        if (rta.status == "connected") {
          this.loginService
            .getInfoFacebook()
            .then(data => {
              console.log(data), (this.usuario.nombre = data.name);
              this.loadingService.close();
            })
            .catch(error => {
              console.error(error);
            });
        }
      })
      .catch(error => {
        // this.alertService.presentToast(JSON.stringify(error));
        console.error(error);
      });
    // validaciones
    this.usuarioForm = this.formBuilder.group({
      sexoHombre: [false, Validators.requiredTrue],
      sexoMujer: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {}
  validarSeleccionarSexo() {
    this.usuarioForm.controls["sexoHombre"].setErrors(null);
    this.usuarioForm.controls["sexoMujer"].setErrors(null);
    if (
      this.usuarioForm.controls["sexoHombre"].value === false &&
      this.usuarioForm.controls["sexoMujer"].value === false
    ) {
      this.usuarioForm.controls["sexoHombre"].setErrors({ required: true });
      this.usuarioForm.controls["sexoMujer"].setErrors({ required: true });
    }
  }

  siguiente() {
    this.usuario.id = this.fireAuth.auth.currentUser.uid;
    this.usuario.mujer = this.usuarioForm.controls["sexoMujer"].value;
    this.usuario.hombre = this.usuarioForm.controls["sexoHombre"].value;
    this.router.navigate(["./crear2"], { state: this.usuario });
  }
}
