import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeLoginPage } from './home-login';

@NgModule({
  declarations: [
    HomeLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeLoginPage),
  ],
})
export class HomeLoginPageModule {}
