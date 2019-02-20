import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { LugaresProvider } from '../../providers/lugares/lugares';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { StorageProvider } from '../../providers/storage/storage';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the TerceraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tercera',
  templateUrl: 'tercera.html',
})

export class TerceraPage {
  lugar: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public lugaresProvider: LugaresProvider,
    private camera: Camera,
    private storage: StorageProvider,
    private location: Geolocation) {
    this.lugar = this.navParams.get('lugar');
    this.getLocation();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TerceraPage');
    console.log(this.lugar);
  }

  public guardarLugar(){
    if(this.lugar.id){
      this.lugaresProvider.createLugar(this.lugar);
    } else {
      this.lugar.id = Date.now();
      
      this.location.getCurrentPosition()
    .then((position) => {
      this.lugar.lat = position.coords.latitude;
      this.lugar.lng = position.coords.longitude;
      console.log(this.lugar.lat);
      console.log(this.lugar.lng);
      this.lugaresProvider.createLugar(this.lugar);
    })
    .catch((error) => console.log(error));
    }
    this.navCtrl.pop();
  }

  public subirFoto(source){
    try {
      const photoName = Date.now();
      this.upload(photoName + '.jpg', source); 
      this.getLocation();     
    } catch (error) {
      console.log(error);
    }
  }
  
  private upload(photoName, source){
    this.getPhoto(this.getOptions(source))
    .then( (photo) => {
      const base64Image = 'data:image/jpeg;base64,' + photo;
      this.storage.uploadImage(photoName, base64Image)
      .then( data => {
        this.storage.getDownLoadUrl(photoName)
        .subscribe( url => this.lugar.avatar = url, error => console.log(error));
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }

  private async getPhoto(options: CameraOptions){
    return await this.camera.getPicture(options);
  }

  private getOptions(source): CameraOptions{
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    }

    options.sourceType = (source == 'camera') ? this.camera.PictureSourceType.CAMERA
    : this.camera.PictureSourceType.PHOTOLIBRARY;
    
    return options;
  }

  private getLocation(){
    this.location.getCurrentPosition()
    .then((position) => {
      this.lugar.lat = position.coords.latitude;
      this.lugar.lng = position.coords.longitude;
      console.log(this.lugar.lat);
      console.log(this.lugar.lng);
    })
    .catch((error) => console.log(error));
  }

}
