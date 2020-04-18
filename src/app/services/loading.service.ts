import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(private loadingController: LoadingController) {}

  async Loading() {
    const resultado = await this.loadingController.getTop();
    console.log(await resultado);
    if (!resultado) {
      
      const loading = await this.loadingController.create({
        message: 'Cargando...',
        translucent: true
      });
      return await loading.present();
    }
  }

 async close() {
    const modal = await this.loadingController.getTop();
    if (modal !== undefined) {
      modal.dismiss();
    }
  }
}
