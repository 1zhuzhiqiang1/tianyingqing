import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import { ToastController } from "ionic-angular";

import { MyConst } from '../app/pages/model/MyConst';
import { Weather } from '../app/pages/model/weather/weather';
import 'rxjs/add/operator/map';

import { HomeModel } from '../app/pages/model/HomeModel';

/*
  Generated class for the WeatherService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class WeatherService {

    constructor(
      public http: Http,
      private storage:Storage,
      private toastCtrl: ToastController,
      ) {}

    // 联网获取数据
    getWeather(cityName:string): Promise<Weather[]> {
      let cityNum:number;
      return new Promise((resolve) => {
        console.log('开始请求网络数据');
        this.http.get("http://apicloud.mob.com/v1/weather/query?key=f1fb6815bbb6&city=" + cityName).subscribe(data => {
            let jsonData = data.json();
            if (jsonData.retCode == "200") {
              let url = "http://qiniu.ursb.me/image/city-" + Math.floor(Math.random() * 4) + ".png";
              let obj = jsonData.result[0];
              let homeModel:HomeModel = new HomeModel(url,obj);
              this.storage.set(obj.city,JSON.stringify(homeModel));
              resolve(jsonData);
            }else{
              resolve(null);
            }
          }, error => {
            this.toastCtrl.create({
              message: "网络错误",
              duration: 1000
            }).present();
          });
        
      });
    }

    // 获取本地存儲的數據
    getWeathersFromLocal(): Promise<Weather[]>{
      var weathers:Array<Weather> = [];
      return new Promise(resolve => {

        this.storage.get(MyConst.CITY_NUM).then(result => {
          let size:number = result;
          for (var i = 1; i <= size; i++) {
            (function(i,weather,resolve,storage){
              storage.get(MyConst.WEATHER+'-'+i).then(result => {
              let weather:Weather = new Weather(result);
              weathers.push(weather);
              if(i >= size){
                resolve(weathers);
              }
            });
            })(i,weathers,resolve,this.storage);
          }
          
        });
        
      }
      );

    }

    //删除城市
    deleteCity(weather){
      if(weather != null){
        this.storage.remove(weather.city);
      }
    }

  }
