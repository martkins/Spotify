import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";

/**
 * Generated class for the AddTopTracksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-top-tracks',
  templateUrl: 'add-top-tracks.html',
})
export class AddTopTracksPage {
  res:any

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTopTracksPage');
  }


  addTopTracks(term){
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'Add this to your playlist?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.spotifyProvider.getTopTracks(term).subscribe(
              data=>{
                this.res = data;
                let uris = []
                for (let t of this.res.items){
                  uris.push(t.uri)
                }
                this.addTracksToPlaylist(uris)
              },err=>{
                console.log(err)
              }
            )            
            console.log('Agree clicked');
          }
        }
      ]
    });
    alert.present()

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

  donePlaylist(){
    this.navCtrl.popToRoot()
  }

}
