import { Component } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page';
import { NavController,NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AlertController, LoadingController, Platform} from '@ionic/angular';
import { NgForm } from 'ProyectoAppMoviles/node_modules/@angular/forms/forms';
import { LoginResponse } from '../login-response';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isLoading = false;
  isLoginMode= true;
  usarPicker = false;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform
    ) {}

    ngOnInit() {
      console.log('Platform: ', this.platform);
      if((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')){
        this.usarPicker = true;
      }
      
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
              case 'EMAIL_EXISTS':
                mensaje = 'El usuario ya existe';
                break;
              case 'EMAIL_NOT_FOUND':
                mensaje = 'El usuario no existe';
                break;
              case 'INVALID_PASSWORD':
                mensaje = 'Contraseña incorrecta';
                break;    
            }
            this.showAlert('Error', mensaje);
          }
        );
      })
    }
    onLogout(){
      this.alertCtrl.create({
        header: ' Cerrar Sesion',
        message: 'Estas seguro de cerrar la sesion?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'continuar',
            handler: () => {
              this.loginService.deleteSession();
              this.router.navigateByUrl('/login');
            }
          }
        ]
      }).then(alertEl => {
        alertEl.present();
      });

    }

}
