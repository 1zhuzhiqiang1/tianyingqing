var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { ViewController, ToastController, NavParams } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { WeatherService } from '../../../providers/weather-service';
import { MyConst } from '../model/MyConst';
var AddCityComponent = (function () {
    function AddCityComponent(http, viewController, toastCtrl, storage, weatherService, navParams) {
        this.http = http;
        this.viewController = viewController;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.weatherService = weatherService;
        this.navParams = navParams;
        this.homePage = this.navParams.get('homePage');
        console.log('homePage=' + this.homePage);
    }
    AddCityComponent.prototype.dismiss = function () {
        this.viewController.dismiss();
    };
    AddCityComponent.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get(MyConst.CITY_NUM).then(function (result) {
            console.log("num => " + result);
            _this.cityNum = result;
        });
    };
    AddCityComponent.prototype.register = function () {
        var _this = this;
        this.weatherService.getWeather(this.cityName).then(function (result) {
            if (result == null) {
                _this.toastCtrl.create({
                    message: "对不起，没有该城市的数据。",
                    duration: 1000
                }).present();
            }
            else {
                _this.homePage.update();
                _this.toastCtrl.create({
                    message: "添加城市成功",
                    duration: 1000
                }).present();
            }
        });
    };
    return AddCityComponent;
}());
AddCityComponent = __decorate([
    Component({
        templateUrl: './add.city.component.html',
        styleUrls: ['/pages/add-city/add.city.component.scss']
    }),
    __metadata("design:paramtypes", [Http,
        ViewController,
        ToastController,
        Storage,
        WeatherService,
        NavParams])
], AddCityComponent);
export { AddCityComponent };
//# sourceMappingURL=add.city.component.js.map