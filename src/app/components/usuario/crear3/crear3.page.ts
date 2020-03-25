import { Component, OnInit, ViewChild  } from '@angular/core';
import { ImagenCamera } from '../../../services/ImagenCamera';
import { CameraImagePage } from './camera-image'; 

@Component({
  selector: 'app-crear3',
  templateUrl: './crear3.page.html',
  styleUrls: ['./crear3.page.scss'],
})
export class Crear3Page implements OnInit {
  imagenes: Array<ImagenCamera>;
  indexHabilitar: number=0;
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
  }

  habilitarBoton(){
    for (var i = 0; i < this.imagenes.length; i++) {
      if(this.imagenes[i].src === undefined) {
        this.indexHabilitar = i;
        break;
      }
    }
  }

  eliminarImagen(index){
    this.imagenes.splice(index, 1);
   
    for (var i = 0; i < 6; i++) {
      if(this.imagenes[i] === undefined) {
        this.imagenes[i] = new ImagenCamera(); 
      }
    }

    this.habilitarBoton();
  }


  setHabilitarIndex(indexHabilitar){
    this.indexHabilitar = indexHabilitar;
  }
}
