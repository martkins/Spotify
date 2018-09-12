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
import {ArtistAlbumsPage} from "../pages/artist-albums/artist-albums";
import {AlbumDetailsPage} from "../pages/album-details/album-details";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {LoginFacePage} from "../pages/login-face/login-face";
import {NativeStorage} from "@ionic-native/native-storage";
import {IonicStorageModule} from "@ionic/storage";
import {HTTP} from "@ionic-native/http";
import {LyricsPage} from "../pages/lyrics/lyrics";
import {ProgressPage} from "../pages/progress/progress";
import {AddArtistPage} from "../pages/add-artist/add-artist";
import {AddPlaylistPage} from "../pages/add-playlist/add-playlist";
import {SongPage} from "../pages/song/song";
import {PlaylistPage} from "../pages/playlist/playlist";
import {GenrePage} from "../pages/genre/genre";
import {AlbumsPage} from "../pages/albums/albums";
import {RelatedArtistsPage} from "../pages/related-artists/related-artists";
import {HomeLoginPage} from '../pages/home-login/home-login';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ArtistAlbumsPage,
    AlbumDetailsPage,
    LoginFacePage,
    LyricsPage,
    ProgressPage,
    AddArtistPage,
    AddPlaylistPage,
    SongPage,
    PlaylistPage,
    GenrePage,
    AlbumsPage,
    RelatedArtistsPage,
    TabsPage,
    HomeLoginPage
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
    ArtistAlbumsPage,
    AlbumDetailsPage,
    LoginFacePage,
    LyricsPage,
    ProgressPage,
    AddArtistPage,
    AddPlaylistPage,
    SongPage,
    PlaylistPage,
    GenrePage,
    AlbumsPage,
    RelatedArtistsPage,
    TabsPage,
    HomeLoginPage
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