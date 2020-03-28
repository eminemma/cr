import { Component, OnInit, EventEmitter, Output, Input  } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImagenCamera } from '../../../models/ImagenCamera';

import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'camera-image-component',
  templateUrl: './camera-image.html',
  styleUrls: ['./camera-image.css'],
})
export class CameraImagePage implements OnInit {
  @Input() usuario: Usuario;
  @Input() indexImagen: number;
  @Input() imagenes: Array<ImagenCamera>;
  @Input() indexHabilitar;
  @Output() indexHabilitarNuevo: EventEmitter <object> = new EventEmitter();
  imagenCamera: ImagenCamera;

  constructor(
    public actionSheetController: ActionSheetController,
    private route: Router
  ) { }

  ngOnInit() {
    this.imagenCamera = new ImagenCamera();
  }
  async accionesImagen() {
    if (this.indexHabilitar === this.indexImagen) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Fotos',
      buttons: [{
        text: 'Tomar una foto',
        role: 'destructive',
        handler: () => {
          this.route.navigate(['/cropp'], { state: { usuario: this.usuario, indexImage: this.indexImagen}});
        }
      }, {
        text: 'Elegir desde Mis Fotos',
        handler: () => {
          this.route.navigate(['/cropp'], { state: { usuario: this.usuario, indexImage: this.indexImagen, esGalleria: 'true'}});
        }
      }, {
        text: 'Elegir desde Facebook',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Elegir desde Instagram',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }, {
        text: 'Anular',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }}

  eliminarImagen() {
    this.imagenes.splice(this.indexImagen, 1);
    for (let i = 0; i < 12; i++) {
      if (this.imagenes[i] === undefined) {
        this.imagenes[i] = new ImagenCamera();
      }
    }

    this.habilitarBoton();
  }

  habilitarBoton() {
    for (let i = 0; i < this.imagenes.length; i++) {
      if (this.imagenes[i].src === undefined) {
        this.indexHabilitar = i;
        this.indexHabilitarNuevo.emit(this.indexHabilitar);
        break;
      }
    }
  }
}
