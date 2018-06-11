import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpotifyProvider} from "../../providers/spotify/spotify";
import {ArtistAlbumsPage} from "../artist-albums/artist-albums";
import {LoginFacePage} from "../login-face/login-face";
import {LyricsPage} from "../lyrics/lyrics";
import {AddPlaylistPage} from "../add-playlist/add-playlist";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  private resp:any;
  private items:any;
  constructor(public navCtrl: NavController, public spotifyProvider:SpotifyProvider) {

  }


  search(event:any){
    let value = event.target.value;
    console.log(value);
    this.spotifyProvider.searchArtists(value).subscribe(
      data=>{
        //this.items = data.artists.items;
        this.resp = data;
        this.items = this.resp.artists.items;
        console.log(this.items);

      },
      error=>{
        console.log(error);
      }
    )
  }

  searchAlbums(id:string,name:string){
    this.navCtrl.push(ArtistAlbumsPage,{
      id:id,
      name:name
    })
  }

  loginSpotify(){
    this.navCtrl.push(LoginFacePage)
  }

  pushToLyrics(){
    this.navCtrl.push(LyricsPage)
  }

  pushToAddPlaylist(){
    this.navCtrl.push(AddPlaylistPage)

  }
}

