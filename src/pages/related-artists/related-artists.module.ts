import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RelatedArtistsPage } from './related-artists';

@NgModule({
  declarations: [
    RelatedArtistsPage,
  ],
  imports: [
    IonicPageModule.forChild(RelatedArtistsPage),
  ],
})
export class RelatedArtistsPageModule {}
