import {AngularFireStorage} from 'angularfire2/storage';
import { Injectable } from '@angular/core';
/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(private angularStorage: AngularFireStorage) {
    console.log('Hello StorageProvider Provider');
  }

  public uploadImage(pictureName, image){
    return this.angularStorage.ref('pictures/' + pictureName).putString(image,'data_url');
  }

  public getDownLoadUrl(pictureName){
    return this.angularStorage.ref('pictures/' + pictureName).getDownloadURL();
  }
}
