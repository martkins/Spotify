import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ManagePlaylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-playlist',
  templateUrl: 'manage-playlist.html',
})
export class ManagePlaylistPage {
  private playlist:Playlist

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.playlist = navParams.get('playlist')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePlaylistPage');
  }

}


class Playlist {
  constructor(
    public name: string,
    public img: any,
    public numTracks: number,
    public uri: string,
    public id:string,
  ) { }
}
