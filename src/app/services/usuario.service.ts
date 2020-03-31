import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private af: AngularFireDatabase,
    private fireAuth: AngularFireAuth,
    private env: EnvService,
    private http: HttpClient) { }
  usuario: any;
  usuarios: AngularFireList<Usuario>;
  // Create
  crearUsuario(usuario: Usuario): Observable<any>  {
    return this.http.post(this.env.API_URL + 'usuario', usuario);
  }

  async modificarUsuario(usuario: Usuario) {
    return firebase.database().ref('users/' + usuario.id).set(usuario);
  }

  getUsuario(id): Observable<any>  {
    return this.http.get(this.env.API_URL + 'usuario/' + id);
  }

  getUsuarios() : Observable<any> {
    return this.af.list('/users').valueChanges();
  }
}
