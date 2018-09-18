import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";

/**
 * Generated class for the PlaylistOwnedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playlist-owned',
  templateUrl: 'playlist-owned.html',
})
export class PlaylistOwnedPage {

  private res:any
  private numPlaylists
  private range = (N) => Array.from({length: N}, (v, k) => k+1)
  private ownedPlaylists = [];



  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistOwnedPage');
    this.showOwnedPlaylist()
  }

  showOwnedPlaylist(){
    this.spotifyProvider.getCurrentUserPlaylist().subscribe(data=>{
      this.res = data;
      let index2 = -1
      this.numPlaylists = this.range(this.res.items.length)
      for (let index in this.numPlaylists) {
        if (this.res.items[index].owner.id.toString() == this.spotifyProvider.userId.toString()){
          index2 = index2+1
          if (this.res.items[index].images[0] == null) {
            this.ownedPlaylists[index2] = new Playlist(this.res.items[index].name,
              'http://www.thetravelboss.com/images/latest-img1.jpg',
              this.res.items[index].tracks.total,
              this.res.items[index].id)
          }
          else {
            this.ownedPlaylists[index2] = new Playlist(this.res.items[index].name,
              this.res.items[index].images[0].url,
              this.res.items[index].tracks.total,
              this.res.items[index].id)
          }
        }
      }
    })
  }



  addAllTracks(idPlaylist){
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
            this.spotifyProvider.getPlaylistsTracks(idPlaylist).subscribe(
              data=>{
                this.res = data
                console.log(this.res)
                let uris: string[] = []
                for (let item of this.res.items){
                  uris.push(item.track.uri)
                }
                this.addToPlaylist(uris)
              }, err=>{
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

class Playlist {
  constructor(
    public name: string,
    public img: any,
    public numTracks: number,
    public id: string) { }
}
