import { Component } from '@angular/core';
import { NaranjaService } from '../services/naranja.service';
import { LoadingController } from '@ionic/angular';
import { interval, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Persona } from '../services/Persona';

@Component({
  selector: 'app-tab1',
  templateUrl: 'perfiles.page.html',
  styleUrls: ['perfiles.page.scss']
})
export class PerfilesPage {
  personas: Array<Persona>;
  

  constructor(
    private naranjaService: NaranjaService,
    private loadingController: LoadingController,
  //  private geolocation: Geolocation
  ) {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: "Please wait...",
      translucent: true
    });
    return await loading.present();
  }

  async ngOnInit() {
    this.presentLoading();
    this.naranjaService.get().subscribe((personas: Persona[]) => {
      this.personas = personas;
      this.loadingController.dismiss();
    });

    interval(1000).subscribe(() => {
      if (this.personas.length == 0) {
        this.presentLoading();
        this.naranjaService.get().subscribe((personas: Persona[]) => {
          this.personas = personas;
          this.loadingController.dismiss();
        });
      }
    });
  }
  GetChildData(persona) {
    console.log(persona);
    this.personas = this.personas.filter(p => p.id !== persona.id);
    console.log(this.personas);
  }
}
