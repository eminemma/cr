import { Component, OnInit, ViewChild  } from '@angular/core';
import { ImagenCamera } from '../../../services/ImagenCamera';
import { CameraImagePage } from './camera-image'; 
import { Usuario } from 'src/app/services/Usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-crear3',
  templateUrl: './crear3.page.html',
  styleUrls: ['./crear3.page.scss'],
})
export class Crear3Page implements OnInit {
  usuario: Usuario;
  imagenes: Array<ImagenCamera>;
  indexHabilitar: number = 0;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ){
    this.usuario =  <Usuario> this.router.getCurrentNavigation().extras.state;
  }

  @ViewChild(CameraImagePage,{static : false}) child: CameraImagePage; 

  ngOnInit() {
    
    this.imagenes = [
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera()
    ];
    this.usuario.imagenes = this.imagenes;
  }
  setHabilitarIndex(indexHabilitar){
    this.indexHabilitar = indexHabilitar;
  }


  finalizarCreacionUsuario() {
    this.usuarioService.crearUsuario(this.usuario).then(()=>{
      this.router.navigate(['./principal']);
    });
  }
}

