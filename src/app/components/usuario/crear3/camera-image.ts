import { Component, OnInit, EventEmitter, Output, Input  } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImagenCamera } from '../../../services/ImagenCamera';


@Component({
  selector: 'camera-image-component',
  templateUrl: './camera-image.html',
  styleUrls: ['./camera-image.css'],
})
export class CameraImagePage implements OnInit {
  @Input() indexImagen;
  @Input() imagenes;
  @Input() indexHabilitar;
  @Output() indexHabilitarNuevo:EventEmitter<Object>= new EventEmitter();  
  imagenCamera: ImagenCamera;
  
  
  constructor(
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private crop: Crop,
    private file: File) { }

  ngOnInit() {
    this.imagenCamera = new ImagenCamera();
    console.log('index habilitar' + this.indexHabilitar);
  }


  showCroppedImage(ImagePath){
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length-1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath,imageName).then(base64 => {
         this.imagenCamera.src = base64;
         this.imagenes[this.indexImagen] = this.imagenCamera;
         this.indexHabilitar = this.indexHabilitar + 1;
         this.indexHabilitarNuevo.emit(this.indexHabilitar); 
         console.log('Actualizacion de imagenes ' + this.imagenes);
        console.log('Nuevas Imagen seleccionada: ' + this.imagenCamera.src);
    }, error => {
      alert('Error in showing image' + error);
    });
  }
  async accionesImagen() {
    if(this.indexHabilitar == this.indexImagen){
    const actionSheet = await this.actionSheetController.create({
      header: 'Fotos',
      buttons: [{
        text: 'Tomar una foto',
        role: 'destructive',
        handler: () => {
          const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
          };
          this.camera.getPicture(options).then((imageData) => {
           // imageData is either a base64 encoded string or a file URI
           // If it's base64 (DATA_URL):
           let base64Image = 'data:image/jpeg;base64,' + imageData;
           return this.crop.crop(imageData, {
              quality: 75, targetWidth: 2, targetHeight: 100})
          .then(
            newImage => {console.log('new image path is: ' + newImage)
            this.showCroppedImage(newImage.split('?')[0])
          },            
            error => console.error('Error cropping image', error)
          );
          }, (err) => {
           // Handle error
          });
        }
      }, {
        text: 'Elegir desde Mis Fotos',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Elegir desde Mis Fotos',
        handler: () => {
          console.log('Play clicked');
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

 
}
