import {Component} from '@angular/core';
import { Http } from "@angular/http";
import { NavController,AlertController,ToastController } from "ionic-angular";
import { Storage } from '@ionic/storage';

import { WeatherService } from '../../../providers/weather-service';
// 详情页
import { WeatherDetailComponent } from '../weather-detail-page/weather.detail.component';
import { Weather } from '../model/weather/weather';
import { MyConst } from '../model/MyConst';
import { HomeModel } from '../model/HomeModel';

@Component({
	templateUrl: './city-list.html',
	styleUrls:['/pages/city-list/city-list.scss']
})

export class CityListPage {
	weathers:Array<HomeModel>;

	constructor(
		private http: Http,
		private navController: NavController,
		private storage: Storage,
		public alertCtrl: AlertController,
		public toastCtrl: ToastController,
		private weatherService:WeatherService
		) {
		this.weathers = [];
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

	clickItem(item){
		let picUrl = this.getWeatherIcon(item);
		this.navController.push(WeatherDetailComponent,{
			'item':item,
			'icon-url':picUrl
		});
	}

	// 取消关注
	itemSelected(weather){
		this.alertCtrl.create({
			title: '天气',
			message: '你确定要取消关注该城市的天气信息吗？',
			buttons: [
			{
				text: '取消',
			},
			{
				text: '确定',
				handler: () => {
					this.weatherService.deleteCity(weather);
					this.getDatas();
					this.toastCtrl.create({
						message: "删除成功！",
						duration: 2000
					}).present();
				}
			}
			]
		}).present();
	}

	getDatas(){
		this.weathers = [];
		this.storage.forEach((value,key) => {
			let homeModel:HomeModel = JSON.parse(value);
			this.weathers.push(homeModel);
		});
	}

	ionViewDidLoad() {
		console.log('city-list:ionViewDidLoad');
		this.getDatas();
	}
	
	ionViewDidEnter() {
		console.log('weathers => ' + JSON.stringify(this.weathers));
	}
}