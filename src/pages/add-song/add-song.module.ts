import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSongPage } from './add-song';

@NgModule({
  declarations: [
    AddSongPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSongPage),
  ],
})
export class AddSongPageModule {}
