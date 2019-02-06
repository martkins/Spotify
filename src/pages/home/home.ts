import { Component,  ViewChildren, QueryList} from '@angular/core';
import { NavController , Slides, App, AlertController} from 'ionic-angular';
import { SpotifyProvider} from "../../providers/spotify/spotify";
import { HomeLoginPage } from '../home-login/home-login';
import {ManagePlaylistPage} from "../manage-playlist/manage-playlist";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  private resp:any;
  private items:any;
  public ownedPlaylists = [];
  public followedPlaylists = []
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
    this.getUserId()
  }

  pushToManagePlaylist(playlist){
    this.navCtrl.push(ManagePlaylistPage,{
      playlist:playlist
    })
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
            this.ownedPlaylists[index2] = new Playlist(this.resp.items[index].name,
              'http://www.thetravelboss.com/images/latest-img1.jpg',
              this.resp.items[index].tracks.total,
              this.resp.items[index].uri,
              this.resp.items[index].id)
          }
          else {
            this.ownedPlaylists[index2] = new Playlist(this.resp.items[index].name,
              this.resp.items[index].images[0].url,
              this.resp.items[index].tracks.total,
              this.resp.items[index].uri,
              this.resp.items[index].id)
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
            this.followedPlaylists[index2] = new Playlist(this.resp.items[index].name,
              'http://www.thetravelboss.com/images/latest-img1.jpg',
              this.resp.items[index].tracks.total,
              this.resp.items[index].uri,
              this.resp.items[index].id)
          }
          else {
            this.followedPlaylists[index2] = new Playlist(this.resp.items[index].name,
              this.resp.items[index].images[0].url,
              this.resp.items[index].tracks.total,
              this.resp.items[index].uri,
              this.resp.items[index].id)
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
        this.resp = data
        this.spotifyProvider.userId = this.resp.id
      },
      err =>{
        let alert = this.alertCtrl.create({
          title: 'You are not logged in',
          subTitle: 'Login on Spotify!',
          buttons: ['Ok']
        });
        alert.present();
        this.app.getRootNav().setRoot(HomeLoginPage)
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
