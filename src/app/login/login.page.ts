import { Component, OnInit } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page';
import { NavController,NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AlertController, LoadingController} from '@ionic/angular';
import { NgForm } from 'ProyectoAppMoviles/node_modules/@angular/forms/forms';
import { LoginResponse } from '../login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading = false;
  isLoginMode= true;
  tab1: any = TabsPage;
  constructor(private navController: NavController, private navParams: NavParams,
    private loginService: LoginService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
  }

  showAlert(titulo: string, mensaje: string){
    this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    }).then(alertEl => alertEl.present());
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return false;
    }
    const user = form.value.user;
    const pass = form.value.pass;

    this.auth(user, pass);
  }

  auth(email: string, password: string){
    this.isLoading = true;
    this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Validando...'
    })
    .then(loadingEl => {
      loadingEl.present();

      let auth0bs: Observable<LoginResponse>;
      if(this.isLoginMode){
        auth0bs = this.loginService.login(email, password);
      }
      else{
        auth0bs = this.loginService.singUp(email, password);
      }
      auth0bs.subscribe(
        resp => {
          console.log(resp);
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/home');
        },
        errorResponse => {
          console.log(errorResponse);
          this.isLoading = false;
          loadingEl.dismiss();
          const error = errorResponse.error.error.message;
          let mensaje = 'Acceso Incorrecto';
          switch(error){
            case 'Email_Exists':
              mensaje = 'El usuario ya existe';
              break;
            case 'Email_Not_Found':
              mensaje = 'El usuario no existe';
              break;
            case 'Invalid_Password':
              mensaje = 'Contraseña incorrecta';
              break;    
          }
          this.showAlert('Error', mensaje);
        }
      );
    })
  }

}
