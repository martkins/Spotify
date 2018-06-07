import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {InAppBrowserEvent} from "@ionic-native/in-app-browser";
import {HTTP} from "@ionic-native/http";
import {Platform} from "ionic-angular";


/*
  Generated class for the SpotifyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpotifyProvider {

  client_id = 'd0612aeb3d0741cb9939c51b25c75394'
  client_secret = '184bdc24e90a48b5984fbb79d1a00211'
  response_type = 'token'
  redirect_uri = 'http://localhost:8100/'
  state = 123
  scope = 'user-modify-playback-state%20user-read-playback-state%20user-library-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private%20playlist-read-collaborative%20user-read-recently-played%20user-top-read%20user-read-private%20streaming%20user-read-currently-playing%20user-follow-read'
  scopePhone = 'user-modify-playback-state user-modify-playback-state user-read-playback-state user-library-read user-library-modify playlist-read-private playlist-modify-public playlist-modify-private playlist-read-collaborative user-read-recently-played user-top-read user-read-private streaming user-read-currently-playing user-follow-read'
  refreshToken = 'AQAAE7GepH_ZJP7B-M54sdnkc_izZ2efjTjEyof3X2LNhR-UPEf0_BqcM4kb1P3bKkJQ4XoPtPFCB-ciFfjVDPH5Nn6ILwNE0VPso5Qlhfl_BJbyWf3P_Nn2OSpTqD9XwUA'
  urlRefreshToken = 'https://accounts.spotify.com/api/token'
  resp:any
  userId:any;
  deviceId:any;
  albumId: string
  res:any
  icon = "play"
  songName : ''
  artistName : ''
  lyricsMusixMatch = ''
  progressMs:any
  duration:any
  image:any

  body = {
    'grant_type': 'refresh_token',
    'client_id': this.client_id,
    'client_secret': this.client_secret,
    'refresh_token': this.refreshToken,
    'scope': this.scope
  }
  bodyPhone = {
    'grant_type':'refresh_token',
    'client_id':this.client_id,
    'client_secret':this.client_secret,
    'refresh_token':this.refreshToken,
    'scope':this.scopePhone
  }

  // code = 'AQA4Hj6AK5n5Kx9I9PQmd960Sx_eZuV5gL7ehoZgadWpK7swVd-uS-wRQHVzavPSa2yzK86nYNa71EvjA2vogN5QzvCpww0f7m5Fvfw7_fVLhemoV8Qh2TiBbHbqV2SZ60hsJ1gkte4TOcPKN3ig8DW4yxC34RofQIgbvLrXsH4aBIKSq0txDkD-fnw'
  // Per prendere il refreshToken, fare una GET per avere il code, poi fare una POST per avere il refreshToken


  private baseUrl:string = "https://api.spotify.com/v1"
  private searchUrl:string = this.baseUrl+'/search?q='
  private albumsUrl:string = this.baseUrl+'/artists/'
  private albumUrl:string = this.baseUrl+'/albums/'
  public authToken:string = ''
  //private authToken:string =  'Bearer BQDNK0aAox0UVPijXmzUxJ2Bli2GsG3BFdCWZurDCAhRLOxz5KKTO92koLjWFPrrpPmnvH9bWGEdtRvixA5fclphOzZt4wQXhRS6mt2c_hbXenYxhsMzM79jFw5aB-UphhSdM3Ww3Mgit06SFKgo44MvguV6EkgMlrBaxeHKXEsP0q5XhUoPQzcD1txwCw8kT0-i38YyeyDNLprRyjMCK8Ibi406d5tS1O5TDjHBCOuAwHZb_vOoBCztYC4'
  //private requestHeader = new HttpHeaders().set('Content-Type','application/json').append('Authorization',this.authToken)

  public requestHeader:any;



  constructor(public http: HttpClient,public HTTP:HTTP,private platform:Platform) {
    console.log('Hello SpotifyProvider Provider');
    if (this.platform.is('ios')){
      
    }
    else{
      if (window.location.href.toString().includes('token')) {
        let begin = window.location.href.toString().indexOf('=')
        let end = window.location.href.toString().indexOf('token_type')
        this.authToken = 'Bearer '+window.location.href.toString().slice(begin + 1, end - 1)
        this.requestHeader = new HttpHeaders().set('Content-Type','application/json').append('Authorization',this.authToken)
        console.log('token',this.authToken)
      }
    }

    }


  searchArtists(name:string){
    console.log('Token:',this.authToken)
    return this.http.get(this.searchUrl+name+'&type=artist',{
      headers:this.requestHeader
    })
  }
  searchAlbums(id:string){
    return this.http.get(this.albumsUrl+id+'/albums',{
      headers:this.requestHeader
    })
  }
  searchAlbum(id:string){
    return this.http.get(this.albumUrl+id,{
      headers:this.requestHeader
    })
  }

  loginComputer(){
    let browser = window.open('https://accounts.spotify.com/authorize?client_id=' + this.client_id + '&redirect_uri=' + this.redirect_uri + '&response_type=' + this.response_type + '&state=' + this.state + '&scope='+this.scope, '_system')

  }

  loginSpotify(){
    return new Promise((resolve,reject)=> {
      let browserRef = window.open('https://accounts.spotify.com/authorize?client_id=' + this.client_id + '&redirect_uri=' + this.redirect_uri + '&response_type=' + this.response_type + '&state=' + this.state + '&scope=' + this.scope,"_blank","location=no,clearsessioncache=yes,clearcache=yes")
      browserRef.addEventListener("loadstart", (event:InAppBrowserEvent) => {
        let responseParameters = ((event.url))
        if (event.url.includes('localhost:8100/#access')){
          let begin = event.url.toString().indexOf('=')
          let end = event.url.toString().indexOf('token_type')
          this.authToken = 'Bearer '+event.url.toString().slice(begin + 1, end - 1)
          this.requestHeader = new HttpHeaders().set('Content-Type','application/json').append('Authorization',this.authToken)
        }
        resolve('Ok')
      })
      browserRef.addEventListener("exit",function(event){
        reject("Canceled")
      })
    })

  }

  refresh() {
    let headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    return this.HTTP.post(this.urlRefreshToken, this.bodyPhone, headers)
  }

  userProfile(){
    return this.http.get(this.baseUrl+'/me',{
      headers:this.requestHeader
    })
  }

  devices(){
    return this.http.get(this.baseUrl+'/me/player/devices',{
      headers:this.requestHeader
    })
  }

  play(){
    return this.http.put(this.baseUrl+'/me/player/play',{
      "context_uri":"spotify:album:"+this.albumId
    },{
      headers:this.requestHeader
    })
  }

  playNextTrack(){
    return this.http.post(this.baseUrl+'/me/player/next',null,{
      headers:this.requestHeader
    }).subscribe(
      data=>{
        console.log(JSON.stringify(data))
      },err=>{
        console.log(JSON.stringify(err))
    }
    )
  }

  playPreviousTrack(){
    return this.http.post(this.baseUrl+'/me/player/previous',null,{
      headers:this.requestHeader
    }).subscribe(
      data=>{
        console.log(JSON.stringify(data))
      },err=>{
        console.log(JSON.stringify(err))
      }
    )
  }
  playOrPause(){
    this.devices().subscribe(
      data=>{
        this.res = data;
        console.log(JSON.stringify(data))
        if (this.res.devices.length > 0) {
          this.deviceId = this.res.devices[0].id
          if (this.res.devices[0].is_active == false){
            this.startDevice(this.deviceId).subscribe(
              data=>{
                console.log(JSON.stringify(data))
              },err=>{
                console.log(JSON.stringify(err))
              }
            )
          }
        }
      }
    )
    if (this.icon == "play"){
      this.playCurrent().subscribe(
        data=>{
          console.log(JSON.stringify(data))
          this.icon = "pause"
        },err =>{
          console.log(JSON.stringify(err))
          this.icon = "pause"
        }
      )
    }
    if (this.icon == "pause"){
      this.pauseCurrent().subscribe(
        data=>{
          console.log(JSON.stringify(data))
          this.icon = "play"
        },err =>{
          console.log(JSON.stringify(err))
          this.icon = "play"
        }
      )
    }

  }
  playCurrent(){
    return this.http.put(this.baseUrl+'/me/player/play',null,{
      headers:this.requestHeader
    })
  }
  pauseCurrent(){
    return this.http.put(this.baseUrl+'/me/player/pause',null,{
      headers:this.requestHeader
    })
  }
  startDevice(deviceId){
    return this.http.put(this.baseUrl+'/me/player',{
      'device_ids':[deviceId],
      'play':true
    },{
      headers:this.requestHeader
    })
  }
  getCurrentTrack(){
    return this.http.get(this.baseUrl+'/me/player/currently-playing',{
      headers:this.requestHeader
    })
  }
  seekPositionTrack(position){
    return this.http.put(this.baseUrl+'/me/player/seek?position_ms='+position,null,{
      headers:this.requestHeader
    })
  }

  /*processSongNameAndArtist(){
    let artist = this.artistName.toLowerCase()
    let song = this.songName.toLowerCase()
    artist = artist.replace(/[^0-9a-z]/gi,'')
    if (song.includes('feat.')){
      song = song.substring(0,song.indexOf('feat.')-1)
    }
    song = song.replace(/[^0-9a-z]/gi,'')
    if (artist.startsWith('the')){
      artist = artist.substr(3)
    }
    return [song,artist]
  }
  getHtmlPage(){
    let [song,artist] = this.processSongNameAndArtist()
    return this.http.get('https://www.azlyrics.com/lyrics/'+artist+'/'+song+'.html')
  }

  getHtmlPageIos(){
    let [song,artist] = this.processSongNameAndArtist()
    return this.HTTP.get('https://www.azlyrics.com/lyrics/'+artist+'/'+song+'.html',null,null)
  }*/


  processSongNameAndArtistMusixMatch(){
    let artist = this.artistName.toLowerCase()
    let song = this.songName.toLowerCase()
    if (song.includes('feat.')){
      song = song.substring(0,song.indexOf('feat.')-1)
    }
    song = song.replace(/\s/gi,"%20")
    artist = artist.replace(/\s/gi,"%20")
    return [song,artist]
  }
  musixMatchRequest(){
    let [song,artist] = this.processSongNameAndArtistMusixMatch()
    let base_url = 'http://api.musixmatch.com/ws/1.1/'
    //return this.http.get(base_url+'matcher.track.get?q_track=a&q_artist=jovanotti&f_has_lyrics=4&apikey=c073696ccf0369c7b39c5960d33743f8')
    return this.http.get(base_url+'matcher.track.get?q_track='+song+'&q_artist='+artist+'&f_has_lyrics=1&apikey=c073696ccf0369c7b39c5960d33743f8')

  }
  musixMatchRequestIos(){
    let [song,artist] = this.processSongNameAndArtistMusixMatch()
    let base_url = 'http://api.musixmatch.com/ws/1.1/'
    return this.HTTP.get(base_url+'matcher.track.get?q_track='+song+'&q_artist='+artist+'&f_has_lyrics=1&apikey=c073696ccf0369c7b39c5960d33743f8',null,null)

  }
  getmusixMatchPage(link){
    return this.http.get(link)
  }
  getmusixMatchPageIos(link){
    return this.HTTP.get(link,null,null)
  }


}
