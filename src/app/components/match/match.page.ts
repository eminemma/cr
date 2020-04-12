import { Component, OnInit } from '@angular/core';
//import { ModalController, ViewController } from 'ionic-angular';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/auth";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {
  usuarioPrimero: Usuario;
  usuarioDos: Usuario;

  usuario_primer_id;
  usuario_segundo_id;
  constructor(
    private fireAuth: AngularFireAuth,
    public modalController: ModalController,
    private navParams: NavParams,
    public toastController: ToastController,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute) {
      this.usuario_primer_id = this.navParams.get('usuario_primer_id') ;
      this.usuario_segundo_id = this.navParams.get('usuario_segundo_id') ;
    }

  ngOnInit() {
    this.usuarioService.getUsuario(this.usuario_primer_id).subscribe(user => {
      this.usuarioPrimero = user;
    });
    this.usuarioService.getUsuario(this.usuario_segundo_id).subscribe(user => {
      this.usuarioDos = user;
    });
  }
  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }
  async closeModal() {
    await this.modalController.dismiss();
  }

}
