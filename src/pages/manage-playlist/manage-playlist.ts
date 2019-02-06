import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";
import {PlaylistMenuPage} from "../playlist-menu/playlist-menu";

/**
 * Generated class for the ManagePlaylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-playlist',
  templateUrl: 'manage-playlist.html',
})
export class ManagePlaylistPage {
  public playlist:Playlist
  private res:any
  allTracks = []


  constructor(public alertCtrl: AlertController, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              private spotifyProvider:SpotifyProvider,
              private toastCtrl: ToastController) {
    this.playlist = navParams.get('playlist')
    this.spotifyProvider.playlistId = this.playlist.id
    this.getTracks(this.playlist.id)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePlaylistPage');

  }


  pushToPlaylistMenu(){
    this.navCtrl.push(PlaylistMenuPage)
  }

  deleteTrack(uri){
    this.spotifyProvider.removeFromPlaylist(uri).subscribe(
      ()=>{
        this.presentToast();
      },err=>(
        console.log(err)
      )
    )
  }

  renamePlaylist(idPlaylist){
    let alert = this.alertCtrl.create({
      title: 'Rename Playlist',
      inputs: [
        {
          name: 'newName',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.spotifyProvider.changePlaylistDetails(idPlaylist,data.newName).subscribe(
              () => {
                this.presentAlert()               
              },err=>(
                console.log(err)
              )
            )
          } 
        }
      ]
    })
    alert.present()
  }


  getTracks(idPlaylist){
    this.spotifyProvider.getPlaylistsTracks(idPlaylist).subscribe(
      data=>{
        this.res = data
        let index = -1
        console.log(this.res.items[0].track)
        for (let item of this.res.items){
          index = index +1
          this.allTracks[index] = new Track(item.track.name,
            item.track.artists[0].name,
            item.track.uri)
        }
      },err=>{
        console.log(err)
      }
    )


  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      title: 'Name was successfully changed!',
      // message: 'This is an alert message.',
      buttons: [
        {
          text: 'Ok',          
          handler: data => {            
            this.navCtrl.setRoot(HomePage)
          }
        }
      ]
    });

    await alert.present();
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Track successfully deleted',
      duration: 2000
    });
    toast.present();
  }

}


class Playlist {
  constructor(
    public name: string,
    public img: any,
    public numTracks: number,
    public uri: string,
    public id:string,
  ) { }
}

class Track {
  constructor(
    public name: string,
    public artist: string,
    public uri: string) { }
}

