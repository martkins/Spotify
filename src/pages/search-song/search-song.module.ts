import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchSongPage } from './search-song';

@NgModule({
  declarations: [
    SearchSongPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchSongPage),
  ],
})
export class SearchSongPageModule {}
