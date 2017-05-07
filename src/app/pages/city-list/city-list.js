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
import { MyConst } from '../model/MyConst';
var CityListPage = (function () {
    function CityListPage(http, navController, storage, alertCtrl, toastCtrl, weatherService) {
        this.http = http;
        this.navController = navController;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.weatherService = weatherService;
    }
    CityListPage.prototype.clickItem = function (item) {
        this.navController.push(WeatherDetailComponent, {
            'item': item
        });
    };
    // 取消关注
    CityListPage.prototype.itemSelected = function (item) {
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
                        _this.storage.get(MyConst.CITY_NUM).then(function (result) {
                            for (var i = 0; i < result; i++) {
                                if (item == _this.weathers[i]) {
                                    _this.storage.set(MyConst.WEATHER + '-' + i, null);
                                    break;
                                }
                            }
                        });
                        _this.toastCtrl.create({
                            message: "删除成功！",
                            duration: 2000
                        }).present();
                    }
                }
            ]
        }).present();
    };
    CityListPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('city-list:onPageWillEnter');
        this.weatherService.getWeathersFromLocal().then(function (result) {
            _this.weathers = result;
        });
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