import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  usuario: Usuario;
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

  abrirEdicion() {
    this.usuarioService.getUsuario(this.fireAuth.auth.currentUser.uid).subscribe(user => {
      this.usuario = user;
     
      this.router.navigate(['principal/imagenesPerfil'], { state: { usuario: this.usuario } });

    });
    
  }

}
