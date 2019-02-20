import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  constructor(private angularFireAuth: AngularFireAuth) {
    
  }

  public logInWithEmail(email: string, password: string){
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public registerWithEmail(email:string, password: string){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public getStatus(){
    return this.angularFireAuth.authState;
  }

  public logOut(){
    return this.angularFireAuth.auth.signOut();
  }

}
