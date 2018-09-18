import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";

/**
 * Generated class for the AddSongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-song',
  templateUrl: 'add-song.html',
})
export class AddSongPage {
  id:string // id canzone
  number = '30'                 // # canzoni visualizzate
  res:any
  allTracks = []                // tracce restituite da API

  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {
    this.id = navParams.get('id')
    this.getSongsList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSongPage');
  }

  getSongsList(){
    this.spotifyProvider.getRaccomandatedSongs(this.id,this.number).subscribe(
      data=>{
        this.res = data
        console.log(this.res)
        let index = -1
        for (let t of this.res.tracks){
          index = index +1
          this.allTracks[index] = new track(t.name,
            t.album.images[0].url,
            t.artists[0].name,
            t.uri)
        }


      },err=>{
        console.log(err)
      }
    )
  }

  addTrackToPlaylist(track){  //aggiungere traccia singola
    let uri = []
    uri.push(track)
    this.spotifyProvider.addTracksToPlaylist(uri).subscribe(
      data=>{
        console.log(data)
      },err=>{
        console.log(err)
      }
    )
  }

  addTracksToPlaylist(tracks){  //aggiungere più tracce insieme TODO
    this.spotifyProvider.addTracksToPlaylist(tracks).subscribe(
      data=>{
        console.log(data)
      },err=>{
        console.log(err)
      }
    )
  }
}

class track {
  constructor(
    public name: string,
    public img: any,
    public artist: string,
    public uri: string) { }
}
