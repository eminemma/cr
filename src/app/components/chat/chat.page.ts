import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Chat } from "src/app/models/Chat";
import { Router } from '@angular/router';
import { take, map } from "rxjs/operators";
import { interval, Observable } from "rxjs";
import {concat} from 'rxjs';
@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
})
export class ChatPage implements OnInit {
  chats2: Observable<Chat[]>;
  constructor(
    private chatService: ChatService,
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) {
  }

  buscarChatPrimerPersona() {
    this.chats2 = this.chatService
    .traerChats(this.fireAuth.auth.currentUser.uid).pipe(
      map((changes) => {
        return changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }));
      })
    );
  }

  buscarChatSegundaPersona() {
    let chats: Observable<Chat[]>;
    chats =  this.chatService
    .traerChatsOtro(this.fireAuth.auth.currentUser.uid).pipe(
      map((changes) => {
        return changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }));
      })
    );
    this.chats2 = concat(this.chats2, chats);
  }


  ngOnInit() {
    this.buscarChatPrimerPersona();
    this.buscarChatSegundaPersona();
  }

  abrirConversacion(idConversacion: number){
    this.router.navigateByUrl('/conversacion?id=' + idConversacion);
  }

  eliminarChat(idChat: string){
    this.chatService.eliminarChat(idChat);
  }
}
