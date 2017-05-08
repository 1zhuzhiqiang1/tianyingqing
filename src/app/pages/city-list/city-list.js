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
import { NavController, AlertController, ToastController } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { WeatherService } from '../../../providers/weather-service';
// 详情页
import { WeatherDetailComponent } from '../weather-detail-page/weather.detail.component';
var CityListPage = (function () {
    function CityListPage(http, navController, storage, alertCtrl, toastCtrl, weatherService) {
        this.http = http;
        this.navController = navController;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.weatherService = weatherService;
        this.weathers = [];
    }
    CityListPage.prototype.getWeatherIcon = function (weather) {
        // let url:string = "https://zhuzhiqiang.github.io/tianyingqing/icons/";
        var url = "assets/icons/";
        if (weather.weather.indexOf('晴') >= 0) {
            url += "sun.png";
        }
        else if (weather.weather.indexOf('多云') >= 0) {
            url += "cloud.png";
        }
        else if (weather.weather.indexOf('雨') >= 0) {
            url += "rain-icon-weather_128.png";
        }
        else if (weather.weather.indexOf('雷') >= 0) {
            url += "lightning.png";
        }
        else if (weather.weather.indexOf('风') >= 0) {
            url += "tornado-twister.png";
        }
        return url;
    };
    CityListPage.prototype.clickItem = function (item) {
        var picUrl = this.getWeatherIcon(item);
        this.navController.push(WeatherDetailComponent, {
            'item': item,
            'icon-url': picUrl
        });
    };
    // 取消关注
    CityListPage.prototype.itemSelected = function (weather) {
        var _this = this;
        this.alertCtrl.create({
            title: '甜影强',
            message: '你确定要取消关注该城市的天气信息吗？',
            buttons: [
                {
                    text: '取消',
                },
                {
                    text: '确定',
                    handler: function () {
                        _this.weatherService.deleteCity(weather);
                        _this.getDatas();
                        _this.toastCtrl.create({
                            message: "删除成功！",
                            duration: 2000
                        }).present();
                    }
                }
            ]
        }).present();
    };
    CityListPage.prototype.getDatas = function () {
        var _this = this;
        this.weathers = [];
        this.storage.forEach(function (value, key) {
            var homeModel = JSON.parse(value);
            _this.weathers.push(homeModel);
        });
    };
    CityListPage.prototype.ionViewDidLoad = function () {
        console.log('city-list:ionViewDidLoad');
        this.getDatas();
    };
    CityListPage.prototype.ionViewDidEnter = function () {
        console.log('weathers => ' + JSON.stringify(this.weathers));
    };
    return CityListPage;
}());
CityListPage = __decorate([
    Component({
        templateUrl: './city-list.html',
        styleUrls: ['/pages/city-list/city-list.scss']
    }),
    __metadata("design:paramtypes", [Http,
        NavController,
        Storage,
        AlertController,
        ToastController,
        WeatherService])
], CityListPage);
export { CityListPage };
//# sourceMappingURL=city-list.js.map