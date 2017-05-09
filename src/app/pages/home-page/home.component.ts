import {Component} from '@angular/core';
import { Modal, NavController, AlertController } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { ChangeDetectorRef } from '@angular/core'; 
import {Http} from "@angular/http";

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
    private weatherService:WeatherService,
    public http: Http,
    private alertCtrl: AlertController,
    ) {
    this.weathers = [];
    this.first = true;
  }

  doRefresh(refresher) {
    this.refreshData();
    setTimeout(()=>{
      refresher.complete();
    },1000);
  }


  // ionic2生命周期地址--http://ionicframework.com/docs/api/navigation/NavController/
  ionViewDidLoad() {
    console.log('home-page:ionViewDidLoad');
    if(this.first){
      this.refreshData();
    }

  }

  refreshData(){
    console.log('homepage:刷新数据');
    this.storage.length().then(size => {
      this.storage.forEach( (value,key,iterationNumber) => {
        if(size == iterationNumber){
          this.weatherService.getWeather(key).then( result => {
            this.first = false;
            this.getDatas();
            console.log('刷新成功');
          });
        }else{
          this.weatherService.getWeather(key);
        }
      } );
    });
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
    this.refreshData();
  }

  addCity() {
    this.navController.push(AddCityComponent,{
      'homePage':this
    });
  }

  //定位
  locate(){
    navigator.geolocation.getCurrentPosition( position => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let url = "http://api.map.baidu.com/geocoder/v2/?ak=EB77c29b7b9800e5804ef458fbf3ac67&location="+latitude+","+longitude+"&output=json&pois=0";
      this.http.get(url).subscribe(data => {
        let jsonData = data.json();
        console.log(jsonData);
        if(jsonData.status == 0){
          let cityName = jsonData.result.addressComponent.city;
          cityName = cityName.substr(0,cityName.length-1);
          this.alertCtrl.create({
            title: '天气',
            message: '当前的城市是'+cityName+','+'要切换吗?',
            buttons: [{text: '取消'},
            {
              text: '确定',
              handler: () => {
                this.weatherService.getWeather(cityName).then( result => {
                  this.getDatas();
                });
              }
            }
            ]
          }).present();
        }
      });
    }, error => {
      alert(JSON.stringify(error));
    },{
      enableHighAccuracy:true,
      timeout:15000,
      maximumAge:3000
    });
  }

}
