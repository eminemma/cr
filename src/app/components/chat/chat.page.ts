import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Chat } from "src/app/models/Chat";
import { Router } from '@angular/router';
import { take, map } from "rxjs/operators";
import { interval, Observable } from "rxjs";
import {concat} from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Mensaje } from 'src/app/models/Mensaje';
import { ChatItemPage } from './chat-item';
@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
})
export class ChatPage implements OnInit {
  chats: Observable<Chat[]>;
  chats2: Observable<Chat[]>;
  mensaje: Observable<any>;
  constructor(
    private chatService: ChatService,
    private fireAuth: AngularFireAuth,
    private usuarioSerice: UsuarioService,
    private router: Router,
  ) {
  }

  buscarChatPrimerPersona() {
    
    this.chats2 = this.chatService
    .traerChats(this.fireAuth.auth.currentUser.uid).pipe(
      map((changes) => {
        return changes.map((c) => { 
          console.log('PrimerPersona');
          let chat = { id: c.payload.key,  ...c.payload.val() };
          let uid = (chat.idPrimerUsuario === this.fireAuth.auth.currentUser.uid ? chat.idSegundoUsuario : chat.idPrimerUsuario);
         console.log(uid);
          this.usuarioSerice.getPerfilImagenes(uid).subscribe(
            (imagenes) => {
              chat.imagen = imagenes[0].src;
            }
          );
          return chat;
        });
      })
    );

  }

  buscarChatSegundaPersona() {
    this.chats =  this.chatService
    .traerChatsOtro(this.fireAuth.auth.currentUser.uid).pipe(
      map((changes) => {
        return changes.map((c) => { 
          console.log('SegundaPersona');
          let chat = { id: c.payload.key,  ...c.payload.val() };
          let uid = (chat.idPrimerUsuario === this.fireAuth.auth.currentUser.uid ? chat.idSegundoUsuario : chat.idPrimerUsuario);
          this.usuarioSerice.getPerfilImagenes(uid).subscribe(
            (imagenes) => {
              chat.imagen = imagenes[0].src;
            }
          );
         
          return chat;
        });
      })
    );

  
  }

  


  ngOnInit() {
    this.buscarChatPrimerPersona();
    this.buscarChatSegundaPersona();
  }


 /*test(chat: Chat){
  let uid = (chat.idPrimerUsuario === this.fireAuth.auth.currentUser.uid ? chat.idSegundoUsuario : chat.idPrimerUsuario);
   this.usuarioSerice.getPerfilImagenes(uid).subscribe(
    (imagenes) => {
      chat.imagen = imagenes[0].src;
    }
  );
 }*/
}
