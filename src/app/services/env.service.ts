import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'https://crush.desa/naranja/public/';
  //API_URL = 'http://loteria.local/';
  constructor() { }
}
