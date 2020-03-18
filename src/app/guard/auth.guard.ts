import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginServiceService } from 'src/app/services/login-service.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { take, map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private loginServiceService: LoginServiceService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.loginServiceService.isLoggedIn2().then((value) => {
        if (value) {
            return true;
        } else {
            this.router.navigate(['./login']);
            return false;
        }
    });
      // not logged in so redirect to login page with the return url
      
  }
}
