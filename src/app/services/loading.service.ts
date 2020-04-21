import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
@Injectable({
  providedIn: "root",
})
export class LoadingService {
  constructor(private loadingController: LoadingController) {}
  loader: any;
  async Loading() {
    this.loader = await this.loadingController.create({
      message: "Cargando...",
      translucent: true,
    });
    await this.loader.present();
  }

  async close() {
    while ((await this.loadingController.getTop()) !== undefined) {
      await this.loadingController.dismiss();
    }
  }
}
