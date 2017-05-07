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
    }
    HomeComponent.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('home-page:onPageWillEnter');
        this.weatherService.getWeathersFromLocal().then(function (result) {
            console.log('获取到的结果' + result);
            _this.weathers = result;
            _this.cd.detectChanges();
            console.log('weathers => ' + _this.weathers);
        });
        // this.storage.get(MyConst.CITY_NUM).then((result) => {
        // 	console.log('已经保存城市的数量是 => ' + result);
        // 	this.cityNum = result;
        // 	for (let i = 0; i < result; i++) {
        // 		console.log('home-page:'+i);
        // 		this.storage.get(MyConst.WEATHER+'-'+i).then(result => {
        // 			if(result != null){
        // 				// console.log(result);
        // 				this.weathers.push(result);
        // 			}
        // 		});
        // 	}
        // });
    };
    HomeComponent.prototype.gotoDetail = function (weather) {
        console.log('gotoDetail');
        this.navController.push(WeatherDetailComponent, {
            'item': weather
        });
    };
    HomeComponent.prototype.ionViewDidEnter = function () {
        // console.log('weathers => ' + this.weathers);
    };
    HomeComponent.prototype.addCity = function () {
        this.navController.push(AddCityComponent);
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