import { Component, OnInit, ViewChild  } from '@angular/core';
import { CameraImagePage } from './camera-image';
import { Usuario } from 'src/app/models/Usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';

@Component({
  selector: 'app-crear3',
  templateUrl: './crear3.page.html',
  styleUrls: ['./crear3.page.scss'],
})
export class Crear3Page implements OnInit {
  usuario: Usuario;
  indexHabilitar: number;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private fireAuth: AngularFireAuth,
    private env: EnvService,
    private http: HttpClient
  ) {
    this.usuario =   this.router.getCurrentNavigation().extras.state.usuario as Usuario;
    this.indexHabilitar = 0;
  }

  @ViewChild(CameraImagePage, {static : false}) child: CameraImagePage;

  ngOnInit() {
    this.route.params.subscribe(val => {
      this.habilitarBoton();
    });
  }
  setHabilitarIndex(indexHabilitar) {
    this.indexHabilitar = indexHabilitar;
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

  habilitarBoton() {
    for (let i = 0; i < this.usuario.imagenes.length; i++) {
      if (this.usuario.imagenes[i].src === undefined) {
        this.indexHabilitar = i;
        break;
      }
    }
  }
}

