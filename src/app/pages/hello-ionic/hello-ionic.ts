import {Component} from '@angular/core';
import { Modal, Loading, Platform, NavController} from "ionic-angular";
import { Storage } from '@ionic/storage';

import { AddCityComponent } from '../add-city/add.city.component';

@Component({
  templateUrl: './hello-ionic.html'
})
export class HelloIonicPage {
	num;
	weather;
	weathers;
	
  	constructor(
  		private navController: NavController,
  		private platform: Platform,
  		private storage: Storage,
  	) {
		this.weathers = [];
		this.weather = {};
		this.weather.city = "";
		this.weather.wea = "";
		this.weather.temp = "";
		this.weather.pic = "http://qiniu.ursb.me/image/city-1.png";
  	}

  	ionViewWillEnter() {
  		console.log('onPageWillEnter');
        this.weathers = [];

		this.storage.get('num').then((result) => {
			console.log('num => ' + result);
			this.num = result;
			
			for (var i = 1; i <= result; i++) {

				var city = "";
				var wea = "";
				var temp = "";
				var pic = "";

				this.storage.get('distrct' + i).then((result) => {
					city = result;
					console.log(city);
				});
				this.storage.get('weather' + i).then((result) => {
					console.log(result);
					wea = result;
				});
				this.storage.get('temperature' + i).then((result) => {
					console.log(result);
					temp = result;
				});
				this.storage.get('picture' + i).then((result) => {
					console.log(result);
					pic = result;
					var obj = new Weather(city, wea, temp, pic);
					console.log(obj);
					this.weathers.push(obj);
				});
			}
		});
	}

    ionViewDidEnter() {
		console.log('weathers => ' + JSON.stringify(this.weathers));
    }

    addCity() {
     	this.navController.push(AddCityComponent);
    }
}

class Weather {
	city;
	weather;
	temp;
	pic;

	constructor(city, weather, temp, pic) {
		this.city = city;
		this.weather = weather;
		this.temp = temp;
		this.pic = pic;
	}
}
