import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {App} from "ionic-angular";
import {InAppBrowserEvent} from "@ionic-native/in-app-browser";
import {HTTP} from "@ionic-native/http";
import { TabsPage } from '../../pages/tabs/tabs';
import {Platform} from "ionic-angular";
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Injectable()
export class SpotifyProvider {
  token_tmp = 'BQAIFLsnBWwOl3Geb7wT_R5zWWCYoPZteqfxF2nSZ4GxlyQsJABMSFACSCR4eIVy8eG0qeSc7VtEiLW_hqNQZqhn7OmPddl5ggCu4YH-z2WdrckkAuuyOOEj4a6ES_zqiPhg_wfXN06jOqs_wlWUpSKk1tW9eDv-oYjuECpV0kKFnMr2xJ9agE4M9vQDQh1RYI5X35uVKZNH1KJF_SN75_0V_lg0YSPbZLjryQp5B_l4_7bYt0ikXEVh_UKwjh0jRdKpwUCN8va5lW43_1NM7mM7WdyHdw&token_type=Bearer&expires_in=3600&state=123'

  client_id = 'd0612aeb3d0741cb9939c51b25c75394';
  response_type = 'token';
  redirect_uri = 'http://localhost:8100/';
  state = 123;
  scope = 'user-modify-playback-state%20user-read-playback-state%20user-library-read%20user-library-modify%20playlist-read-private%20playlist-modify-public%20playlist-modify-private%20playlist-read-collaborative%20user-read-recently-played%20user-top-read%20user-read-private%20streaming%20user-read-currently-playing%20user-follow-read';
  deviceId:any;
  albumId: string;
  res:any;
  icon = "play";
  songName : '';
  artistName : '';
  lyricsMusixMatch = '';
  progressMs:any;
  duration:any;
  image:any;
  authToken:string = '';
  requestHeader:any;
  userId = ''
  playlistId = ''
  userLoggedIn: boolean = false;

  private baseUrl:string = "https://api.spotify.com/v1";
  private searchUrl:string = this.baseUrl+'/search?q=';
  private albumUrl:string = this.baseUrl+'/albums/';




  constructor(public http: HttpClient,public HTTP:HTTP,private platform:Platform) {
    console.log('Hello SpotifyProvider Provider');
    if (this.platform.is('mobile')){

    }
    else{
      if (window.location.href.toString().includes('token')) {
        let begin = window.location.href.toString().indexOf('=');
        let end = window.location.href.toString().indexOf('token_type');
        this.authToken = 'Bearer '+window.location.href.toString().slice(begin + 1, end - 1);
        this.requestHeader = new HttpHeaders().set('Content-Type','application/json').append('Authorization',this.authToken);
        console.log('token',this.authToken)
      }
    }

    }

/*
  API for search
*/

  searchArtists(name:string){
    return this.http.get(this.searchUrl+name+'&type=artist',{
      headers:this.requestHeader
    })
  }

  searchSong(name:string){
    return this.http.get(this.searchUrl+name+'&type=track',{
      headers:this.requestHeader
    })
  }



  searchAlbum(id:string){
    return this.http.get(this.albumUrl+id,{
      headers:this.requestHeader
    })
  }

/*
  API for LOGIN
*/

  loginComputer(){
    window.open('https://accounts.spotify.com/authorize?client_id=' + this.client_id + '&redirect_uri=' + this.redirect_uri + '&response_type=' + this.response_type + '&state=' + this.state + '&scope='+this.scope, '_system')

  }

  // loginSpotify(){
  //   return new Promise((resolve,reject)=> {
  //     let browserRef = window.open('https://accounts.spotify.com/authorize?client_id=' + this.client_id + '&redirect_uri=' + this.redirect_uri + '&response_type=' + this.response_type + '&state=' + this.state + '&scope=' + this.scope,"_blank","location=no,clearsessioncache=yes,clearcache=yes");
  //     browserRef.addEventListener("loadstart", (event:InAppBrowserEvent) => {
  //       if (event.url.includes('localhost:8100/#access')){
  //         let begin = event.url.toString().indexOf('=');
  //         let end = event.url.toString().indexOf('token_type');
  //         this.authToken = 'Bearer '+event.url.toString().slice(begin + 1, end - 1);
  //         this.requestHeader = new HttpHeaders().set('Content-Type','application/json').append('Authorization',this.authToken)
  //       }
  //       resolve('Ok')
  //     });
  //     browserRef.addEventListener("exit",function(event){
  //       reject("Canceled")
  //     })
  //   })

