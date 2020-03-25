import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../services/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear1',
  templateUrl: './crear1.page.html',
  styleUrls: ['./crear1.page.scss'],
})
export class Crear1Page implements OnInit {
  usuario: Usuario; 
  constructor( private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  siguiente(){
    console.log(this.usuario);
    this.router.navigate(['./crear2'], { state: this.usuario });
    
  }

}
