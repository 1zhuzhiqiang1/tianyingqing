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
	
  	constructor(
  		private navController: NavController,
  		private storage: Storage,
  		private cd: ChangeDetectorRef,
  		private weatherService:WeatherService
  	) {
		this.weathers = [];
  	}

// ionic2生命周期地址--http://ionicframework.com/docs/api/navigation/NavController/
  	ionViewDidLoad() {
  		console.log('home-page:ionViewDidLoad');

  		this.storage.get(MyConst.CITY_NUM).then(result => {
          let size:number = result;
          for (var i = 1; i <= size; i++) {
            (function(i,storage,weathers){
              storage.get(MyConst.WEATHER+'-'+i).then(result => {
              let weatherInfo = result;
              storage.get(MyConst.CITY_IMG+'-'+i).then(result => {
                  let homeModel:HomeModel = new HomeModel(result,weatherInfo);
                  weathers.push(homeModel);
              });
            });
            })(i,this.storage,this.weathers);
          }
        });

	}

	gotoDetail(weather){
		console.log('gotoDetail：'+weather.city);
		this.navController.push(WeatherDetailComponent,{
  			'item':weather
  		});
	}

    ionViewDidEnter() {
		// console.log('weathers => ' + this.weathers);
    }

    addCity() {
     	this.navController.push(AddCityComponent);
    }
}
