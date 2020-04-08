import { Component, OnInit, ViewChild  } from '@angular/core';
import { CameraImagePage } from './camera-image';
import { Usuario } from 'src/app/models/Usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { ImagenCamera } from 'src/app/models/ImagenCamera';
import { DragulaService } from 'ng2-dragula';
@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.page.html',
  styleUrls: ['./edicion.page.scss'],
})
export class EdicionPage implements OnInit {
  usuario: Usuario;
  indexHabilitar: number;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private fireAuth: AngularFireAuth,
    private env: EnvService,
    private http: HttpClient,
    private dragulaService: DragulaService
  ) {
    this.usuario =   this.router.getCurrentNavigation().extras.state.usuario as Usuario;
    this.indexHabilitar = 0;
    this.dragulaService.createGroup('bag', {
      moves: (el, container, handle): any => {
        if (el.classList.contains('test')){
         return false;
        }
        return true;
      },
      accepts: (el, target, source, sibling): any => {
        // To avoid draggin from right to left container
        
        return true;
      },
      copySortSource: false,             // elements in copy-source containers can be reordered
      revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
      removeOnSpill: false,              // spilling will `.remove` the element, if this is true
    });
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
    /*this.usuarioService.crearUsuario(this.usuario).subscribe(
      done => {
          if(done.error === false) {
            this.router.navigate(['./principal']);
          }
        }
      );*/
  }

  habilitarBoton() {
    console.log(this.usuario);
    this.usuario.imagenes[this.usuario.imagenes.length] = new ImagenCamera();
    this.indexHabilitar = (this.usuario.imagenes.length - 1);
  }

}

