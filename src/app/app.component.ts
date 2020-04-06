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
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  showSplash = true;
  usuarioMatch;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translateService: TranslateService,
    private fcm: FCM,
    public toastController: ToastController,
    private router: Router,
    public modalController: ModalController
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

      this.notificationSetup();
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
          this.usuarioMatch = data.usuarios;
          this.match();
          
        }
        // this.presentToast('recibe notificacion background');
      } else {
        // this.presentToast('recibe notificacion foreground o activo');
        if (data.landing_page === 'match'){
          this.usuarioMatch = data.usuarios;
          this.match();
          
        }
      }
    });
  }

  async match() {
    const modal = await this.modalController.create({
      component: MatchPage,
      componentProps: {
         usuarios: this.usuarioMatch
        }
    });
    return await modal.present();
  }
}
