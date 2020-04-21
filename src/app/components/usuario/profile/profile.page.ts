import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { ImagenCamera } from 'src/app/models/ImagenCamera';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  imagenes: ImagenCamera[];
  constructor(
    private dragulaService: DragulaService,
    private usuarioSerice: UsuarioService,
    private fireAuth: AngularFireAuth
  ) {
    usuarioSerice
      .getPerfilImagenes(this.fireAuth.auth.currentUser.uid)
      .subscribe((imagenes) => {
        this.imagenes = imagenes;
      });

    this.dragulaService.createGroup('bag', {});
  }

  ngOnInit() {}

  onRenderItems(event) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    const draggedItem = this.imagenes.splice(event.detail.from, 1)[0];
    this.imagenes.splice(event.detail.to, 0, draggedItem);
    //this.listItems = reorderArray(this.listItems, event.detail.from, event.detail.to);
    event.detail.complete();
  }

  getList() {
    console.table(this.imagenes);
  }
}
