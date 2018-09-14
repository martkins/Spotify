import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";
import {AddTopTracksPage} from "../add-top-tracks/add-top-tracks";
import {SearchSongPage} from "../search-song/search-song";

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





  //TODO: Mettere opzione per avere le canzoni più ascoltate (short,medium,long term) invece che canzoni simili a una canzone cercata
  //TODO: Implementare la ricerca di canzoni.
  //TODO: Far decidere quante canzoni visualizzare (sempre in fase di ricerca)
  //TODO: Far decidere quante Top Tracks aggiungere? O aggiungerne automaticamente un numero fissato (50)?
  //TODO: Implementare HTML con una checkbox (o qualcosa di simile)
  //TODO: Mettere un pulsante che aggiunga tutte le canzoni automaticamente



  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongPage');

  }

  pushToAddTopTracks(){
    this.navCtrl.push(AddTopTracksPage)
  }

  pushToSearchSong(){
    this.navCtrl.push(SearchSongPage)
  }








}
