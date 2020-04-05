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
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  showSplash = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translateService: TranslateService,
    private fcm: FCM,
    public toastController: ToastController
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
        console.log(JSON.stringify(data));
      } else {
        console.log(JSON.stringify(data));
      };
    });
  }
}
