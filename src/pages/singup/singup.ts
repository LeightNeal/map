import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

/**
 * Generated class for the SingupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private auth: AuthenticationProvider, private alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingupPage');
  }

  singup(email: string, password: string, password2: string) {
    if(password2 == password){
      this.auth.registerWithEmail(email, password)
      .then(res => {
        console.log(res);
        this.navCtrl.pop();
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      this.showAlertUser();
    }
  }

  private showAlertUser(){
    this.alert.create({
      title: 'Error',
      subTitle: 'Las contraseñas no coinciden',
      buttons: ['OK']
    }).present();
  }
}
