import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Usuario } from 'src/app/models/Usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-artistspotify',
  templateUrl: './artistspotify.page.html',
  styleUrls: ['./artistspotify.page.scss'],
})
export class ArtistspotifyPage  {

  tokenSpotify: any;
  artists: any[];
  constructor(
    private navParams: NavParams,
    public spotifyService: SpotifyService,
    private fireAuth: AngularFireAuth,
    public modalCtrl: ModalController
  ) {
    this.tokenSpotify = this.navParams.get('token');
    this.spotifyService.traerArtistiasAfines(this.tokenSpotify).subscribe(
      (artists: any) => {
        this.artists = artists.items;
      },
      (error) => console.log(error)
    );
  }

  ionViewWillEnter() {}

  buscando(e) {
    if (e.detail.value === '') {
      this.spotifyService.traerArtistiasAfines(this.tokenSpotify).subscribe(
        (artists: any) => {
          this.artists = artists.items;
        },
        (error) => console.log(error)
      );

      return;
    }
    this.spotifyService
      .buscarArtista(this.tokenSpotify, e.detail.value)
      .subscribe(
        (data: any) => {
          this.artists = data.artists.items;
        },
        (error) => console.log(error)
      );
  }

  artistaFavortia(artist) {
    let usuario: Usuario;
    usuario = new Usuario();
    usuario.id = this.fireAuth.auth.currentUser.uid;
    usuario.idSpotifyArtist = artist.id;
    this.spotifyService.guardarMusicaArtista(usuario).subscribe(
      (done) => {
        this.modalCtrl.dismiss();
      },
      (error) => console.log(error)
    );
  }

}
