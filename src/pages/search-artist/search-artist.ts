import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";
import {AddArtistPage} from "../add-artist/add-artist";

/**
 * Generated class for the SearchArtistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-artist',
  templateUrl: 'search-artist.html',
})
export class SearchArtistPage {

  id:string //id artista
  res: any
  items:any

  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider, public keyboard:Keyboard) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchArtistPage');
  }

  chooseArtist(id){
    this.id = id
    this.keyboard.close()
    this.pushToAddArtist()
  }
  search(event:any){
    let value = event.target.value;
    console.log(value);
    this.spotifyProvider.searchArtists(value).subscribe(
      data=>{
        console.log(data)
        //this.items = data.artists.items;
        this.res = data;
        this.items = this.res.artists.items;
        console.log(this.items);
      },
      error=>{
        console.log(error);
      }
    )
  }

  pushToAddArtist(){
    this.navCtrl.push(AddArtistPage,{
      id:this.id
    })
}

}
