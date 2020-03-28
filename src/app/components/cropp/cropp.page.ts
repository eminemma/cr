import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { File } from '@ionic-native/file/ngx';
import { Usuario } from 'src/app/models/Usuario';
import { Router, ActivatedRoute } from '@angular/router';

import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-cropp',
  templateUrl: './cropp.page.html',
  styleUrls: ['./cropp.page.scss']
})
export class CroppPage implements OnInit {
  @ViewChild('imageSrc', { static: false }) imageElement: ElementRef;
  indexImagen: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  myImage: any = '';
  usuario: Usuario;
  esGalleria: boolean;
  message: any;
  ngOnInit() {}
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
    private route: ActivatedRoute
  ) {
    this.usuario = (this.router.getCurrentNavigation().extras.state.usuario) as Usuario;
    this.esGalleria = this.router.getCurrentNavigation().extras.state.esGalleria;


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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.usuario.imagenes[this.indexImagen].src = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

  save() {
    this.router.navigate(['./crear3'], { state: { usuario: this.usuario } });
  }
}
