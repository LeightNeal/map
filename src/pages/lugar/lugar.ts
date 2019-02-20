import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TerceraPage } from '../tercera/tercera';
import { LugaresProvider } from '../../providers/lugares/lugares';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

/**
 * Generated class for the LugarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lugar',
  templateUrl: 'lugar.html',
})
export class LugarPage {

  lugares: any[];
  activo: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public lugaresProvider: LugaresProvider, public alertCtrl: AlertController,
    public autentication: AuthenticationProvider) {

    this.activo = false;
    this.lugaresProvider.getLugares().valueChanges()
    .subscribe( (lugares) => {
      this.lugares = lugares;
    });

    this.autentication.getStatus().subscribe(
     data => {
       console.log(data);
       if(!data){
        console.log('Sesión cerrada');
       }else{
         console.log('Sesión iniciada');
       }
      },
     error => console.log(error) 
    )
  }

  public regresar(){
    this.navCtrl.pop();
  }

  public navegarTercera(){
    this.navCtrl.push(TerceraPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LugarPage');
  }

  public irAVistaDetalle(){
    this.navCtrl.push(TerceraPage,{lugar: {nombre: '', direccion: '', categoria: ''}});
  }

  public irAVistaDetalleLugar(lugar){
    this.navCtrl.push(TerceraPage,{lugar: lugar});
  }

  public eventoPress(lugar, e: Event){
    lugar.activo = (lugar.activo) ? false : true;
    console.log('Has presionado el item');
  }

  public mostrarAlerta(lugar){
    const confirm = this.alertCtrl.create({
      title: `Eliminar`,
      message: `¿Está seguro que quiere eliminar a ${lugar.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => this.borrarLugar(lugar)
        }
      ]
    });
    confirm.present();
  }

  public borrarLugar(lugar){
    this.lugaresProvider.deleteLugar(lugar.id);
  }

  public logOut(){
    this.autentication.logOut()
    .then(data => {
      console.log(data);
      this.navCtrl.pop();
    })
    .catch(error => {
      console.log(error);
      this.showAlertLogOut();
    });
  }

  private showAlertLogOut(){
    this.alertCtrl.create({
      title: 'Advertencia',
      subTitle: 'Ocurrió un error',
      buttons: ['OK']
    }).present();
  }

  
}
