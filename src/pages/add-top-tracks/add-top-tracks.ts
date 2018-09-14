import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";

/**
 * Generated class for the AddTopTracksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-top-tracks',
  templateUrl: 'add-top-tracks.html',
})
export class AddTopTracksPage {
  term = "short_term"                // periodo top tracks
  res:any

  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTopTracksPage');
  }


  addTopTracks(){
    this.spotifyProvider.getTopTracks(this.term).subscribe(
      data=>{
        this.res = data;
        let uris = []
        for (let t of this.res.items){
          uris.push(t.uri)
        }
        console.log(uris)
        this.addTracksToPlaylist(uris)
      },err=>{
        console.log(err)
      }
    )

  }

  addTracksToPlaylist(tracks){  //aggiungere più tracce insieme
    this.spotifyProvider.addTracksToPlaylist(tracks).subscribe(
      data=>{
        console.log(data)
      },err=>{
        console.log(err)
      }
    )
  }
}
