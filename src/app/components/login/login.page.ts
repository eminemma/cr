import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginServiceService } from 'src/app/services/login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    private loginService: LoginServiceService
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loginService.isLoggedIn2().then((value) => {
      if (value) {        
        this.router.navigate(['./principal']);
      }
  });
  }

  loginFacebook() {
    this.loginService.loginFacebook();
  }

  logout() {
    this.loginService.logout();
  }

  getInfo() {
    this.loginService.getInfoFacebook();
  }
}
