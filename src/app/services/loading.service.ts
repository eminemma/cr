import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private loadingController: LoadingController
  ) { }

  async Loading() {
    const loading = await this.loadingController.create({
      message: "Please wait...",
      translucent: true
    });
    return await loading.present();
  }

  close(){
    this.loadingController.dismiss();
  }
}
