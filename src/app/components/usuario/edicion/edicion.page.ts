import { Component, OnInit, ViewChild  } from '@angular/core';
import { CameraImagePage } from './camera-image';
import { Usuario } from 'src/app/models/Usuario';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { ImagenCamera } from 'src/app/models/ImagenCamera';

import { DragulaService } from 'ng2-dragula';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';
import { LoadingController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.page.html',
  styleUrls: ['./edicion.page.scss'],
})
export class EdicionPage implements OnInit {
  usuario: Usuario;
  indexHabilitar: number;

  message: string;

  @ViewChild(CameraImagePage, {static : false}) child: CameraImagePage;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private fireAuth: AngularFireAuth,
    private env: EnvService,
    private http: HttpClient,
    private dragulaService: DragulaService,
    private data: DataService,
    private loadingService: LoadingService
  ) {
    this.usuario = new Usuario();
    this.indexHabilitar = 0;
    this.dragulaService.createGroup('bag', {
      moves: (el, container, handle): any => {
        if (el.classList.contains('test')) {
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

    this.dragulaService.drop('bag').subscribe(({name, el, target, source, sibling}) => {
          // hire is your code
          //console.log(el.id);
          //console.log(el.getAttribute('position'));
          //console.log(this.getElementIndex(el));

          const imagenes: ImagenCamera[] = new Array();
          for (let i = 0; i < this.usuario.imagenes.length; i++) {
            const imagen = new ImagenCamera();
            imagen.src = null;
            imagen.posicion = i;
            imagen.id = this.usuario.imagenes[i].id;
            imagenes.push(imagen);
          }
          this.loadingService.Loading();
          this.usuarioService.modificarPosicionImagenes(imagenes).subscribe(
            done => {
              this.loadingService.close();
            }
          );
        });
  }
  private getElementIndex(el: any) {
    return [].slice.call(el.parentElement.children).indexOf(el);
}


  ngOnInit() {
    this.cargarDatos();
    this.data.currentMessage.subscribe(message => {
      if (message != null) {
        this.loadingService.Loading();
        this.usuarioService.guardarImagen(message as ImagenCamera).subscribe((done)=>{
          this.loadingService.close();
          this.cargarDatos();
        });
      }
    });
  }

  cargarDatos(){
    this.loadingService.Loading();
    this.usuarioService.getUsuario(this.fireAuth.auth.currentUser.uid).subscribe(user => {
      this.usuario = user;
      this.habilitarBoton();
      this.loadingService.close();
    });
  }



  setHabilitarIndex(indexHabilitar) {
    this.indexHabilitar = indexHabilitar;
  }

  habilitarBoton() {
    if (this.usuario.imagenes.length === 0 || this.usuario.imagenes[this.usuario.imagenes.length - 1].src !== undefined) {
      this.usuario.imagenes[this.usuario.imagenes.length] = new ImagenCamera();
      this.indexHabilitar = (this.usuario.imagenes.length - 1);
      }
  }

}

