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

  }

  ionViewWillEnter(){
    this.getUserId()
    this.showOwnedPlaylist()

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


  showOwnedPlaylist(){
    this.spotifyProvider.getCurrentUserPlaylist().subscribe(data=>{
      this.resp = data;
      let index2 = -1
      this.numPlaylists = this.range(this.resp.items.length)
      for (let index in this.numPlaylists) {
        if (this.resp.items[index].owner.id == this.spotifyProvider.userId){
          index2 = index2+1
          if (this.resp.items[index2].images[1] == null) {
            this.playlists[index2] = new playlist(this.resp.items[index2].name,
              'http://www.thetravelboss.com/images/latest-img1.jpg',
              this.resp.items[index2].tracks.total,
              this.resp.items[index2].uri)
          }
          else {
            this.playlists[index2] = new playlist(this.resp.items[index2].name,
              this.resp.items[index2].images[1].url,
              this.resp.items[index2].tracks.total,
              this.resp.items[index2].uri)
          }
        }



      }
    })
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

  getUserId(){
    this.spotifyProvider.getUserProfile().subscribe(
      data=>{
        this.resp= data
        this.spotifyProvider.userId = this.resp.id
      },err =>{
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
