import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaylistSpotifyPage } from './playlist-spotify';

@NgModule({
  declarations: [
    PlaylistSpotifyPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaylistSpotifyPage),
  ],
})
export class PlaylistSpotifyPageModule {}
