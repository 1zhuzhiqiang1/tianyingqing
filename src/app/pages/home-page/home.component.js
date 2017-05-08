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
import { NavController } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { ChangeDetectorRef } from '@angular/core';
import { AddCityComponent } from '../add-city/add.city.component';
// 详情页
import { WeatherDetailComponent } from '../weather-detail-page/weather.detail.component';
import { WeatherService } from '../../../providers/weather-service';
var HomeComponent = (function () {
    function HomeComponent(navController, storage, cd, weatherService) {
        this.navController = navController;
        this.storage = storage;
        this.cd = cd;
        this.weatherService = weatherService;
        this.weathers = [];
        this.first = true;
    }
    // ionic2生命周期地址--http://ionicframework.com/docs/api/navigation/NavController/
    HomeComponent.prototype.ionViewDidLoad = function () {
        console.log('home-page:ionViewDidLoad');
        if (this.first) {
            this.refreshData();
        }
        this.getDatas();
        // 开启定时器，5分钟刷新一次数据
        // setInterval(this.refreshData(),10000);
    };
    HomeComponent.prototype.refreshData = function () {
        var _this = this;
        console.log('homepage:刷新数据');
        this.storage.forEach(function (value, key) {
            _this.weatherService.getWeather(key);
        });
    };
    HomeComponent.prototype.getDatas = function () {
        var _this = this;
        this.weathers = [];
        this.storage.forEach(function (value, key) {
            var homeModel = JSON.parse(value);
            _this.weathers.push(homeModel);
        });
    };
    HomeComponent.prototype.getWeatherIcon = function (weather) {
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
        else {
            url += "cloud.png";
        }
        return url;
    };
    HomeComponent.prototype.gotoDetail = function (weather) {
        console.log('gotoDetail：' + weather.city);
        var picUrl = this.getWeatherIcon(weather);
        this.navController.push(WeatherDetailComponent, {
            'item': weather,
            'icon-url': picUrl
        });
    };
    HomeComponent.prototype.ionViewDidEnter = function () {
    };
    HomeComponent.prototype.update = function () {
        this.getDatas();
    };
    HomeComponent.prototype.addCity = function () {
        this.navController.push(AddCityComponent, {
            'homePage': this
        });
    };
    //定位
    HomeComponent.prototype.locate = function () {
        var _this = this;
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var url = "http://api.map.baidu.com/geocoder/v2/?ak=EB77c29b7b9800e5804ef458fbf3ac67&location=" + latitude + "," + longitude + "&output=json&pois=0";
            _this.http.get(url).subscribe(function (data) {
                var jsonData = data.json();
                console.log(jsonData);
                if (jsonData.status == 0) {
                    var cityName = jsonData.result.addressComponent.city;
                    alert("获取城市成功:" + cityName);
                }
            });
        }, function (error) {
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Component({
        templateUrl: './home.component.html'
    }),
    __metadata("design:paramtypes", [NavController,
        Storage,
        ChangeDetectorRef,
        WeatherService])
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map