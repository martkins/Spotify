import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddArtistPage} from "../add-artist/add-artist";
import {SongPage} from "../song/song";
import {PlaylistPage} from "../playlist/playlist";
import {GenrePage} from "../genre/genre";

/**
 * Generated class for the PlaylistMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
  //TODO: Implementare HTML (con cards?)

@IonicPage()
@Component({
  selector: 'page-playlist-menu',
  templateUrl: 'playlist-menu.html',
})
export class PlaylistMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistMenuPage');
  }


  pushToAddArtist(){
    this.navCtrl.push(AddArtistPage)
  }

  pushToAddSong(){
    this.navCtrl.push(SongPage)
  }

  pushToPlaylists(){
    this.navCtrl.push(PlaylistPage)
  }

  pushToAddGenre(){
    this.navCtrl.push(GenrePage)
  }

}
