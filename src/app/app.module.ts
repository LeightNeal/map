import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { LoginPageModule } from '../pages/login/login.module';
import { LugarPageModule } from '../pages/lugar/lugar.module';
import { MapaPageModule } from '../pages/mapa/mapa.module';
import { SingupPageModule } from '../pages/singup/singup.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { TerceraPageModule } from '../pages/tercera/tercera.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LugaresProvider } from '../providers/lugares/lugares';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { Camera } from '@ionic-native/camera/';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { StorageProvider } from '../providers/storage/storage';
import { Geolocation } from '@ionic-native/geolocation';

export const config = {
  apiKey: "AIzaSyC_fo3EB2XZRwHg0NE3ulcCN6MLtVAhXEA",
    authDomain: "my-project-1540850155747.firebaseapp.com",
    databaseURL: "https://my-project-1540850155747.firebaseio.com",
    projectId: "my-project-1540850155747",
    storageBucket: "my-project-1540850155747.appspot.com",
    messagingSenderId: "121165058127"
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    LoginPageModule,
    LugarPageModule,
    MapaPageModule,
    SingupPageModule,
    TabsPageModule,
    TerceraPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LugaresProvider,
    AuthenticationProvider,
    Camera,
    StorageProvider,
    Geolocation
  ]
})

export class AppModule {}
