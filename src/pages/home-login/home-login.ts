import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";
import {TabsPage} from '../tabs/tabs';
import {HttpClient} from "@angular/common/http";
import {Platform} from "ionic-angular";
/**
 * Generated class for the HomeLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-login',
  templateUrl: 'home-login.html',
})
export class HomeLoginPage {

  constructor(private platform:Platform,public http:HttpClient,
    public navCtrl: NavController, public navParams: NavParams, public spotifyProvider: SpotifyProvider) {
  }

  ionViewDidLoad() {
  }

  login(){
    if (this.platform.is('mobile')){
      this.platform.ready().then(()=>{
        this.spotifyProvider.loginSpotify().then(success=>{
          alert('Logged In')
        },error=>{
          alert(error)
        })
      })
    }
    else {
      this.spotifyProvider.loginComputer()
    }
  }

  goHomePage(){
    this.navCtrl.push(TabsPage)
  }

}
