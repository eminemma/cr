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
    this.usuarioService.getUserDetails(this.fireAuth.auth.currentUser.uid).subscribe(done => {
      if (done == null || typeof done !== 'object') {
        this.router.navigate(['./crear1']);
      }
    });
  }

}
