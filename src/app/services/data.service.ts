import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { ImagenCamera } from '../models/ImagenCamera';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject<object>(null);
  private messageSourceBool = new BehaviorSubject<boolean>(null);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  setImagen(imagen: ImagenCamera) {
    this.messageSource.next(imagen);
  }

  setUsuario(usuario: Usuario) {
    this.messageSource.next(usuario);
  }

  setEsGaleria(galeria: boolean) {
    this.messageSourceBool.next(galeria);
  }
}
