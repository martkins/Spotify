import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PlaylistOwnedPage} from "../playlist-owned/playlist-owned";
import {PlaylistFollowedPage} from "../playlist-followed/playlist-followed";
import {PlaylistSpotifyPage} from "../playlist-spotify/playlist-spotify";

/**
 * Generated class for the PlaylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistPage');
  }


  pushToPlaylistOwned(){
    this.navCtrl.push(PlaylistOwnedPage,{

    })
  }

  pushToPlaylistFollowed(){
    this.navCtrl.push(PlaylistFollowedPage,{

    })
  }

  pushToPlaylistSpotify(){
    this.navCtrl.push(PlaylistSpotifyPage,{

    })
  }

  donePlaylist(){
    this.navCtrl.popToRoot()
  }

}
