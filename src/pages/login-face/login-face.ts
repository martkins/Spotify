import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";
import {HttpClient} from "@angular/common/http";
import {Platform} from "ionic-angular";
import {ProgressPage} from "../progress/progress";

/**
 * Generated class for the LoginFacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-face',
  templateUrl: 'login-face.html',
})
export class LoginFacePage {

  icon = "play"

  constructor(private platform:Platform,public http:HttpClient,public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider) {
  }


  login(){
    if (this.platform.is('mobile')){
      this.platform.ready().then(()=>{
        this.spotifyProvider.loginSpotify().then(success=>{
          alert('Accesso Effettuato')

        },error=>{
          alert(error)
        })
      })
    }
    else {
      this.spotifyProvider.loginComputer()
    }
  }
  pushToProgress(){
    this.navCtrl.push(ProgressPage)

  }




}
