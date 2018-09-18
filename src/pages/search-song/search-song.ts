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
  uri:any
  items:any

  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider, public keyboard:Keyboard) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchSongPage');
  }

  pushToAddSong(){
    this.navCtrl.push(AddSongPage,{
      id:this.id,
      uri:this.uri
    })
  }

  chooseSong(id,uri){
    this.id = id
    this.uri = uri
    this.keyboard.close()
    this.pushToAddSong()
  }


  search(event:any){
    let value = event.target.value;
    console.log(value);
    this.spotifyProvider.searchSong(value).subscribe(
      data=>{
        console.log(data)
        //this.items = data.artists.items;
        this.res = data;
        this.items = this.res.tracks.items;
        console.log(this.items);
      },
      error=>{
        console.log(error);
      }
    )
  }




}



