import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";

/**
 * Generated class for the PlaylistFollowedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playlist-followed',
  templateUrl: 'playlist-followed.html',
})
export class PlaylistFollowedPage {

  private res:any
  private numPlaylists
  private range = (N) => Array.from({length: N}, (v, k) => k+1)
  private followedPlaylists = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistFollowedPage');
    this.showFollowedPlaylist()
  }

  showFollowedPlaylist(){
    this.spotifyProvider.getCurrentUserPlaylist().subscribe(data=>{
      this.res = data;
      let index2 = -1
      this.numPlaylists = this.range(this.res.items.length)
      for (let index in this.numPlaylists) {
        if (this.res.items[index].owner.id.toString() != this.spotifyProvider.userId.toString()){
          index2 = index2+1
          if (this.res.items[index].images[0] == null) {
            this.followedPlaylists[index2] = new playlist(this.res.items[index].name,
              'http://www.thetravelboss.com/images/latest-img1.jpg',
              this.res.items[index].tracks.total,
              this.res.items[index].id)
          }
          else {
            this.followedPlaylists[index2] = new playlist(this.res.items[index].name,
              this.res.items[index].images[0].url,
              this.res.items[index].tracks.total,
              this.res.items[index].id)
          }
        }
      }
    })
  }

  addAllTracks(idPlaylist){
    this.spotifyProvider.getPlaylistsTracks(idPlaylist).subscribe(
      data=>{
        this.res = data
        console.log(this.res)
        let uris: string[] = []
        for (let item of this.res.items){
          uris.push(item.track.uri)
        }
        this.addToPlaylist(uris)
      }, err=>{
        console.log(err)
      }
    )
  }

  addToPlaylist(tracks){
    this.spotifyProvider.addTracksToPlaylist(tracks).subscribe(
      data=>{
        console.log(data)
      },err=>{
        console.log(err)
      }
    )
  }
}


class playlist {
  constructor(
    public name: string,
    public img: any,
    public numTracks: number,
    public id: string) { }
}

