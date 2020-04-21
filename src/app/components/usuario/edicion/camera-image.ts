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
  @Input() indexImagen: number;
  @Input() imagen: ImagenCamera;
  @Output() eliminarEvento: EventEmitter <object> = new EventEmitter();

  constructor(
    public actionSheetController: ActionSheetController,
    private route: Router
  ) { }

  ngOnInit() {
  }
  async accionesImagen() {
    if(this.imagen.src === undefined){
    const actionSheet = await this.actionSheetController.create({
      header: 'Fotos',
      buttons: [{
        text: 'Tomar una foto',
        role: 'destructive',
        handler: () => {
          this.route.navigate(['/cropp'], { state: {  indexImage: this.indexImagen, edicion: true}});
        }
      }, {
        text: 'Elegir desde Mis Fotos',
        handler: () => {
          this.route.navigate(['/cropp'], { state: { indexImage: this.indexImagen, esGalleria: 'true', edicion: true}});
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
  }
 }

  eliminarImagen() {
    this.eliminarEvento.emit(this.indexImagen as any);
  }

}
