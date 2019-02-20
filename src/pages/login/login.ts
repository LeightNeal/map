import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LugarPage } from '../lugar/lugar';
import { SingupPage } from '../singup/singup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private auth: AuthenticationProvider,
    private alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(email: string, password: string){
    this.auth.logInWithEmail(email, password)
    .then((data) => {
      console.log(data);
      this.navCtrl.push(LugarPage);
    })
    .catch(error => {
      console.log(error);
      this.showAlertUser();
    })
  }

  private showAlertUser(){
    this.alert.create({
      title: 'Advertencia, usuario inválido',
      subTitle: 'Tu email o tu contraseña son incorrectos',
      buttons: ['OK']
    }).present();
  }

  public navigateSingUp(){
    this.navCtrl.push(SingupPage);
  }
}
