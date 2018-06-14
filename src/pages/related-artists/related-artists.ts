import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";

/**
 * Generated class for the RelatedArtistsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
  //TODO: Implementare HTML (con cards?)
@IonicPage()
@Component({
  selector: 'page-related-artists',
  templateUrl: 'related-artists.html',
})
export class RelatedArtistsPage {

  id:string
  res:any
  artists: string[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams,private spotifyProvider:SpotifyProvider) {
    this.id = navParams.get('id')
    this.getArtists()

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RelatedArtistsPage');
  }


  getArtists(){
    this.spotifyProvider.getRelatedArtists(this.id).subscribe(
      data=>{
        this.res = data
        for (let artist of this.res.artists){
          this.artists.push(artist)
          console.log(artist.images[0].url)
        }
        console.log(this.res.artists)

      },err=>{
        console.log(err)
      }
    )
  }

  addTopTracks(idArtist){
    this.spotifyProvider.getArtistTopTracks(idArtist).subscribe(
      data=>{
        this.res = data
        let uris: string[] = []
        for (let track of this.res.tracks) {
          uris.push(track.uri)
        }
        this.addToPlaylist(uris)
      },err=>{
        console.log(err)
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
