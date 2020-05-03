import { Component, OnInit, ViewChild } from '@angular/core';

import { CameraImagePage } from 'src/app/components/usuario/crear3/camera-image';
import { Usuario } from 'src/app/models/Usuario';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { ImagenCamera } from 'src/app/models/ImagenCamera';

import { DragulaService } from 'ng2-dragula';
import { DataService } from 'src/app/services/data.service';
import {
  LoadingController,
  ModalController,
  AlertController,
} from '@ionic/angular';
import { SpotifyService } from 'src/app/services/spotify.service';
import { InstagramService } from 'src/app/services/instagram.service';
import { TrackspotifyPage } from 'src/app/components/trackspotify/trackspotify.page';
import { ArtistspotifyPage } from 'src/app/components/artistspotify/artistspotify.page';
import { MediaInstagram } from 'src/app/models/MediaInstagram';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.page.html',
  styleUrls: ['./edicion.page.scss'],
})
export class EdicionPage implements OnInit {
  usuario: Usuario;
  indexHabilitar: number;
  loader: any;

  track: any;
  artist: any;

  mediaInstagrams: MediaInstagram[];
  @ViewChild(CameraImagePage, { static: false }) child: CameraImagePage;
  constructor(
    private usuarioService: UsuarioService,
    private instagramService: InstagramService,
    private fireAuth: AngularFireAuth,
    private dragulaService: DragulaService,
    private data: DataService,
    private loadingController: LoadingController,
    public alertController: AlertController,
    public spotifyService: SpotifyService,
    public modalController: ModalController
  ) {
    this.usuario = new Usuario();
    this.indexHabilitar = 0;

    this.dragulaService
      .drop('bag')
      .subscribe(({ name, el, target, source, sibling }) => {
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
        this.loading();
        this.usuarioService
          .modificarPosicionImagenes(imagenes)
          .subscribe((done) => {
            this.loader.dismiss();
          });
      });
    this.cargarDatos();

    this.data.currentMessage.subscribe((message) => {
      if (message != null) {
        this.loading();
        this.usuarioService
          .guardarImagen(message as ImagenCamera)
          .subscribe((done) => {
            this.loader.dismiss();
            this.cargarDatos();
          });
      }
    });
  }
  async loading() {
    this.loader = await this.loadingController.create({
      message: 'Cargando...',
      translucent: true,
    });
    this.loader.present();
  }

  ngOnInit() {
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
      copySortSource: false, // elements in copy-source containers can be reordered
      revertOnSpill: false, // spilling will put the element back where it was dragged from, if this is true
      removeOnSpill: false, // spilling will `.remove` the element, if this is true
    });
  }
  ionViewWillEnter() {
    this.traerCancionFavorita();
    this.traerArtistaFavorito();

    /*
import {concatMap, tap} from 'rxjs/operators';

this.http.get('http://test.localhost/api.php?timeout=1')
      .pipe(
        tap(res => console.log('First result', res)),
        concatMap((res: { timeout: number }) => this.http.get(`http://test.localhost/api.php?timeout=${+res.timeout + 1}`)),
        tap(res => console.log('Second result', res)),
        concatMap((res: { timeout: number }) => this.http.get(`http://test.localhost/api.php?timeout=${+res.timeout + 3}`)),
        tap(res => console.log('Third result', res)),
      )
      .subscribe(res => console.log('Latest result', res));
*/
    this.instagramService
      .obtenerMediaReciente()
      .subscribe((mediaInstagrams: any) => {
        this.mediaInstagrams = mediaInstagrams.data as MediaInstagram[];
        this.mediaInstagrams.forEach((media: MediaInstagram, index: number) => {
          this.instagramService.llenerMediaId(media.id).subscribe(
            (mediaData) => {
              console.log('Media data');
              console.log(mediaData);
              media.media_type = mediaData.media_type;
              media.media_url = mediaData.media_url;
              media.timestamp = mediaData.timestamp;
             
            },
            (error) => console.log(error)
          );
        });
        console.log('Instagram Edicion');
        console.log(this.mediaInstagrams);
      });
  }

  cargarDatos() {
    this.loading();
    this.usuarioService
      .getUsuario(this.fireAuth.auth.currentUser.uid)
      .subscribe((user) => {
        this.usuario = user;
        this.habilitarBoton();
        this.loader.dismiss();
      });
  }

  eliminarImagen(index: number) {
    this.loading();
    this.usuarioService
      .eliminarImagen(this.usuario.imagenes[index].id)
      .subscribe((done) => {
        this.loader.dismiss();
        this.cargarDatos();
      });
  }

  setHabilitarIndex(indexHabilitar) {
    this.indexHabilitar = indexHabilitar;
  }

  habilitarBoton() {
    if (
      this.usuario.imagenes.length === 0 ||
      this.usuario.imagenes[this.usuario.imagenes.length - 1].src !== undefined
    ) {
      this.usuario.imagenes[this.usuario.imagenes.length] = new ImagenCamera();
      this.indexHabilitar = this.usuario.imagenes.length - 1;
    }
  }

  async agregarTexto() {
    const alert = await this.alertController.create({
      header: 'Frase',
      subHeader: 'Esta frase va a ir junto a tu imagen en tu perfil',
      inputs: [
        {
          name: 'name1',
          type: 'textarea',
          placeholder: 'Una frase para tu nueva imagen',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          },
        },
      ],
    });

    await alert.present();
  }

  seleccionarCancionFavorita() {
    //

    this.spotifyService
      .loginSpotify()
      .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
        let result = {
          access_token: accessToken,
          expires_in: expiresAt,
          ref: encryptedRefreshToken,
        };

        this.modalTemaFavorito(accessToken);
      });
  }

  seleccionarArtistaFavorito() {
    //

    this.spotifyService
      .loginSpotify()
      .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
        let result = {
          access_token: accessToken,
          expires_in: expiresAt,
          ref: encryptedRefreshToken,
        };

        this.modalArtistaFavorito(accessToken);
      });
  }

  async modalTemaFavorito(tokenR) {
    const modal = await this.modalController.create({
      component: TrackspotifyPage,
      componentProps: {
        token: tokenR,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.traerCancionFavorita();
    });
    return await modal.present();
  }

  async modalArtistaFavorito(tokenR) {
    const modal = await this.modalController.create({
      component: ArtistspotifyPage,
      componentProps: {
        token: tokenR,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.traerArtistaFavorito();
    });
    return await modal.present();
  }

  traerCancionFavorita() {
    this.spotifyService
      .loginSpotify()
      .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
        let result = {
          access_token: accessToken,
          expires_in: expiresAt,
          ref: encryptedRefreshToken,
        };
        this.spotifyService
          .traerMusicaFavortia(accessToken, this.fireAuth.auth.currentUser.uid)
          .subscribe(
            (track) => (this.track = track),
            (error) => console.log(error)
          );
      });
  }

  traerArtistaFavorito() {
    this.spotifyService
      .loginSpotify()
      .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
        let result = {
          access_token: accessToken,
          expires_in: expiresAt,
          ref: encryptedRefreshToken,
        };
        this.spotifyService
          .traerArtistaFavorito(accessToken, this.fireAuth.auth.currentUser.uid)
          .subscribe(
            (artist) => (this.artist = artist),
            (error) => console.log(error)
          );
      });
  }

  loginInstagram() {
    /*this.instagramService.obtenerCodeAutorizacion().subscribe(
      (done: any) => console.log(done.url),
      (error: any) => console.log(error.url)
    );*/

    this.instagramService.obtenerCodeAutorizacion();
  }
}
