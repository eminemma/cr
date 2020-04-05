import { Component, OnInit } from '@angular/core';
//import { ModalController, ViewController } from 'ionic-angular';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
