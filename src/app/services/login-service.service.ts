import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  isLogged = false;
  constructor(
    private facebook: Facebook,
    private alertService: AlertService,
    private fireAuth: AngularFireAuth,
    private router: Router) { }

  loginFacebook() {
    
    this.alertService.presentToast('Login');
    this.facebook
      .login(['public_profile', 'email'])
      .then(rta => {
        console.log(rta.status);
        this.alertService.presentToast('Respuesta antes 3 AngularFireAuth');
        if (rta.status == 'connected') {
          this.getInfo();
          const credential = firebase.auth.FacebookAuthProvider.credential(
            rta.authResponse.accessToken
          );
          this.fireAuth.auth.signInWithCredential(credential).then(response => {
            // this.router.navigate(["/profile"]);
            // this.loading.dismiss();
            this.fireAuth.auth.onAuthStateChanged(user => {
              if (user) {
                this.router.navigate(['/principal']);
                this.alertService.presentToast(JSON.stringify(user));
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

  getInfo() {
    this.facebook
      .api("/me?fields=id,name,email,first_name,picture,last_name,gender", [
        "public_profile",
        "email"
      ])
      .then(data => {
        this.alertService.presentToast(JSON.stringify(data));
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
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
      // this.router.navigate(["/home"]);
    });
  }
}
