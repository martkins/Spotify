import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaylistOwnedPage } from './playlist-owned';

@NgModule({
  declarations: [
    PlaylistOwnedPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaylistOwnedPage),
  ],
})
export class PlaylistOwnedPageModule {}
