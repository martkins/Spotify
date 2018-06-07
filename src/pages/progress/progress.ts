import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";
import {DatePipe} from "@angular/common";


/**
 * Generated class for the ProgressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html',
})
export class ProgressPage {


  image = 'https://s-media-cache-ak0.pinimg.com/originals/82/8d/9c/828d9ce86050123bd1ec659604fab945.jpg'
  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgressPage');
  }

}
