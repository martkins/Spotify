import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SpotifyProvider } from '../../providers/spotify/spotify';

/**
 * Generated class for the GenrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-genre',
  templateUrl: 'genre.html',
})
export class GenrePage {

  // IMPORTANTE: il range degli slider prende solo valori integer, quindi poi dovremo convertire il range 0-100 in 0.0-1.0
  // una var nomeRange per ogni parametro
  danceabilityRange:any = {lower: 0, upper: 100}

  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider: SpotifyProvider, 
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenrePage');
  }

  showInfo(text){
    // mi sembra ci fosse un design pattern per fare sta merda (builder?), se ti fa troppo schifo con gli if lo faccio
    if (text == 'Danceability'){  
      var message = 'Describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.'
    }
    // mettere if per ogni parametro che vogliamo considerare
    const toast = this.toastCtrl.create({
      message,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.onDidDismiss(this.dismissHandler);
    toast.present();
  }

  private dismissHandler() {
    console.info('Toast onDidDismiss()');
  }

}
