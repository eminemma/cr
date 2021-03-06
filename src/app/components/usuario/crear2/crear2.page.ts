import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crear2',
  templateUrl: './crear2.page.html',
  styleUrls: ['./crear2.page.scss'],
})
export class Crear2Page {
  usuario: Usuario;
  private usuarioForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.usuario = this.router.getCurrentNavigation().extras.state as Usuario;

    this.usuarioForm = this.formBuilder.group({
      direccion: ['', this.emailValidator],
    });
  }

  ionViewWillEnter() {}

  siguiente() {
    if (this.usuarioForm.dirty && this.usuarioForm.valid) {
      this.usuario.correo = this.usuarioForm.controls['direccion'].value;
      this.router.navigate(['./crear3'], { state: { usuario: this.usuario } });
    }
  }

  emailValidator(control) {
    // RFC 2822 compliant regex
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }
}
