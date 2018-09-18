import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagePlaylistPage } from './manage-playlist';

@NgModule({
  declarations: [
    ManagePlaylistPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagePlaylistPage),
  ],
})
export class ManagePlaylistPageModule {}
