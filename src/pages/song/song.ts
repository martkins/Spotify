import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";

/**
 * Generated class for the SongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-song',
  templateUrl: 'song.html',
})
export class SongPage {


  id = '3JV7cTXVaOfKRhq17XyEoi' // id canzone
  number = '30'                 // # canzoni visualizzate
  term = "short_term"                // periodo top tracks
  res:any
  allTracks = []                // tracce restituite da API


  //TODO: Mettere opzione per avere le canzoni più ascoltate (short,medium,long term) invece che canzoni simili a una canzone cercata
  //TODO: Implementare la ricerca di canzoni.
  //TODO: Far decidere quante canzoni visualizzare (sempre in fase di ricerca)
  //TODO: Far decidere quante Top Tracks aggiungere? O aggiungerne automaticamente un numero fissato (50)?
  //TODO: Implementare HTML con una checkbox (o qualcosa di simile)
  //TODO: Mettere un pulsante che aggiunga tutte le canzoni automaticamente



  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {
    this.getSongsList();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongPage');

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
        console.log(this.allTracks[0].img)


      },err=>{
        console.log(err)
      }
    )
  }

  addTopTracks(){
    this.spotifyProvider.getTopTracks(this.term).subscribe(
      data=>{
        this.res = data;
        let uris = []
        for (let t of this.res.items){
          uris.push(t.uri)
        }
        console.log(uris)
        this.addTracksToPlaylist(uris)
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

  addTracksToPlaylist(tracks){  //aggiungere più tracce insieme
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
