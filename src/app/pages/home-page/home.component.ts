import {Component} from '@angular/core';
import { Modal, NavController} from "ionic-angular";
import { Storage } from '@ionic/storage';
import { ChangeDetectorRef } from '@angular/core'; 

import { AddCityComponent } from '../add-city/add.city.component';
import { HomeModel } from '../model/HomeModel';
import { MyConst } from '../model/MyConst';
// 详情页
import { WeatherDetailComponent } from '../weather-detail-page/weather.detail.component';

import { WeatherService } from '../../../providers/weather-service';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

	weathers:Array<HomeModel>;
  first:boolean;

  constructor(
    private navController: NavController,
    private storage: Storage,
    private cd: ChangeDetectorRef,
    private weatherService:WeatherService
    ) {
    this.weathers = [];
    this.first = true;
  }

  // ionic2生命周期地址--http://ionicframework.com/docs/api/navigation/NavController/
  ionViewDidLoad() {
    console.log('home-page:ionViewDidLoad');
    if(this.first){
      this.refreshData();
    }
    this.getDatas();

    // 开启定时器，5分钟刷新一次数据
    // setInterval(this.refreshData(),10000);
  }

  refreshData(){
    console.log('homepage:刷新数据');
    this.storage.forEach( (value,key) => {
      this.weatherService.getWeather(key);
    } );
  }

  getDatas(){
    this.weathers = [];
    this.storage.forEach((value,key) => {
      let homeModel:HomeModel = JSON.parse(value);
      this.weathers.push(homeModel);
    });
  }

  getWeatherIcon(weather): string{
    // let url:string = "https://zhuzhiqiang.github.io/tianyingqing/icons/";
    let url:string = "assets/icons/";
    if(weather.weather.indexOf('晴') >= 0){
      url += "sun.png";
    }else if(weather.weather.indexOf('多云') >= 0){
      url += "cloud.png";
    }else if(weather.weather.indexOf('雨') >= 0){
      url += "rain-icon-weather_128.png";
    }else if(weather.weather.indexOf('雷') >= 0){
      url += "lightning.png";
    }else if(weather.weather.indexOf('风') >= 0){
      url += "tornado-twister.png";
    }else{
      url += "cloud.png";
    }
    return url;
  }

  gotoDetail(weather){
    console.log('gotoDetail：'+weather.city);
    let picUrl:string = this.getWeatherIcon(weather);
    this.navController.push(WeatherDetailComponent,{
      'item':weather,
      'icon-url':picUrl
    });
  }

  ionViewDidEnter() {

  }

  update(){
    this.getDatas();
  }

  addCity() {
    this.navController.push(AddCityComponent,{
      'homePage':this
    });
  }
}
