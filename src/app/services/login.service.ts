import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../login-response';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../usuario';
import { from } from 'rxjs';
import { Storage } from '@capacitor/storage';
import {switchMap, take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private StoreAuthData(userId: string, email: string, token: string, tokenExpirationDate: string){
    const data = JSON.stringify({userId, email, token, tokenExpirationDate});
    Storage.set({key: 'authData', value: data});
  }
  private usuario = new BehaviorSubject<Usuario>(null);

  constructor(private http: HttpClient
    ) {}
  singUp(email: string, password: string){
    return this.http.post<LoginResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {email, password, returnSecur: true}
    );
  }

  login(email: string, password: string){
    return this.http.post<LoginResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {email, password, returnSecure: true}
    ).pipe(tap(this.setUserDate.bind(this)));
  }

  get usuarioLoggeado(){
    return this.usuario.asObservable().pipe(map(user => {
      if(user){
        return !!user.token;
      }else{
        return false;
      }
    }));
  }

  private setUserDate(userData: LoginResponse){
    const expTime = new Date(new Date().getTime() + (+userData.expiresIn*1000));
    this.usuario.next(new Usuario(userData.localId, userData.email, userData.idToken, expTime));
    this.StoreAuthData(userData.localId, userData.email, userData.idToken, expTime.toISOString());
  }

  autoLogin(){
    return from(Storage.get({key: 'authData'})).pipe(map(storedData => {
      if(!storedData || !storedData.value){
        return null;
      }
      const parsedData = JSON.parse(storedData.value) as {userId: string; email: string; token: string; tokenExpirationDate: string};
      const expTime = new Date(parsedData.tokenExpirationDate);
      if(expTime <= new Date()){
        return null;
      }
      const user = new Usuario(parsedData.userId, parsedData.email, parsedData.token, expTime);
      return user;
    }),
    tap(user => {
      if(user){
        this.usuario.next(user);
      }
    }),
    map(user => !!user)
    );
  }
  deleteSession(){
    this.usuario.next(null);
    Storage.remove({key: 'authData'});
  }
}


