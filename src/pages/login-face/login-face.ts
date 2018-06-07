import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Facebook} from "@ionic-native/facebook";
import {HomePage} from "../home/home";
import {SpotifyProvider} from "../../providers/spotify/spotify";
import {HttpHeaders,HttpClient, HttpParams} from "@angular/common/http";
import {Platform} from "ionic-angular";
import {ProgressPage} from "../progress/progress";
import {LyricsPage} from "../lyrics/lyrics";

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

  private res : any;
  icon = "play"

  constructor(private platform:Platform,public http:HttpClient,public navCtrl: NavController, public navParams: NavParams, public facebook:Facebook, private spotifyProvider:SpotifyProvider) {
  }

  getUserProfile(){
    this.spotifyProvider.userProfile().subscribe(
      data=>{
        this.res = data;
        this.spotifyProvider.userId = this.res.id
        }
    )
  }

  getDevices(){
    this.spotifyProvider.devices().subscribe(
      data=>{
        this.res = data;
        console.log(JSON.stringify(data))
        if (this.res.devices.length > 0){
          this.spotifyProvider.deviceId = this.res.devices[0].id
          console.log(this.spotifyProvider.deviceId)
        }

      },err=>{
        console.log(JSON.stringify(err))
      }
    )
  }





  login(){
    if (this.platform.is('ios')){
      this.spotifyProvider.refresh().then(
        (res) => {
          this.spotifyProvider.resp = res;
          let temp = JSON.parse(this.spotifyProvider.resp.data)
          let token = temp.access_token
          this.spotifyProvider.authToken = 'Bearer ' + token
          this.spotifyProvider.requestHeader = new HttpHeaders().set('Content-Type','application/json').append('Authorization',this.spotifyProvider.authToken)
          console.log(this.spotifyProvider.authToken)
          console.log(this.spotifyProvider.requestHeader)
          this.navCtrl.push(HomePage)
        },err=>{
          let erro = err;
          console.log(JSON.stringify(err))
        })
    }
    else {
      this.spotifyProvider.loginComputer()
    }
    /*else {
      return this.refresh().then(
        (res) => {
          this.spotifyProvider.resp = res;
          this.spotifyProvider.authToken = 'Bearer ' + this.spotifyProvider.resp.access_token
          this.spotifyProvider.requestHeader = new HttpHeaders().set('Content-Type','application/json').append('Authorization',this.spotifyProvider.authToken)
          console.log(this.spotifyProvider.authToken)
          console.log(this.sp otifyProvider.requestHeader)
          this.navCtrl.push(HomePage)
        })
    }*/
  }
  pushToProgress(){
    this.navCtrl.push(ProgressPage)

  }

}
