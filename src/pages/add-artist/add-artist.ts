import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";

/**
 * Generated class for the AddArtistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-artist',
  templateUrl: 'add-artist.html',
})
export class AddArtistPage {
  id = '23TFHmajVfBtlRx5MXqgoz'
  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddArtistPage');
  }


  addTopTracks(){
    this.spotifyProvider.getArtistTopTracks(this.id).subscribe(
      data=>{
        console.log(data)
      }
    )
  }
}
