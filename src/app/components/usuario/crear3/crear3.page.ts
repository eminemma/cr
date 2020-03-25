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
  indexHabilitar: number = 0;
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
  setHabilitarIndex(indexHabilitar){
    this.indexHabilitar = indexHabilitar;
  }
}
