import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";

/**
 * Generated class for the PlaylistOwnedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playlist-owned',
  templateUrl: 'playlist-owned.html',
})
export class PlaylistOwnedPage {

  private res:any
  private numPlaylists
  private range = (N) => Array.from({length: N}, (v, k) => k+1)
  private ownedPlaylists = [];



  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistOwnedPage');
  }

  showOwnedPlaylist(){
    this.spotifyProvider.getCurrentUserPlaylist().subscribe(data=>{
      this.res = data;
      let index2 = -1
      this.numPlaylists = this.range(this.res.items.length)
      for (let index in this.numPlaylists) {
        if (this.res.items[index].owner.id.toString() == this.spotifyProvider.userId.toString()){
          index2 = index2+1
          if (this.res.items[index].images[0] == null) {
            this.ownedPlaylists[index2] = new playlist(this.res.items[index].name,
              'http://www.thetravelboss.com/images/latest-img1.jpg',
              this.res.items[index].tracks.total,
              this.res.items[index].uri)
          }
          else {
            this.ownedPlaylists[index2] = new playlist(this.res.items[index].name,
              this.res.items[index].images[0].url,
              this.res.items[index].tracks.total,
              this.res.items[index].uri)
          }
        }
      }
    })
  }

}

class playlist {
  constructor(
    public name: string,
    public img: any,
    public numTracks: number,
    public id: string) { }
}
