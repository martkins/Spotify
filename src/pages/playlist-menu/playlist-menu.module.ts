import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaylistMenuPage } from './playlist-menu';

@NgModule({
  declarations: [
    PlaylistMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaylistMenuPage),
  ],
})
export class PlaylistMenuPageModule {}
