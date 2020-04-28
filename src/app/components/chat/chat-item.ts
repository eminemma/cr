import { Component, OnInit, EventEmitter, Output, Input  } from '@angular/core';
import { Chat } from 'src/app/models/Chat';
import { Router } from '@angular/router';
import { ChatService } from "src/app/services/chat.service";
import { Observable } from 'rxjs';
import { Mensaje } from 'src/app/models/Mensaje';
import { AngularFireAuth } from "@angular/fire/auth";
import { take, map } from "rxjs/operators";

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'chat-item-component',
  templateUrl: './chat-item.html',
  styleUrls: ['./chat-item.css'],
})
export class ChatItemPage{
  @Input() chat: Chat;
  mensaje: Observable<Mensaje[]>;
  constructor(
    private router: Router,
    private chatService: ChatService,
    private fireAuth: AngularFireAuth,
    private usuarioSerice: UsuarioService,
  ) { }

  ionViewWillEnter() {
    this.traerUltimosMensajesChat(this.chat.id);
    this.traerUsuarioChat(this.chat);
    //console.log(this.mensaje);
  }

  
  abrirConversacion(idConversacion: number){
    this.router.navigateByUrl('/conversacion?id=' + idConversacion);
  }

  eliminarChat(idChat: string){
    this.chatService.eliminarChat(idChat);
  }

  traerUltimosMensajesChat(idChat: string) {
    this.mensaje = this.chatService.traerUltimosMensajesChat(idChat).pipe(
      map((changes) => {
  
        return changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }

  traerUsuarioChat(chat: Chat){
    let uid = (chat.idPrimerUsuario === this.fireAuth.auth.currentUser.uid ? chat.idSegundoUsuario : chat.idPrimerUsuario);
     this.usuarioSerice.getUsuario(uid).subscribe(
      (usuario) => {
        this.chat.nombrePersona = usuario.nombre;
      }
    );
   }
}
