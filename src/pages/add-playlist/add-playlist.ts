import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddArtistPage} from "../add-artist/add-artist";
import {SpotifyProvider} from "../../providers/spotify/spotify";

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

  name = 'Prova Playlist'
  description = 'Prova'
  isPublic = false
  res : any
  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {
    this.getUserId()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlaylistPage');
  }


  pushToAddArtist(){
    this.navCtrl.push(AddArtistPage)
  }

  getUserId(){
    this.spotifyProvider.getUserProfile().subscribe(
      data=>{
        this.res= data
        this.spotifyProvider.userId = this.res.id
      },err =>{
        console.log(err)
      }
    )
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
}
