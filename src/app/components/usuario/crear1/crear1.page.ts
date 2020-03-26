import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../services/Usuario';
import { Router } from '@angular/router';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ImagenCamera } from '../../../services/ImagenCamera';

@Component({
  selector: 'app-crear1',
  templateUrl: './crear1.page.html',
  styleUrls: ['./crear1.page.scss'],
})
export class Crear1Page implements OnInit {
  usuario: Usuario;
  
  imagenes: Array<ImagenCamera>;
  private usuarioForm : FormGroup;
  
    constructor( 
      private router: Router,
      private formBuilder: FormBuilder,
      private fireAuth: AngularFireAuth,
    ) {
    this.usuario = new Usuario();
    this.imagenes = [
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera(),
      new ImagenCamera()
    ];
    
    this.usuario.imagenes = this.imagenes;

    this.usuarioForm = this.formBuilder.group({
      sexoHombre: [false, Validators.requiredTrue],
      sexoMujer: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
  }
  validarSeleccionarSexo(){
    this.usuarioForm.controls['sexoHombre'].setErrors(null);
    this.usuarioForm.controls['sexoMujer'].setErrors(null);
    if(this.usuarioForm.controls['sexoHombre'].value === false && this.usuarioForm.controls['sexoMujer'].value === false) {
      this.usuarioForm.controls['sexoHombre'].setErrors({ required: true });
      this.usuarioForm.controls['sexoMujer'].setErrors({ required: true });
    }
  }
 

  siguiente(){
    this.usuario.id = this.fireAuth.auth.currentUser.uid;
    this.usuario.mujer = this.usuarioForm.controls['sexoMujer'].value;
    this.usuario.hombre = this.usuarioForm.controls['sexoHombre'].value;
    console.log(this.usuario);
    this.router.navigate(['./crear2'], { state: this.usuario });
  }

}
