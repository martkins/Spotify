import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TabsPage } from '../pages/tabs/tabs';
import { SuperTabsModule } from 'ionic2-super-tabs';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SpotifyProvider } from '../providers/spotify/spotify';
import {HttpClientModule} from "@angular/common/http";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {NativeStorage} from "@ionic-native/native-storage";
import {IonicStorageModule} from "@ionic/storage";
import {HTTP} from "@ionic-native/http";
import {AddArtistPage} from "../pages/add-artist/add-artist";
import {AddPlaylistPage} from "../pages/add-playlist/add-playlist";
import {SongPage} from "../pages/song/song";
import {PlaylistPage} from "../pages/playlist/playlist";
import {GenrePage} from "../pages/genre/genre";
import {AlbumsPage} from "../pages/albums/albums";
import {RelatedArtistsPage} from "../pages/related-artists/related-artists";
import {PlaylistFollowedPage} from "../pages/playlist-followed/playlist-followed";
import {PlaylistOwnedPage} from "../pages/playlist-owned/playlist-owned";
import {PlaylistSpotifyPage} from "../pages/playlist-spotify/playlist-spotify";
import {HomeLoginPage} from '../pages/home-login/home-login';
import {PlaylistMenuPage} from "../pages/playlist-menu/playlist-menu";
import {AddTopTracksPage} from "../pages/add-top-tracks/add-top-tracks";
import {SearchSongPage} from "../pages/search-song/search-song";
import {SearchArtistPage} from "../pages/search-artist/search-artist";
import {AddSongPage} from "../pages/add-song/add-song";
import {ManagePlaylistPage} from "../pages/manage-playlist/manage-playlist";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddArtistPage,
    AddPlaylistPage,
    SongPage,
    PlaylistPage,
    GenrePage,
    AlbumsPage,
    RelatedArtistsPage,
    TabsPage,
    PlaylistFollowedPage,
    PlaylistOwnedPage,
    PlaylistSpotifyPage,
    HomeLoginPage,
    PlaylistMenuPage,
    AddTopTracksPage,
    SearchSongPage,
    SearchArtistPage,
    AddSongPage,
    ManagePlaylistPage,

    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddArtistPage,
    AddPlaylistPage,
    SongPage,
    PlaylistPage,
    GenrePage,
    AlbumsPage,
    RelatedArtistsPage,
    TabsPage,
    PlaylistFollowedPage,
    PlaylistOwnedPage,
    PlaylistSpotifyPage,
    HomeLoginPage,
    PlaylistMenuPage,
    AddTopTracksPage,
    SearchSongPage,
    SearchArtistPage,
    AddSongPage,
    ManagePlaylistPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpotifyProvider,
    InAppBrowser,
    NativeStorage,
    HTTP
  ]
})
export class AppModule {}
