import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Keyboard} from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";
import {AddSongPage} from "../add-song/add-song";

/**
 * Generated class for the SearchSongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-song',
  templateUrl: 'search-song.html',
})
export class SearchSongPage {

  id:string // id canzone
  res:any
  items:any

  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider, public keyboard:Keyboard) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchSongPage');
  }

  pushToAddSong(){
    this.navCtrl.push(AddSongPage,{
      id:this.id
    })
  }

  chooseSong(id){
    this.id = id
    this.keyboard.close()
    this.pushToAddSong()
  }

  // Commento perchè mi dà errore, mi dice che searchSong non esite su SpotifyProvider

  // search(event:any){
  //   let value = event.target.value;
  //   console.log(value);
  //   this.spotifyProvider.searchSong(value).subscribe(
  //     data=>{
  //       console.log(data)
  //       //this.items = data.artists.items;
  //       this.res = data;
  //       this.items = this.res.tracks.items;
  //       console.log(this.items);
  //     },
  //     error=>{
  //       console.log(error);
  //     }
  //   )
  // }




}


