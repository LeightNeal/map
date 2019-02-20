import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingupPage } from './singup';

@NgModule({
  declarations: [
    SingupPage,
  ],
  imports: [
    IonicPageModule.forChild(SingupPage),
  ],
})
export class SingupPageModule {}
