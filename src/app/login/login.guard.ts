import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import {switchMap, take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.loginService.usuarioLoggeado.pipe(
      take(1),
      switchMap(isAuth => {
        if(!isAuth){
          return this.loginService.autoLogin();
        }
        else{
          return of(isAuth);
        }
      }),
      tap(isAuth => {
        if(!isAuth){
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
