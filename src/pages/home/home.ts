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
  private playlists = [];
  private range = (N) => Array.from({length: N}, (v, k) => k+1) ;
  private numPlaylists: any;


  constructor(public navCtrl: NavController, public spotifyProvider:SpotifyProvider) {
    spotifyProvider.getCurrentUserPlaylist().subscribe(data=>{
      this.resp = data;
      this.numPlaylists = this.range(this.resp.items.length)
      for (let index in this.numPlaylists) {
        if (this.resp.items[index].images[1] == null) {
          this.playlists[index] = new playlist(this.resp.items[index].name,
                                              'http://www.thetravelboss.com/images/latest-img1.jpg',
                                              this.resp.items[index].tracks.total,
                                              this.resp.items[index].uri)
        }
        else {
          this.playlists[index] = new playlist(this.resp.items[index].name,
                                              this.resp.items[index].images[1].url,
                                              this.resp.items[index].tracks.total,
                                              this.resp.items[index].uri)
          }
      }
    })
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

  reproducePlaylist(id){
    this.spotifyProvider.playPlaylist(id).subscribe(
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
