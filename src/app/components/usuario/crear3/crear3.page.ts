import { Component, OnInit, ViewChild  } from '@angular/core';
import { CameraImagePage } from './camera-image'; 
import { Usuario } from 'src/app/services/Usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { ImagenCamera } from '../../../services/ImagenCamera';

@Component({
  selector: 'app-crear3',
  templateUrl: './crear3.page.html',
  styleUrls: ['./crear3.page.scss'],
})
export class Crear3Page implements OnInit {
  usuario: Usuario;
  indexHabilitar: number = 0;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ){
    this.usuario =  <Usuario> this.router.getCurrentNavigation().extras.state.usuario;
    
  }

  @ViewChild(CameraImagePage,{static : false}) child: CameraImagePage; 

  ngOnInit() { 
    console.log('again');
    this.route.params.subscribe(val => {
      
      this.habilitarBoton();
    });
  }
  setHabilitarIndex(indexHabilitar){
    this.indexHabilitar = indexHabilitar;
  }


  finalizarCreacionUsuario() {
    this.usuarioService.crearUsuario(this.usuario).then(()=>{
      this.router.navigate(['./principal']);
    });
  }

  habilitarBoton() {
  
    for (let i = 0; i < this.usuario.imagenes.length; i++) {
      console.log('pasaa'+i);
      if (this.usuario.imagenes[i].src === undefined) {
        this.indexHabilitar = i;
        break;
      }
    }
  }
}

