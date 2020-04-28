import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Usuario } from 'src/app/models/Usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-trackspotify',
  templateUrl: './trackspotify.page.html',
  styleUrls: ['./trackspotify.page.scss'],
})
export class TrackspotifyPage{
  tokenSpotify: any;
  tracks: any[];
  constructor(
    private navParams: NavParams,
    public spotifyService: SpotifyService,
    private fireAuth: AngularFireAuth,
    public modalCtrl: ModalController
  ) {
    this.tokenSpotify = this.navParams.get('token');
    this.spotifyService.traerCancionesAfines(this.tokenSpotify).subscribe(
      (tracks: any) => {
        this.tracks = tracks.items;
      },
      (error) => console.log(error)
    );
  }

  ionViewWillEnter() {}

  buscando(e) {
    if (e.detail.value === '') {
      this.spotifyService.traerCancionesAfines(this.tokenSpotify).subscribe(
        (tracks: any) => {
          this.tracks = tracks.items;
        },
        (error) => console.log(error)
      );

      return;
    }
    this.spotifyService
      .buscarCancion(this.tokenSpotify, e.detail.value)
      .subscribe(
        (data: any) => {
          this.tracks = data.tracks.items;
        },
        (error) => console.log(error)
      );
  }

  imagenFavortia(track) {
    let usuario: Usuario;
    usuario = new Usuario();
    usuario.id = this.fireAuth.auth.currentUser.uid;
    usuario.idSpotifyMeGusta = track.id;
    this.spotifyService.guardarMusicaFavorita(usuario).subscribe(
      (done) => {
        this.modalCtrl.dismiss();
      },
      (error) => console.log(error)
    );
  }
}
