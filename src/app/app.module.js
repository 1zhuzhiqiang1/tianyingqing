var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
// 首页
import { HomeComponent } from './pages/home-page/home.component';
// 城市列表页
import { CityListPage } from './pages/city-list/city-list';
// 许可天宽
import { ClausePage } from './pages/clause/clause';
// 添加城市
import { AddCityComponent } from './pages/add-city/add.city.component';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            HomeComponent,
            CityListPage,
            ClausePage,
            AddCityComponent
        ],
        imports: [
            HttpModule,
            BrowserModule,
            IonicModule.forRoot(AppComponent),
            IonicStorageModule.forRoot({
                name: '__mydb',
                driverOrder: ['sqlite', 'indexeddb', 'websql']
            })
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            AppComponent,
            HomeComponent,
            CityListPage,
            ClausePage,
            AddCityComponent
        ],
        providers: [
            StatusBar,
            SplashScreen,
            { provide: ErrorHandler, useClass: IonicErrorHandler }
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map