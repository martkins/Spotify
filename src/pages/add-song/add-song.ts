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
  allTracks = []      // tracce restituite da API
  uri:any

  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {
    this.id = navParams.get('id')
    this.uri = navParams.get('uri')
    this.addTrackToPlaylist(this.uri, 'add-circle')
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
          this.allTracks[index] = new Track(t.name,
            t.album.images[0].url,
            t.artists[0].name,
            'add-circle',
            t.uri)
        }


      },err=>{
        console.log(err)
      }
    )
  }

  addTrackToPlaylist(track, t){  //aggiungere traccia singola
    if (t.icon == 'add-circle'){
      t.icon = 'checkmark-circle'
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
  }

  addTracksToPlaylist(tracks){  //aggiungere più tracce insieme
    let uris = []
    for (let t of this.allTracks){
      t.icon = 'checkmark-circle'
      uris.push(t.uri)
    }
    console.log(uris)
    this.spotifyProvider.addTracksToPlaylist(uris).subscribe(
      data=>{
        console.log(data)
      },err=>{
        console.log(err)
      }
    )
  }

  donePlaylist(){
    this.navCtrl.popToRoot()
  }

}

class Track {
  constructor(
    public name: string,
    public img: any,
    public artist: string,
    public icon:string,
    public uri: string) { }
}

