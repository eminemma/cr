import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { Usuario } from 'src/app/models/Usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import * as jwt_decode from 'jwt-decode';
export const TOKEN_NAME: string = 'token';
@Injectable({
  providedIn: 'root'
})


export class LoginServiceService {
  isLogged = false;
  usuario: Usuario;
  constructor(
    private facebook: Facebook,
    private alertService: AlertService,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private env: EnvService,
    private http: HttpClient) { }

  loginFacebook() {
    this.facebook
      .login(['public_profile', 'email'])
      .then(rta => {
         if (rta.status == 'connected') {
          const credential = firebase.auth.FacebookAuthProvider.credential(
            rta.authResponse.accessToken
          );
          //this.fireAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

          this.fireAuth.auth.signInWithCredential(credential).then(response => {
            // this.router.navigate(["/profile"]);
            // this.loading.dismiss();
            this.fireAuth.auth.currentUser.getIdToken(false)
            .then((token) => {
              localStorage.setItem('token',token);
            });
            this.fireAuth.auth.onAuthStateChanged(user => {
              if (user) {
                this.router.navigate(['/principal']);
              }
            });
          });
        }
      })
      .catch(error => {
        this.alertService.presentToast(JSON.stringify(error));
        console.error(error);
      });
  }

  getInfoFacebook() {
    return this.facebook
      .api("/me?fields=id,name,email,first_name,picture,last_name,gender", [
        "public_profile",
        "email"
      ]);
  }

  isLoggedIn(): Observable<boolean> {
    return this.fireAuth.authState.pipe(
      take(1),
      map(authState => !!authState)
    );
  }

  public isLoggedIn2() {
    return this.fireAuth.authState.pipe(first()).toPromise();
}

  logout() {
    this.fireAuth.auth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(["/login"]);
    });
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }
}
