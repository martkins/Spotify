import { Component,  ViewChildren, QueryList} from '@angular/core';
import { NavController , Slides, App, AlertController} from 'ionic-angular';
import { SpotifyProvider} from "../../providers/spotify/spotify";
import {ArtistAlbumsPage} from "../artist-albums/artist-albums";
import {LyricsPage} from "../lyrics/lyrics";
import { HomeLoginPage } from '../home-login/home-login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  private resp:any;
  private items:any;
  private ownedPlaylists = [];
  private followedPlaylists = []
  private range = (N) => Array.from({length: N}, (v, k) => k+1) ;
  private numPlaylists: any;
  private notLoggedIn: boolean;
  @ViewChildren(Slides)  slides: QueryList<Slides>;

  constructor(public navCtrl: NavController, public spotifyProvider:SpotifyProvider, private app:App,
    private alertCtrl: AlertController) {

  }

  ionViewWillEnter(){
    this.showOwnedPlaylist()
    this.showFollowedPlaylist()
  }

  ionViewDidEnter(){
    console.log('tuma2')
    this.getUserId()
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

  searchAlbums(id:string,name:string){this.app.getRootNav().setRoot(HomeLoginPage);
    this.navCtrl.push(ArtistAlbumsPage,{
      id:id,
      name:name
    })
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
        if (this.resp.items[index].owner.id.toString() == this.spotifyProvider.userId.toString()){
          index2 = index2+1
          if (this.resp.items[index].images[0] == null) {
            this.ownedPlaylists[index2] = new playlist(this.resp.items[index].name,
              'http://www.thetravelboss.com/images/latest-img1.jpg',
              this.resp.items[index].tracks.total,
              this.resp.items[index].uri)
          }
          else {
            this.ownedPlaylists[index2] = new playlist(this.resp.items[index].name,
              this.resp.items[index].images[0].url,
              this.resp.items[index].tracks.total,
              this.resp.items[index].uri)
          }
        }
      }
    })
  }

  showFollowedPlaylist(){
    this.spotifyProvider.getCurrentUserPlaylist().subscribe(data=>{
      this.resp = data;
      let index2 = -1
      this.numPlaylists = this.range(this.resp.items.length)
      for (let index in this.numPlaylists) {
        if (this.resp.items[index].owner.id.toString() != this.spotifyProvider.userId.toString()){
          index2 = index2+1
          if (this.resp.items[index].images[0] == null) {
            this.followedPlaylists[index2] = new playlist(this.resp.items[index].name,
              'http://www.thetravelboss.com/images/latest-img1.jpg',
              this.resp.items[index].tracks.total,
              this.resp.items[index].uri)
          }
          else {
            this.followedPlaylists[index2] = new playlist(this.resp.items[index].name,
              this.resp.items[index].images[0].url,
              this.resp.items[index].tracks.total,
              this.resp.items[index].uri)
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
        console.log('tuma')
        let alert = this.alertCtrl.create({
          title: 'Login non effettuato',
          subTitle: 'Devi fare login su Spotify!',
          buttons: ['Okplay']
        });
        alert.present();
        this.app.getRootNav().setRoot(HomeLoginPage)
      }
    )
  }

}

class playlist {
  constructor(
    public name: string,
    public img: any,
    public numTracks: number,
    public uri: string) { }
}
