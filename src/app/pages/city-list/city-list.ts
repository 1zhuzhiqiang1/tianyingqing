import {Component} from '@angular/core';
import {Http} from "@angular/http";
import { Loading, Platform, NavController, ViewController,AlertController,ToastController } from "ionic-angular";
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: './city-list.html'
})

export class CityListPage {
	num;
	weather;
	weathers;

  	constructor(
  		private http: Http,
  		private navController: NavController,
  		private viewController: ViewController,
  		private platform: Platform,
  		private storage: Storage,
  		public alertCtrl: AlertController,
  		public toastCtrl: ToastController
  		) {

		this.weathers = [];
		this.weather = {};
		this.weather.id = 0;
		this.weather.city = "";
		this.weather.wea = "";
		this.weather.temp = "";
		this.weather.pic = "http://qiniu.ursb.me/image/city-1.png";

  	}

	itemSelected(item){
		this.alertCtrl.create({
      		title: '甜影强',
      		message: '你确定要取消关注该城市的天气信息吗？',
			buttons: [
				{
				  	text: '取消',
				},
				{
					text: '确定',
					handler: () => {
						var id = item.id;
						this.storage.set('distrct' + id, "");
						this.storage.set('weather' + id, "");
						this.storage.set('temperature' + id, "");
						this.storage.set('picture' + id, "");
						this.storage.get('num').then((result) => {
							console.log('num => ' + result);
							this.storage.set('num', result --);
							this.num = result;
							this.weathers = [];
							for (var i = 1; i <= result; i++) {

								var city = "";
								var wea = "";
								var temp = "";
								var pic = "";
								var id = 0;

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
									id ++;
									console.log("id => " + id);
									var obj = new Weather(id, city, wea, temp, pic);
									console.log(obj);
									this.weathers.push(obj);
								});
							}
						});
						this.toastCtrl.create({
	                    	message: "删除成功！",
	                    	duration: 2000
	                	}).present();
					}
				}
			]
		}).present();
	}

	ionViewWillEnter() {
		console.log('city-list:onPageWillEnter');
        this.weathers = [];

	   	this.storage.get('num').then((result) => {
		console.log('num => ' + result);
		this.num = result;

		for (var i = 1; i <= result; i++) {

			var city = "";
			var wea = "";
			var temp = "";
			var pic = "";
			var id = 0;

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
				id ++;
				console.log("id => " + id);
				var obj = new Weather(id, city, wea, temp, pic);
				console.log(obj);
				this.weathers.push(obj);
			});
		}

		});
	}
	
    ionViewDidEnter() {
		console.log('weathers => ' + JSON.stringify(this.weathers));
    }
}


class Weather {

	city;
	weather;
	temp;
	pic;
	id;

	constructor(id, city, weather, temp, pic) {
		this.id = id;
		this.city = city;
		this.weather = weather;
		this.temp = temp;
		this.pic = pic;
	}
}