import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";
import {InAppBrowser} from "@ionic-native/in-app-browser";

/**
 * Generated class for the AlbumDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-album-details',
  templateUrl: 'album-details.html',
})
export class AlbumDetailsPage {

  private id:string;
  private album:any;
  private imageLink:string;
  private tracks:any[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider, private iob:InAppBrowser) {
    this.id = this.navParams.get("id")
    this.getAlbum()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumDetailsPage');
  }

  getAlbum(){
    this.spotifyProvider.searchAlbum(this.id).subscribe(
      data=>{
        this.album = data;
        this.imageLink = this.album.images[0];
        this.tracks = this.album.tracks.items;
        this.spotifyProvider.albumId = this.album.id
        },
      error=>{
        console.log(error)
      }
    )
  }


  startTrack(){
    this.spotifyProvider.play().subscribe(
      data=>{
        let res = data
        console.log(res)
      },error=>{
        console.log(error)
      }
    )
  }
  playTrack(url:string){
    window.open(url,'_system')
  }

}
