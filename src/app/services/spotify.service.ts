import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/Usuario';
import { AngularFireAuth } from '@angular/fire/auth';

declare var cordova: any;
@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  result = {};
  private httpClient: HttpClient;
  usuario: Usuario;
  constructor(handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  loginSpotify(): Promise<any> {
    const config = {
      clientId: '9e46d3c1cf1d4b75bcd6842109b67366',
      redirectUrl: 'https://localhost:8100/callback',
      scopes: [
        'user-read-private',
        'user-read-email',
        'playlist-read-private',
        'user-read-recently-played',
        'user-top-read',
      ], // see Spotify Dev console for all scopes
      tokenExchangeUrl: 'https://192.168.0.10/naranja/public/exchange',
      tokenRefreshUrl: 'https://192.168.0.10/naranja/public/refresh',
    };
    return cordova.plugins.spotifyAuth.authorize(config);
  }
  traerUsuario(token): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.httpClient.get('https://api.spotify.com/v1/me', {
      headers: reqHeader,
    });
  }

  traerUsuarioPlaylist(token) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.httpClient.get(
      'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=5',
      {
        headers: reqHeader,
      }
    );
  }
}
