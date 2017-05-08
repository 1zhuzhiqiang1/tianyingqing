import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import {Weather} from '../model/weather/weather';

@Component({
	templateUrl:'weather.detail.component.html'
})
export class WeatherDetailComponent {

	weather:Weather;
	picUrl:string;

	constructor(
		private navParams: NavParams
	){
		this.weather = this.navParams.get('item');
		this.picUrl = this.navParams.get('icon-url');
		console.log("传递来的数据对象是："+JSON.stringify(this.weather));
	}
}