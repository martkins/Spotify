import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddArtistPage} from "../add-artist/add-artist";
import {SongPage} from "../song/song";
import {PlaylistPage} from "../playlist/playlist";
import {GenrePage} from "../genre/genre";

import {SpotifyProvider} from "../../providers/spotify/spotify";
import {PlaylistMenuPage} from "../playlist-menu/playlist-menu";
import {SearchArtistPage} from "../search-artist/search-artist";

/**
 * Generated class for the AddPlaylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-playlist',
  templateUrl: 'add-playlist.html',
})
export class AddPlaylistPage {

  name:string;
  description:string;
  isPublic:boolean = false;
  res : any
  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {
  }

  ionViewWillEnter(){
    this.name=''
    this.description=''
    this.isPublic=false
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlaylistPage');
  }

  pushToPlaylistMenu(){
    //this.addPlaylist()
    this.navCtrl.push(PlaylistMenuPage)
  }


  addPlaylist(){
    this.spotifyProvider.createPlaylist(this.spotifyProvider.userId,this.name,this.description,this.isPublic).subscribe(
      data=>{
        this.res = data
        this.spotifyProvider.playlistId = this.res.id
        console.log(data)
      },err =>{
        console.log(err)
      }
    )
  }

  pushToSearchArtist(){
    this.navCtrl.push(SearchArtistPage)
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
