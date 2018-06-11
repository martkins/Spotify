import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenrePage } from './genre';

@NgModule({
  declarations: [
    GenrePage,
  ],
  imports: [
    IonicPageModule.forChild(GenrePage),
  ],
})
export class GenrePageModule {}
