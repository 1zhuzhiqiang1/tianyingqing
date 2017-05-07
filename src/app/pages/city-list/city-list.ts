import {Component} from '@angular/core';
import { Http } from "@angular/http";
import { NavController,AlertController,ToastController } from "ionic-angular";
import { Storage } from '@ionic/storage';

import { WeatherService } from '../../../providers/weather-service';
// 详情页
import { WeatherDetailComponent } from '../weather-detail-page/weather.detail.component';
import { Weather } from '../model/weather/weather';
import { MyConst } from '../model/MyConst';

@Component({
  templateUrl: './city-list.html',
  styleUrls:['/pages/city-list/city-list.scss']
})

export class CityListPage {
	num;
	weather:Weather;
	weathers:Array<Weather>;

  	constructor(
  		private http: Http,
  		private navController: NavController,
  		private storage: Storage,
  		public alertCtrl: AlertController,
  		public toastCtrl: ToastController,
  		private weatherService:WeatherService
  		) {}

  	clickItem(item){
  		this.navController.push(WeatherDetailComponent,{
  			'item':item
  		});
  	}

// 取消关注
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
						this.storage.get(MyConst.CITY_NUM).then(result => {
							for (var i = 0; i < result; i++) {
								if(item == this.weathers[i]){
									this.storage.set(MyConst.WEATHER+'-'+i,null);
									break;
								}
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

	ionViewDidLoad() {
		console.log('city-list:ionViewDidLoad');
        this.weatherService.getWeathersFromLocal().then(result => {
        	this.weathers = result;
        });
	}
	
    ionViewDidEnter() {
		console.log('weathers => ' + JSON.stringify(this.weathers));
    }
}