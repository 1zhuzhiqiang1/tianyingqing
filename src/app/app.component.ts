import {Component, ViewChild} from '@angular/core';
import { Platform, MenuController, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomeComponent } from './pages/home-page/home.component';
import {CityListPage} from './pages/city-list/city-list';
import {ClausePage} from './pages/clause/clause';

@Component({
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('content') content: NavController;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HomeComponent;
  pages: Array<{title: string, component: any}>;
  // stroage: Storage;

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private splashScreen: SplashScreen
    ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
    { title: '首页', component: HomeComponent },
    { title: '城市', component: CityListPage },
    { title: '许可条款', component: ClausePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  ionViewDidLoad(){
    
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.content.setRoot(page.component);
  }
}
