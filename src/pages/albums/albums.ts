import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";

/**
 * Generated class for the AlbumsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-albums',
  templateUrl: 'albums.html',
})
export class AlbumsPage {

  id:string
  res:any
  albums : string[] = []


  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {
    this.id = navParams.get('id')
    console.log(this.id)
    this.getAlbums()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumsPage');
  }

   url = "https://thumbnails.trvl-media.com/CTZxboXkhjz6S8845vurBDycldQ=/768x432/images.trvl-media.com/media/content/shared/images/travelguides/destination/180023/Sao-Paulo-55149.jpg"

  getAlbums(){
    this.spotifyProvider.searchAlbums(this.id).subscribe(
      data=>{
        this.res = data
        for (let album of this.res.items){
         this.albums.push(album)
        }
        console.log(this.albums)
      },err=>{
        console.log(err)

      }
    )
  }

  add(albumId){
    console.log(albumId)
    this.spotifyProvider.getAlbumsTracks(albumId).subscribe(
      data=>{
        this.res = data
        let allTracks: string[] = []
        for (let track of this.res.albums[0].tracks.items){
          allTracks.push(track.uri)
        }
        console.log(allTracks)
        this.addToPlaylist(allTracks)
      }
    )
  }

  addToPlaylist(tracks){
    this.spotifyProvider.addTracksToPlaylist(tracks).subscribe(
      data=>{
        console.log(data)
      },err=>{
        console.log(err)
      }
    )
  }
}
