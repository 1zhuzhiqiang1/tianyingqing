var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { HomeComponent } from './pages/home-page/home.component';
import { CityListPage } from './pages/city-list/city-list';
import { ClausePage } from './pages/clause/clause';
var AppComponent = (function () {
    // stroage: Storage;
    function AppComponent(platform, menu, http) {
        this.platform = platform;
        this.menu = menu;
        this.http = http;
        // make HelloIonicPage the root (or first) page
        this.rootPage = HomeComponent;
        this.initializeApp();
        // set our app's pages
        this.pages = [
            { title: '首页', component: HomeComponent },
            { title: '城市', component: CityListPage },
            { title: '许可条款', component: ClausePage }
        ];
    }
    AppComponent.prototype.initializeApp = function () {
        this.platform.ready().then(function () { });
    };
    AppComponent.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.content.setRoot(page.component);
    };
    return AppComponent;
}());
__decorate([
    ViewChild('content'),
    __metadata("design:type", NavController)
], AppComponent.prototype, "content", void 0);
AppComponent = __decorate([
    Component({
        templateUrl: './app.component.html'
    }),
    __metadata("design:paramtypes", [Platform,
        MenuController, Object])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map