import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { File } from '@ionic-native/file/ngx';
import { Usuario } from 'src/app/models/Usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterExtService } from 'src/app/services/routerext.service';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DataService } from 'src/app/services/data.service';
import { ImagenCamera } from 'src/app/models/ImagenCamera';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'cropp-edicion',
  templateUrl: './cropp.page.html',
  styleUrls: ['./cropp.page.scss']
})
export class CroppPage{
  @ViewChild('imageSrc', { static: false }) imageElement: ElementRef;
  indexImagen: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  myImage: any = '';
  imagen: ImagenCamera;
  esGalleria: boolean;
  edicion: boolean = false;
  message: any;

  getCameraOptions() {
    const cameraOpts: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true
    };
    return cameraOpts;
  }

  getCameraOptionsGallery() {
    const cameraOpts: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true
    };
    return cameraOpts;
  }

  constructor(
    public camera: Camera,
    private alertService: AlertService,
    private file: File,
    private router: Router,
    private route: ActivatedRoute,
    private routerExtService: RouterExtService,
    private data: DataService,
    private fireAuth: AngularFireAuth,
  ) {

    
    this.imagen = new ImagenCamera();
    this.imagen.idUsuario  = this.fireAuth.auth.currentUser.uid;
    this.esGalleria = this.router.getCurrentNavigation().extras.state.esGalleria;
    this.edicion = this.router.getCurrentNavigation().extras.state.edicion;

    this.indexImagen = this.router.getCurrentNavigation().extras.state.indexImage;
    const opciones = (this.esGalleria) ? this.getCameraOptionsGallery() : this.getCameraOptions();
    this.camera.getPicture(opciones).then(
      imageData => {
        const copyPath = imageData;
        const splitPath = copyPath.split('/');
        const imageName = splitPath[splitPath.length - 1];
        const filePath = imageData.split(imageName)[0];
        const imageName2 = imageName.split('?');
        this.file.readAsDataURL(filePath, imageName2[0]).then(
          base64 => {
            this.myImage = base64;
          },
          error => {
            alert('Error in showing image' + error);
          }
        );
      },
      error => {
        // do what you want
      }
    );
  }

  ionViewWillEnter() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.imagen.src = event.base64;
    this.imagen.posicion = this.indexImagen;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

  save() {
    this.data.setImagen(this.imagen);
    if (this.edicion) {
      this.router.navigate(['principal/imagenesPerfil']);
    } else {
      //VER COMO SOLUCIONAR AL CREAR USUARIO
      this.router.navigate(['./crear3']);
    }
  }
}
