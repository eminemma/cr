import { Injectable } from '@angular/core';
import { Usuario } from './Usuario';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private af: AngularFireDatabase) { }
  usuario: any;
  // Create
  crearUsuario(usuario: Usuario) {
    return firebase.database().ref('users/' + usuario.id).set(usuario);
  }



    getUserDetails(id) : Observable<any>  {
      return this.af.object('/users/' + id).valueChanges();
    }
}
