import { Component, OnInit } from '@angular/core';
//import { ModalController, ViewController } from 'ionic-angular';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {
  usuarios;
  constructor(
    public modalController: ModalController,
    private navParams: NavParams,
    private route: ActivatedRoute) {
      this.usuarios = this.route.snapshot.params['usuarios'];
    }

  ngOnInit() {
    //this.usuarios = this.navParams.data.usuarios;
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
