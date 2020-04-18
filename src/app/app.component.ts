declare let FB: any;
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';

import { timer } from 'rxjs';

import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { FcmService } from 'src/app/services/fcm.service';
import { ModalController } from '@ionic/angular';
import { MatchPage } from 'src/app/components/match/match.page';
import { Usuario } from 'src/app/models/Usuario';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LoginServiceService } from './services/login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  showSplash = true;
  usuario_primer_id;
  usuario_segundo_id;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translateService: TranslateService,
    private fcm: FCM,
    public toastController: ToastController,
    private router: Router,
    public modalController: ModalController,
    private backgroundMode: BackgroundMode,
    private loginService: LoginServiceService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.translateService.setDefaultLang('es');
      this.translateService.use('es');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false);
      //this.backgroundMode.enable();
      this.notificationSetup();
      this.loginService.isLoggedIn2().then((value) => {
        if (value) {
          this.router.navigate(['./principal']);
        }
    });
    });

  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }
  private notificationSetup() {
    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        if (data.landing_page === 'match'){
          //this.presentToast(JSON.stringify(data.usuarios));
          //this.usuarioMatch = data.usuarios;
          this.usuario_primer_id = data.usuario_primer_id;
          this.usuario_segundo_id = data.usuario_segundo_id;
          this.match();
          
        }
        // this.presentToast('recibe notificacion background');
      } else {
        //this.presentToast('recibe notificacion foreground o activo');
        if (data.landing_page === 'match'){
          //this.presentToast(JSON.stringify(data.usuarios));
          this.usuario_primer_id = data.usuario_primer_id;
          this.usuario_segundo_id = data.usuario_segundo_id;
          this.match();
          
        }
      }
    });
  }

  async match() {
    const modal = await this.modalController.create({
      component: MatchPage,
      componentProps: {
         usuario_primer_id: this.usuario_primer_id,
         usuario_segundo_id: this.usuario_segundo_id
        }
    });
    return await modal.present();
  }
}
