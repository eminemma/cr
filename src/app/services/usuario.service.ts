import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { ImagenCamera } from 'src/app/models/ImagenCamera';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { HTTP } from '@ionic-native/http/ngx';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private env: EnvService,
    private http: HttpClient,
    private http2: HTTP
  ) {}
  usuario: any;
  // Create
  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.env.API_URL + 'usuario', usuario);
  }

  modificarUsuario(usuario: Usuario): Observable<any> {
    return this.http.patch(this.env.API_URL + 'usuario', usuario);
  }

  getUsuario(id): Observable<any> {
    return this.http.get(this.env.API_URL + 'usuario/' + id);
  }

  getUsuarios(id): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.env.API_URL + 'usuarios/' + id);
  }

  getPerfilImagenes(id): Observable<ImagenCamera[]> {
    return this.http.get<ImagenCamera[]>(this.env.API_URL + 'imagen/' + id);
  }

  actualizarPosicon(id, x, y): Observable<any> {
    //return this.http2.get(this.env.API_URL + 'coordenadas/' + id + '/' + x + '/' + y, {}, {'Authorization': localStorage.getItem("token")});
    return this.http.get(
      this.env.API_URL + 'coordenadas/' + id + '/' + x + '/' + y
    );
  }

  actualizarDevice(usuario: Usuario): Observable<any> {
    return this.http.post(this.env.API_URL + 'device', usuario);
  }

  guardarImagen(imagen: ImagenCamera): Observable<any> {
    return this.http.post(this.env.API_URL + 'imagen', imagen);
  }

  modificarPosicionImagenes(imagenes: ImagenCamera[]): Observable<any> {
    return this.http.patch(this.env.API_URL + 'imagen', imagenes);
  }

  eliminarImagen(id): Observable<any> {
    return this.http.delete(this.env.API_URL + 'imagen/' + id);
  }

  obtenerImagen(id): Observable<any> {
    return this.http.get(this.env.API_URL + 'imagenBase64/' + id);
  }
}
