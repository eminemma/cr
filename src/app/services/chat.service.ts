import { Injectable } from "@angular/core";
import { Chat } from "../models/Chat";
import { Mensaje } from "../models/Mensaje";
import * as firebase from "firebase";
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  constructor(public database: AngularFireDatabase) {}

  crearChat(chat: Chat) {
    const ChatUID = firebase.database().ref().child("chat").push().key;
    return firebase
      .database()
      .ref("chat/" + ChatUID)
      .set(chat);
  }




  traerUltimosMensajesChat(idChat: string) {
    let mensajesRef: AngularFireList<any>;
    mensajesRef = this.database.list("mensaje", (ref) =>
      ref.orderByChild("idChat").equalTo(idChat).limitToLast(1)
    );
    return mensajesRef.snapshotChanges();
  }

  traerChats(idUsuario: string) {
    let chatRef: AngularFireList<any>;
    chatRef = this.database.list("chat", (ref) =>
      ref.orderByChild("idPrimerUsuario").equalTo(idUsuario)
    );
    return chatRef.snapshotChanges();
  }
  traerChatsOtro(idUsuario: string) {
    let chatRef: AngularFireList<any>;
    chatRef = this.database.list("chat", (ref) =>
      ref.orderByChild("idSegundoUsuario").equalTo(idUsuario)
    );
    return chatRef.snapshotChanges();
  }

  enviarMensaje(mensaje: Mensaje) {
    const mensajeUID = firebase.database().ref().child("mensaje").push().key;
    return firebase
      .database()
      .ref("mensaje/" + mensajeUID)
      .set(mensaje);
  }

  leerMensajes(idChat: string) {
    var ref = firebase.database().ref("mensaje");
    return ref.orderByChild("idChat").equalTo(idChat);
  }

  leerMensajes2(idChat: string) {
    let mensajesRef: AngularFireList<any>;
    mensajesRef = this.database.list("mensaje", (ref) =>
      ref.orderByChild("idChat").equalTo(idChat)
    );
    return mensajesRef.snapshotChanges();
  }

  eliminarMensaje(id: number) {}

  eliminarChat(idChat: string) {
    firebase.database().ref('chat').child(idChat).remove().then((done)=>{
      console.log(done);
    });
  }
}
