import { Injectable } from '@angular/core';
import { Evento } from 'src/app/models/Evento';
import { HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EventoService {
  constructor(
    private env: EnvService,
    private http: HttpClient
  ) { }

  like(evento: Evento): Observable<any> {
    return this.http.post(this.env.API_URL + 'evento', evento);
  }

  unlike(evento: Evento){
    return this.http.post(this.env.API_URL + 'evento', evento);
  }
}
