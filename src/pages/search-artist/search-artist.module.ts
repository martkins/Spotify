import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchArtistPage } from './search-artist';

@NgModule({
  declarations: [
    SearchArtistPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchArtistPage),
  ],
})
export class SearchArtistPageModule {}
