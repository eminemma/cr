import {
  Component,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  Renderer,
} from "@angular/core";
import {
  trigger,
  keyframes,
  animate,
  transition,
  state,
  style,
} from "@angular/animations";
import { AlertService } from "src/app/services/alert.service";
import { DomController } from "@ionic/angular";
import { Evento } from "src/app/models/Evento";
import { Usuario } from "src/app/models/Usuario";
import { EventoService } from "src/app/services/evento.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { ModalController } from "@ionic/angular";
import { MatchPage } from "src/app/components/match/match.page";
import { ChatService } from "../services/chat.service";
import { Chat } from "../models/Chat";
import { UsuarioService } from "../services/usuario.service";
import { Subject } from "rxjs";
@Component({
  selector: "card-persona-component",
  templateUrl: "card-persona.html",
  styleUrls: ["card-persona.css"],
  animations: [
    trigger("slideLike", [
      state(
        "open",
        style({
          transform: "translate3d(0, 0, 0)",
          // opacity: 1,
        })
      ),
      state(
        "right",
        style({
          transform: "translate3d(100%, 0, 0)",
          visibility: "hidden",
          //   opacity: 0
        })
      ),
      transition("open => right", [animate("0.55s")]),
    ]),
    trigger("slideNotLike", [
      state(
        "open",
        style({
          transform: "translate3d(0, 0, 0)",
          // opacity: 1,
        })
      ),
      state(
        "left",
        style({
          transform: "translate3d(-150%, 0, 0)",
          visibility: "hidden",
          //   opacity: 0
        })
      ),
      transition("open => left", [animate("0.55s")]),
    ]),
  ],
})
export class ChildComponent {
  counter = 0;
  animateLike = true;
  animateNotLike = true;
  animateUp = true;
  @Input() cambiandoEstadoPerfil: Subject<boolean>;
  @Input() usuario: Usuario;
  @Output() usuarioSeleccionada: EventEmitter<object> = new EventEmitter();
  x = 0;
  y = 0;
  left = "";
  top = "";
  evento: Evento;
  currentModal = null;
  startX = 0;
  startY = 0;
  usuarioMatch: Usuario[];
  usuario_primer_id;
  usuario_segundo_id;
  imagenBase64: any;
  showSplash = true;
  widthInidicador: string  = '10px';
  constructor(
    private alertService: AlertService,
    public element: ElementRef,
    public renderer: Renderer,
    public domCtrl: DomController,
    public eventoService: EventoService,
    private fireAuth: AngularFireAuth,
    public modalController: ModalController,
    private chatService: ChatService,
    private usuarioService: UsuarioService
  ) {}

  ngAfterViewInit() {
    let hammer = new window["Hammer"](this.element.nativeElement);

    hammer.on("pan", (ev) => {
      this.handlePan(ev);
    });

    hammer.on("panend", (ev) => {
      this.handlePanEnd(ev);
    });

    hammer.on("tap", (ev) => {
      this.handleTap(ev);
    });
  }
  handleTap(ev) {
    const centro = this.element.nativeElement.offsetWidth / 2;
    const xTap = ev.center.x;
    console.log("centro");
    console.log(this.element.nativeElement);
    if (centro < xTap) {
      this.showNextImage();
    } else {
      this.showPreviousImage();
    }
  }
  handlePan(ev) {
    const deltaX = ev.deltaX;
    const deltaY = ev.deltaY;

    this.domCtrl.write(() => {
      this.renderer.setElementStyle(
        this.element.nativeElement,
        "transition-duration",
        "0s"
      );
      this.renderer.setElementStyle(
        this.element.nativeElement,
        "transform",
        `translate(${deltaX}px,${deltaY}px)`
      );
    });
  }

  handlePanEnd(ev) {
    const deltaX = 0;
    const deltaY = 0;

    this.domCtrl.write(() => {
      this.renderer.setElementStyle(
        this.element.nativeElement,
        "transition-duration",
        "0.55s"
      );
      this.renderer.setElementStyle(
        this.element.nativeElement,
        "transform",
        `translate(${deltaX}px,${deltaY}px)`
      );
    });
  }
  onPan(event: any): void {
    event.preventDefault();
    this.x = this.startX + event.deltaX;
    this.y = this.startY + event.deltaY;

    this.left = this.x + "px";
    this.top = this.y + "px";
  }
  showNextImage() {
    if (this.counter < this.usuario.imagenes.length - 1) {
      this.counter += 1;
    }
    this.buscarImagen(this.counter);
  }
  showPreviousImage() {
    if (this.counter >= 1) {
      this.counter = this.counter - 1;
    }
    this.buscarImagen(this.counter);
  }

  startAnimationLike() {
    this.animateLike = false;
  }
  finishAnimationLike() {
    if (this.animateLike === false) {
      this.usuarioSeleccionada.emit(this.usuario);
      this.evento = new Evento();
      this.evento.evento = "like";
      this.evento.estado = 1;
      this.evento.usuarioEnviaId = this.fireAuth.auth.currentUser.uid;
      this.evento.usuarioRecibeId = this.usuario.id;
      this.eventoService.like(this.evento).subscribe((message) => {
        if (message.codigo === "match") {
          // Schedule a single notification
          // Schedule delayed notification
          this.usuario_primer_id = message.usuario_primer_id;
          this.usuario_segundo_id = message.usuario_segundo_id;
          this.match();
          const chat = new Chat();
          chat.idPrimerUsuario = this.usuario_primer_id;
          chat.idSegundoUsuario = this.usuario_segundo_id;
          chat.creado = new Date().getTime();
          this.chatService.crearChat(chat);
          this.alertService.presentToast("Match");
        }
      });
      this.alertService.presentToast("Like");
    }
  }

  startAnimationNotLike() {
    this.animateNotLike = false;
  }
  finishAnimationNotLike() {
    if (this.animateNotLike === false) {
      this.usuarioSeleccionada.emit(this.usuario);
      this.evento = new Evento();
      this.evento.evento = "dislike";
      this.evento.estado = 1;
      this.evento.usuarioEnviaId = this.fireAuth.auth.currentUser.uid;
      this.evento.usuarioRecibeId = this.usuario.id;

      this.eventoService.like(this.evento).subscribe((message) => {});
      this.alertService.presentToast("disLike");
    }
  }

  like() {
    this.startAnimationLike();
  }

  notLike() {
    this.startAnimationNotLike();
  }

  async match() {
    const modal = await this.modalController.create({
      component: MatchPage,
      componentProps: {
        usuario_primer_id: this.usuario_primer_id,
        usuario_segundo_id: this.usuario_segundo_id,
      },
    });
    return await modal.present();
    this.currentModal = modal;
  }

  ngOnInit() {
    console.log("Imagen inicial");
    console.log(this.usuario.imagenes);
    this.buscarImagen(0);
    this.widthInidicador = (240 / this.usuario.imagenes.length).toString() + 'px';
    console.log(this.widthInidicador);

    this.cambiandoEstadoPerfil.subscribe((v) => {
      if(v === true){
        this.like();
      }else{
        this.notLike();
      }
    });
  }

  buscarImagen(i: any) {
    this.showSplash = true;
    this.usuarioService
      .obtenerImagen(this.usuario.imagenes[i].id)
      .subscribe((imagen) => {
        this.imagenBase64 = imagen.src;
        this.showSplash = false;
      });
  }
}
