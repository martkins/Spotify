import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";
import {AlbumDetailsPage} from "../album-details/album-details";

/**
 * Generated class for the ArtistAlbumsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artist-albums',
  templateUrl: 'artist-albums.html',
})
export class ArtistAlbumsPage {
  private id:string
  private name:string
  private albums:any[]
  private resp:any

  constructor(public navCtrl: NavController, public navParams: NavParams,private spotifyProvider:SpotifyProvider) {
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('name');
    this.getAlbums()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtistAlbumsPage');
  }

  getAlbums(){
    this.spotifyProvider.searchAlbums(this.id).subscribe(
      data=>{
        this.resp = data
        this.albums = this.resp.items;
      },
      error=>{
        console.log(error)
      }
    )
  }

  viewAlbum(id:string){
    this.navCtrl.push(AlbumDetailsPage,{
      id:id
    })
  }
}
