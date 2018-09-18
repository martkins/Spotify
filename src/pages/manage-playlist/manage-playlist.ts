import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";
import {PlaylistMenuPage} from "../playlist-menu/playlist-menu";

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
  private res:any
  allTracks = []
  newName = 'tuma'
  isPublic= true


  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {
    this.playlist = navParams.get('playlist')
    this.spotifyProvider.playlistId = this.playlist.id
    this.getTracks(this.playlist.id)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePlaylistPage');

  }


  pushToPlaylistMenu(){
    this.navCtrl.push(PlaylistMenuPage)
  }

  deleteTrack(uri){
    this.spotifyProvider.removeFromPlaylist(uri).subscribe(
      data=>{
        console.log(data)
      },err=>(
        console.log(err)
      )
    )
  }

  renamePlaylist(idPlaylist,newName,isPublic){
    this.spotifyProvider.changePlaylistDetails(idPlaylist,newName,isPublic).subscribe(
      data=>{
      },err=>(
        console.log(err)
      )
    )
  }


  getTracks(idPlaylist){
    this.spotifyProvider.getPlaylistsTracks(idPlaylist).subscribe(
      data=>{
        this.res = data
        let index = -1
        console.log(this.res.items[0].track)
        for (let item of this.res.items){
          index = index +1
          this.allTracks[index] = new Track(item.track.name,
            item.track.artists[0].name,
            item.track.uri)
        }
      },err=>{
        console.log(err)
      }
    )


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

class Track {
  constructor(
    public name: string,
    public artist: string,
    public uri: string) { }
}
