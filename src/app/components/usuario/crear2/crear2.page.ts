import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../services/Usuario';

@Component({
  selector: 'app-crear2',
  templateUrl: './crear2.page.html',
  styleUrls: ['./crear2.page.scss'],
})
export class Crear2Page implements OnInit {
  usuario: Usuario;
  constructor(private router: Router) {    
    this.usuario =  <Usuario> this.router.getCurrentNavigation().extras.state;
    console.log(this.usuario);
   }

  ngOnInit() {
    
  }

  siguiente(){
    console.log(this.usuario);
  }
}
