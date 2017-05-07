var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Storage } from '@ionic/storage';
import { ToastController } from "ionic-angular";
import { MyConst } from '../app/pages/model/MyConst';
import { Weather } from '../app/pages/model/weather/weather';
import 'rxjs/add/operator/map';
/*
  Generated class for the WeatherService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
var WeatherService = (function () {
    function WeatherService(http, storage, toastCtrl) {
        this.http = http;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
    }
    // 联网获取数据
    WeatherService.prototype.getWeather = function (cityName) {
        var _this = this;
        var cityNum;
        return new Promise(function (resolve) {
            console.log('开始请求网络数据');
            _this.storage.get(MyConst.CITY_NUM).then(function (result) {
                cityNum = ++result;
                _this.http.get("http://apicloud.mob.com/v1/weather/query?key=f1fb6815bbb6&city=" + cityName).subscribe(function (data) {
                    var jsonData = data.json();
                    console.log(jsonData);
                    if (jsonData.retCode == "200") {
                        var url = "http://qiniu.ursb.me/image/city-" + Math.floor(Math.random() * 4) + ".png";
                        console.log('url => ' + url);
                        _this.storage.set(MyConst.CITY_NUM, cityNum);
                        _this.storage.set(MyConst.CITY_NAME + '-' + cityNum, cityName);
                        _this.storage.set(MyConst.WEATHER + '-' + cityNum, JSON.stringify(jsonData.result[0]));
                        resolve(jsonData);
                    }
                }, function (error) {
                    _this.toastCtrl.create({
                        message: "网络错误",
                        duration: 1000
                    }).present();
                });
            });
        });
    };
    // 获取本地存儲的數據
    WeatherService.prototype.getWeathersFromLocal = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var weathers = [];
            _this.storage.get(MyConst.CITY_NUM).then(function (result) {
                for (var i = 1; i <= result; i++) {
                    _this.storage.get(MyConst.WEATHER + '-' + i).then(function (result) {
                        // console.log('getLocalweather:'+result);
                        var weather;
                        weather = new Weather(result);
                        weathers.push(result);
                    });
                }
                console.log();
            });
            resolve(weathers);
        });
    };
    return WeatherService;
}());
WeatherService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        Storage,
        ToastController])
], WeatherService);
export { WeatherService };
//# sourceMappingURL=weather-service.js.map