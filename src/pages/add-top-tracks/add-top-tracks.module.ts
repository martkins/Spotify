import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTopTracksPage } from './add-top-tracks';

@NgModule({
  declarations: [
    AddTopTracksPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTopTracksPage),
  ],
})
export class AddTopTracksPageModule {}
