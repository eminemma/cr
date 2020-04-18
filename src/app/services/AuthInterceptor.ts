import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginServiceService } from "./login-service.service";
import { AngularFireAuth } from "@angular/fire/auth";

import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginServiceService,
    private fireAuth: AngularFireAuth
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.loginService.isTokenExpired()) {
      this.loginService.isLoggedIn2().then((value) => {
        if (this.fireAuth.auth.currentUser !== null) {
          this.fireAuth.auth.currentUser
            .getIdToken(false)
            .then((token) => localStorage.setItem("token", token));
          request = request.clone({
            setHeaders: {
              Authorization: localStorage.getItem("token"),
            },
          });
        }

        return next.handle(request).pipe(
          catchError((error) => {
            if (error.status === 401 || error.status === 403) {
              // handle error
            }
            return throwError(error);
          })
        );
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem("token"),
        },
      });

      return next.handle(request);
    }
  }
}
