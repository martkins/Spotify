import { Component } from '@angular/core';
import {IonicPage, Keyboard, NavController, NavParams} from 'ionic-angular';
import {SpotifyProvider} from "../../providers/spotify/spotify";
import {AlbumsPage} from "../albums/albums";
import {RelatedArtistsPage} from "../related-artists/related-artists";

/**
 * Generated class for the AddArtistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
  //TODO: Implementare HTML (con cards?)
  //TODO: Far scegliere all'utente il nome dell'artista come prima cosa
  //TODO: Far scegliere all'utente il numero di canzoni random da aggiungere

@IonicPage()
@Component({
  selector: 'page-add-artist',
  templateUrl: 'add-artist.html',
})
export class AddArtistPage {

  id:string
  artistName:string
  res: any
  uris: string[] = []           //array di canzoni passati a addToPlaylist
  albumsIds :string = ''
  numberRandom = 10             //numero di canzoni random
  items:any

  constructor(public navCtrl: NavController, public navParams: NavParams, private spotifyProvider:SpotifyProvider, public keyboard:Keyboard) {
    this.id = navParams.get('id')
    this.artistName = navParams.get('artistName')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddArtistPage');
  }


  /*
    Top Tracks Method
  */

  addTopTracks(){
    this.spotifyProvider.getArtistTopTracks(this.id).subscribe(
      data=>{
        this.res = data
        for (let track of this.res.tracks) {
          this.uris.push(track.uri)
        }
        this.addToPlaylist(this.uris)

      },err=>{
        console.log(err)
      }
    )
  }

/*
  Random Songs Methods
*/

  getRandomSongs(){
    this.spotifyProvider.searchAlbums(this.id).subscribe(
      data=>{
        let ids : string[] = []
        this.res = data
        for (let album of this.res.items){
          ids.push(album.id)
        }
        this.albumsIds = ids.join('%2C')
        this.getAllTracks()
      },err=>{
        console.log(err)

      }
    )
  }

  getAllTracks(){
    this.spotifyProvider.getAlbumsTracks(this.albumsIds).subscribe(
      data=>{
        this.res = data
        let allTracks: string[] = []
        for (let albums of this.res.albums){
          for (let track of albums.tracks.items){
            allTracks.push(track.uri)
          }
        }
        this.uris = this.chooseSongs(allTracks)
        this.addToPlaylist(this.uris)
      },err=>{

      }
    )
  }

  chooseSongs(allTracks){
    let copy = allTracks
    let ret = []
    if (this.numberRandom > copy.length){
      return copy
    }
    else{
      for (let i=0; i < this.numberRandom; i++){
        let index = Math.floor(Math.random() * copy.length)
        let removed = copy.splice(index,1)
        ret.push(removed[0])
      }
      return ret
    }

  }

/*
  General Methods
*/

  addToPlaylist(tracks){
    this.spotifyProvider.addTracksToPlaylist(tracks).subscribe(
      data=>{
        console.log(data)
      },err=>{
        console.log(err)
      }
    )
  }

  pushToAllAlbums(){
    this.navCtrl.push(AlbumsPage,{
      id:this.id
    })
  }

  pushToRelatedArtists(){
    this.navCtrl.push(RelatedArtistsPage,{
      id:this.id
    })
  }
}
