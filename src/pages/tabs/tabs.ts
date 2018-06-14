import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AddPlaylistPage } from '../add-playlist/add-playlist';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1 = HomePage;
  tab2 = AddPlaylistPage;
  // tab3 = AccountPage;


  constructor(public navCtrl: NavController) {}

}
