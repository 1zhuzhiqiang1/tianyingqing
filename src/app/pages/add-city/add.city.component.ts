import {Component} from '@angular/core';
import {Http} from "@angular/http";
import { ViewController, ToastController, NavParams } from "ionic-angular";
import { Storage } from '@ionic/storage';

import { Weather } from '../model/weather/weather';
import { WeatherService } from '../../../providers/weather-service';
import { MyConst } from '../model/MyConst';

@Component({
  templateUrl: './add.city.component.html',
  styleUrls:['/pages/add-city/add.city.component.scss']
})
export class AddCityComponent {
	city:string;
	cityName:string;
	cityNum:number;
	homePage;

	constructor(
		private http: Http,
  		private viewController: ViewController,
  		private toastCtrl: ToastController,
  		private storage: Storage,
  		private weatherService:WeatherService,
  		private navParams: NavParams
  	) {
  		this.homePage = this.navParams.get('homePage');
  		console.log('homePage='+this.homePage);
  	}

	dismiss() {
		this.viewController.dismiss();
	}

	ionViewWillEnter() {
		this.storage.get(MyConst.CITY_NUM).then((result) => {
     		console.log("num => " + result);
     		this.cityNum = result;
     	});
	}

	register() {
		this.weatherService.getWeather(this.cityName).then(result => {
			if(result == null){
				this.toastCtrl.create({
                    	message: "对不起，没有该城市的数据。",
                    	duration: 1000
                	}).present();
			}else{
				this.homePage.update();
				this.toastCtrl.create({
                    	message: "添加城市成功",
                    	duration: 1000
                	}).present();
			}
		});
	}
}
