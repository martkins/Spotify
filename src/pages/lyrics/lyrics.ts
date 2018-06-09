import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";


/**
 * Generated class for the LyricsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lyrics',
  templateUrl: 'lyrics.html',
})
export class LyricsPage {

  position = 0;
  currentSong ='song';
  private res:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider, private platform:Platform) {
    this.getTrack();
    setInterval(()=>{
      this.getTrack()
    },1000)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LyricsPage');
  }
  getTrack(){
    this.spotifyProvider.getCurrentTrack().subscribe(
      data=>{
        this.res = data;
        if (this.spotifyProvider.progressMs < this.position){
          this.position = this.spotifyProvider.progressMs;
          this.seekPosition(this.spotifyProvider.progressMs)
        }
        else if (this.spotifyProvider.progressMs > this.position){
          this.position = this.spotifyProvider.progressMs;
          this.seekPosition(this.spotifyProvider.progressMs)
        }
        else{
          this.spotifyProvider.image = this.res.item.album.images[0].url;
          this.spotifyProvider.progressMs = this.res.progress_ms;
          this.position = this.spotifyProvider.progressMs;
          this.spotifyProvider.duration = this.res.item.duration_ms;
          this.spotifyProvider.artistName = this.res.item.artists[0].name;
          this.spotifyProvider.songName = this.res.item.name;
          if (this.currentSong != this.spotifyProvider.songName) {
            this.currentSong = this.spotifyProvider.songName;
            console.log('Getting Lyrics');
            this.getMusixMatchLyrics()
          }
          else{
            this.currentSong = this.spotifyProvider.songName
          }


        }

      },err=>{
        console.log(JSON.stringify(err))
      }
    )
  }

  getMusixMatchLyrics(){
    if (this.platform.is('mobile')){
      this.spotifyProvider.musixMatchRequestIos().then(
        data=>{
          this.res = data.data;
          let prova = JSON.parse(this.res);
          let codice = prova.message.header.status_code;
          if (codice == '404'){
            this.spotifyProvider.lyricsMusixMatch = 'Non è stato possibile trovare il testo di questa canzone'
          }
          else{
            let link = prova.message.body.track.track_share_url;
            link = link.substring(0,link.indexOf('?'));
            this.getLyric(link)
          }
        },err=>{
          let codice = err.status;
          let t = err;
          if (codice == '404'){
            this.spotifyProvider.lyricsMusixMatch = 'Non è stato possibile trovare il testo di questa canzone'
          }
          console.log('tuma',JSON.stringify(err));
          console.log('t',JSON.stringify(t))
        }
      )
    }
    else{
      this.spotifyProvider.musixMatchRequest().subscribe(
        data=>{
          this.res = data;
          let codice = this.res.message.header.status_code;
          if (codice == '404'){
            this.spotifyProvider.lyricsMusixMatch = 'Non è stato possibile trovare il testo di questa canzone'
          }
          else{
            let link = this.res.message.body.track.track_share_url;
            link = link.substring(0,link.indexOf('?'));
            this.getLyric(link)
          }

        },err=>{
          let codice = err.status;
          if (codice == '404'){
            this.spotifyProvider.lyricsMusixMatch = 'Non è stato possibile trovare il testo di questa canzone'
          }
          console.log(err)
        }
      )
    }

  }

  getLyric(link){
    if (this.platform.is('mobile')){
      this.spotifyProvider.getmusixMatchPageIos(link).then(
        data=>{
          this.findlyric(data)
        },err=>{
          console.log(JSON.stringify(err));
          this.findlyric(err)
        }
      )
    }
    else{
      this.spotifyProvider.getmusixMatchPage(link).subscribe(
        data=>{
          this.findlyric(data)
        },err=>{
          this.findlyric(err)
        }
      )
    }


  }
  findlyric(data){
    this.res = JSON.stringify(data);
    let index = this.res.indexOf('\\"body\\"');
    let end = this.res.indexOf('\\"languageDescription\\"');
    let lyric = this.res.slice(index,end);
    end = lyric.indexOf('language');
    lyric = lyric.slice(11,end-4);
    lyric = lyric.replace(/\\r\\n|\\r|\\n/gi,'\n');
    lyric = lyric.replace(/\\/gi,'<br>');
    this.spotifyProvider.lyricsMusixMatch = lyric
  }

  seekPosition(pos){
    this.spotifyProvider.seekPositionTrack(pos).subscribe(
      data=>{
        console.log(JSON.stringify(data))
      },err=>{
        console.log(err)
      }
    )
  }
}
