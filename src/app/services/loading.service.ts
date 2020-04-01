import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
@Injectable({
  providedIn: "root"
})
export class LoadingService {
  constructor(private loadingController: LoadingController) {}

  async Loading() {
    let resultado = await this.loadingController.getTop();
    console.log(await resultado);
    if (!resultado) {
      
      const loading = await this.loadingController.create({
        message: "Buscando una naranja...",
        translucent: true
      });
      return await loading.present();
    }
  }

  close() {
    this.loadingController.dismiss();
  }
}