  // }
  loginSpotify(){
    this.userLoggedIn = true;
    return new Promise((resolve,reject)=> {
      this.authToken = 'Bearer '+ this.token_tmp;
      this.requestHeader = new HttpHeaders().set('Content-Type','application/json').append('Authorization',this.authToken)
      let browserRef = window.open('https://accounts.spotify.com/authorize?client_id=' + this.client_id + '&redirect_uri=' + this.redirect_uri + '&response_type=' + this.response_type + '&state=' + this.state + '&scope=' + this.scope,"_blank","location=no,clearsessioncache=yes,clearcache=yes");
      browserRef.addEventListener("loadstart", (event:InAppBrowserEvent) => {
        if (event.url.includes('localhost:8100/#access')){
          let begin = event.url.toString().indexOf('=');
          let end = event.url.toString().indexOf('token_type');
        }
        resolve('Ok')
      });
      browserRef.addEventListener("exit",function(event){
        reject("Canceled")
      })
    })

  }

/*
  API for progress bar
*/

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

  playPlaylist(playlistId){
    return this.http.put(this.baseUrl+'/me/player/play',{
      "context_uri":playlistId
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
        console.log(JSON.stringify(data));
        if (this.res.devices.length > 0) {
          this.deviceId = this.res.devices[0].id;
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
    );
    if (this.icon == "play"){
      this.playCurrent().subscribe(
        data=>{
          console.log(JSON.stringify(data));
          this.icon = "pause"
        },err =>{
          console.log(JSON.stringify(err));
          this.icon = "pause"
        }
      )
    }
    if (this.icon == "pause"){
      this.pauseCurrent().subscribe(
        data=>{
          console.log(JSON.stringify(data));
          this.icon = "play"
        },err =>{
          console.log(JSON.stringify(err));
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


/*
API for song's lyrics
*/
  processSongNameAndArtistMusixMatch(){
    let artist = this.artistName.toLowerCase();
    let song = this.songName.toLowerCase();
    if (song.includes('feat.')){
      song = song.substring(0,song.indexOf('feat.')-1)
    }
    song = song.replace(/\s/gi,"%20");
    artist = artist.replace(/\s/gi,"%20");
    return [song,artist]
  }
  musixMatchRequest(){
    let [song,artist] = this.processSongNameAndArtistMusixMatch();
    let base_url = 'http://api.musixmatch.com/ws/1.1/';
    return this.http.get(base_url+'matcher.track.get?q_track='+song+'&q_artist='+artist+'&f_has_lyrics=1&apikey=c073696ccf0369c7b39c5960d33743f8')

  }
  musixMatchRequestIos(){
    let [song,artist] = this.processSongNameAndArtistMusixMatch();
    let base_url = 'http://api.musixmatch.com/ws/1.1/';
    return this.HTTP.get(base_url+'matcher.track.get?q_track='+song+'&q_artist='+artist+'&f_has_lyrics=1&apikey=c073696ccf0369c7b39c5960d33743f8',null,null)

  }
  getmusixMatchPage(link){
    return this.http.get(link)
  }
  getmusixMatchPageIos(link){
    return this.HTTP.get(link,null,null)
  }

/*
  API for playlist
*/

  getUserProfile(){
    return this.http.get(this.baseUrl+'/me',{
      headers: this.requestHeader
    })
  }

  createPlaylist(id, name, description, isPublic){ //TODO: farlo per Mobile
    return this.http.post(this.baseUrl+'/users/'+id+'/playlists',{
      name : name,
      description : description,
      public : isPublic
    },{
      headers: this.requestHeader
    })
  }

  addTracksToPlaylist(tracks){ //TODO: farlo per Mobile
    return this.http.post(this.baseUrl+'/users/'+this.userId+'/playlists/'+this.playlistId+'/tracks',{
      uris : tracks
    },{
      headers:this.requestHeader
    })
  }

  getCurrentUserPlaylist(){
    return this.http.get(this.baseUrl+'/me/playlists',{
      headers:this.requestHeader
    })
  }

  getPlaylistsTracks(ids){
    return this.http.get(this.baseUrl+'/playlists/'+ids+'/tracks',{
      headers:this.requestHeader
    })
  }




/*
  API for artists
*/

  getArtistTopTracks(id){
    return this.http.get(this.baseUrl+'/artists/'+id+'/top-tracks?country=IT',{
      headers:this.requestHeader
    })
  }

  searchAlbums(id:string){
    return this.http.get(this.baseUrl+'/artists/'+id+'/albums?include_groups=album',{
      headers:this.requestHeader
    })
  }

  getAlbumsTracks(ids){
    return this.http.get(this.baseUrl+'/albums?ids='+ids,{
      headers:this.requestHeader
    })
  }

  getRelatedArtists(id){
    return this.http.get(this.baseUrl+'/artists/'+id+'/related-artists',{
      headers:this.requestHeader
    })
  }

/*
  API for songs
*/

  getRaccomandatedSongs(id,number){
    return this.http.get(this.baseUrl+'/recommendations?limit='+number+'&seed_tracks='+id,{
      headers:this.requestHeader
    })
  }

  getTopTracks(term){
    return this.http.get(this.baseUrl+'/me/top/tracks?time_range='+term+'&limit=50',{
      headers:this.requestHeader
    })
  }
}

