import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ChatService } from "src/app/services/chat.service";
import { Mensaje } from "src/app/models/Mensaje";
import { interval, Observable } from "rxjs";
import { take, map } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-conversacion",
  templateUrl: "./conversacion.page.html",
  styleUrls: ["./conversacion.page.scss"],
})
export class ConversacionPage {
  mensaje: Mensaje;
  idChat: string;
  mensajes: Observable<Mensaje[]>;
  @ViewChild("content", { static: true }) private content: any;
  @ViewChild("mensaje", { static: true }) inputEl: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    public fireAuth: AngularFireAuth
  ) {
    this.mensaje = new Mensaje();
    this.route.queryParams.subscribe((params) => {
      this.idChat = params.id;
    });
  }

  ionViewWillEnter() {
    /*interval(1000).subscribe(() => {
     this.buscarMensajes();
    });*/
    this.buscarMensajes2();
    //this.scrollToBottomOnInit();
  }

  enviarMensaje() {
    this.mensaje.idChat = this.idChat;
    this.mensaje.idUsuarioEnvia = this.fireAuth.auth.currentUser.uid;
    this.mensaje.creado = new Date().getTime();
    this.chatService.enviarMensaje(this.mensaje);
    this.mensaje.mensaje = "";
  }

  buscarMensajes() {
    /*var mensajes = new Array();
    this.chatService.leerMensajes(this.idChat)
    .once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var mensaje = new Mensaje();
        // console.log(childSnapshot.val());
        mensaje = childSnapshot.val();
        mensaje.id = childSnapshot.key;
        mensajes.push(mensaje);
      });
    });
    this.mensajes = mensajes;
    console.log(this.mensajes);*/;
  }

  buscarMensajes2() {
    this.mensajes = this.chatService.leerMensajes2(this.idChat).pipe(
      map((changes) => {
        setTimeout(() => {
          this.content.scrollToBottom();
        }, 500);
        return changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
  }
}
