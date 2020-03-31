import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private usuarioService: UsuarioService
  ) {
    
    this.usuarioService.getUsuario(this.fireAuth.auth.currentUser.uid).subscribe(done => {
      if (done.error == true) {
        this.router.navigate(['./crear1']);
      }
    });
  }

}
