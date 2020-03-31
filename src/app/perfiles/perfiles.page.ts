import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { LoadingService } from 'src/app/services/loading.service';
import { interval, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/Usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'perfiles.page.html',
  styleUrls: ['perfiles.page.scss']
})
export class PerfilesPage {
  usuarios: Array<Usuario>;
  

  constructor(
    private usuarioService: UsuarioService,
    private fireAuth: AngularFireAuth,
    private loadingService: LoadingService,
    private env: EnvService,
    private http: HttpClient
  //  private geolocation: Geolocation
  ) {
    this.usuarios = new Array<Usuario>();
  }
  usuario: Usuario;
  async ngOnInit() {
   
    this.loadingService.Loading();
    this.usuarioService.getUsuarios().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      
      this.loadingService.close();
      interval(1000).subscribe(() => {
        if (this.usuarios.length === 0) {
          console.log('Pasaa');
          this.loadingService.Loading();
          this.usuarioService.getUsuarios().subscribe((usuarios: Usuario[]) => {
            this.usuarios = usuarios;
            this.loadingService.close();
          });
        }
      });
    });

   
  }
  GetChildData(usuario) {
    this.usuarios = this.usuarios.filter(p => p.id !== usuario.id);
  }
}
