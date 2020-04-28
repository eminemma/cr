import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { Instagram } from 'ng2-cordova-oauth/core';
import { OauthCordova } from 'ng2-cordova-oauth/platform/cordova';
import { Facebook } from '@ionic-native/facebook/ngx';
import { MediaInstagram } from '../models/MediaInstagram';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare var cordova: any;
@Injectable({
  providedIn: 'root',
})
export class InstagramService {
  private httpClient: HttpClient;
  constructor(
    handler: HttpBackend,
    private http: HttpClient,
    private env: EnvService,
    private facebook: Facebook
  ) {
    this.httpClient = new HttpClient(handler);
  }

  /*obtenerCodeAutorizacion() {
    const clientId = '902890203507791';
    const redirectUri = 'https://192.168.0.10/naranja/public/instagram/auth';
    
    return this.httpClient.get(
      'https://api.instagram.com/oauth/authorize?client_id=' + clientId + '&redirect_uri=' + redirectUri +
       '&scope=user_profile&response_type=code'
    );
  }*/

  obtenerCodeAutorizacion() {
    const oauth = new OauthCordova();

    const provider = new Instagram({
      clientId: '902890203507791',
      appScope: ['user_profile', 'user_media'],
      redirectUri: 'https://192.168.0.10/naranja/public/instagram/auth',
      responseType: 'code',
    });

    /* var browserRef = cordova.InAppBrowser.open(
      'https://api.instagram.com/oauth/authorize' +
        '?client_id=902890203507791' +
        '&redirect_uri=https://192.168.0.10/naranja/public/instagram/auth' +
        '&scope=instagram_basic' +
        '&response_type=code'
    );
    browserRef.addEventListener('loadstart', (event) => {
     console.log('load start');
    });
    browserRef.addEventListener('exit', function (event) {
      console.log('load exit');
    });*/

    oauth.logInVia(provider).then(
      (data: any) => {
        this.httpClient
          .get(
            'https://192.168.0.10/naranja/public/instagram/auth2?code=' +
              data.code
          )
          .subscribe(
            (data: any) => {
              localStorage.setItem('user_instagram', JSON.stringify(data));
              this.httpClient
                .get(
                  'https://graph.instagram.com/access_token?grant_type=ig_exchange_token' +
                    '&client_secret=19a18c2548fd5d3c0951b6fb25df8456&access_token=' +
                    data.access_token
                )
                .subscribe(
                  (data) => {
                    localStorage.setItem('instagram', JSON.stringify(data));
                    console.log(JSON.parse(localStorage.getItem('instagram')));
                  },
                  (error) => console.log(error)
                );
            },
            (error) => console.log(error)
          );
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  llenerMediaId(id: string): Observable<MediaInstagram> {
    const instagram = JSON.parse(localStorage.getItem('instagram'));
    return this.httpClient.get<MediaInstagram>(
      'https://graph.instagram.com/' +
        id +
        '?fields=id,media_type,media_url,username,timestamp&access_token=' +
        instagram.access_token
    );
  }
  obtenerMediaReciente(): Observable<any> {
    const instagram = JSON.parse(localStorage.getItem('instagram'));
    return this.httpClient.get(
      'https://graph.instagram.com/me/media?fields=id,caption&access_token=' +
        instagram.access_token
    );
    /*
    this.httpClient
      .get(
        'https://graph.instagram.com/me/media?fields=id,caption&access_token=' +
          instagram.access_token
      )
      .subscribe(
        (data: any) => {
          data.data.forEach((element: any) => {
            this.httpClient
              .get(
                'https://graph.instagram.com/' +
                  element.id +
                  '?fields=id,media_type,media_url,username,timestamp&access_token=' +
                  instagram.access_token
              )
              .subscribe(
                (done) => console.log(done),
                (error) => console.log(error)
              );
          });
        },
        (error) => console.log(error)
      );*/
  }
}
