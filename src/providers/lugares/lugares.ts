import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class LugaresProvider {

  constructor(public afDB: AngularFireDatabase) {
    console.log('Hello LugaresProvider Provider');
  }

  public getLugares(){
    return this.afDB.list('/lugares/');
  }

  public getLugar(id){
    return this.afDB.object(`/lugares/${id}`);
  }

  public createLugar(lugar){
    return this.afDB.database.ref(`/lugares/${lugar.id}`).set(lugar);
  }

  public editLugar(lugar){
    return this.afDB.database.ref(`/lugares/${lugar.id}`).set(lugar);
  }

  public deleteLugar(id){
    return this.afDB.database.ref(`/lugares/${id}`).remove();
  }

}
