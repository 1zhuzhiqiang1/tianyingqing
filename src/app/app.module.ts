import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from "@angular/http";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { HelloIonicPage } from './pages/hello-ionic/hello-ionic';
import { CityListPage } from './pages/city-list/city-list';
import { ClausePage } from './pages/clause/clause';
import { AddCityComponent } from './pages/add-city/add.city.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloIonicPage,
    CityListPage,
    ClausePage,
    AddCityComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(AppComponent),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    HelloIonicPage,
    CityListPage,
    ClausePage,
    AddCityComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}