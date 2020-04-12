import { Component, OnInit, ViewChild  } from '@angular/core';
import { CameraImagePage } from './camera-image';
import { Usuario } from 'src/app/models/Usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from 'src/app/services/data.service';
import { ImagenCamera } from 'src/app/models/ImagenCamera';
@Component({
  selector: 'app-crear3',
  templateUrl: './crear3.page.html',
  styleUrls: ['./crear3.page.scss'],
})
export class Crear3Page implements OnInit {
  usuario: Usuario;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private fireAuth: AngularFireAuth,
    private data: DataService
  ) {
    this.usuario =   this.router.getCurrentNavigation().extras.state.usuario as Usuario;
  }

  @ViewChild(CameraImagePage, {static : false}) child: CameraImagePage;

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      if (message != null) {
          this.usuario.imagenes[this.usuario.imagenes.length - 1] = message as ImagenCamera;
          this.usuario.imagenes.push(new ImagenCamera());
      }
    });
  }


  finalizarCreacionUsuario() {
    this.fireAuth.auth.currentUser.getIdToken(true)
    .then((token) => {
      localStorage.setItem('token',token);
    });
    this.usuarioService.crearUsuario(this.usuario).subscribe(
      done => {
          if(done.error === false) {
            this.router.navigate(['./principal']);
          }
        }
      );
  }


  eliminarImagen(index: number) {
    this.usuario.imagenes.splice(index, 1);
  }
}

