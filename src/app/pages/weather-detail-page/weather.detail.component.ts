import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';

import {Weather} from '../model/weather/weather';

@Component({
	templateUrl:'weather.detail.component.html'
})
export class WeatherDetailComponent {

	weather:Weather;

	constructor(
		private navParams: NavParams
	){
		this.weather = this.navParams.get('item');
		console.log("传递来的数据对象是："+JSON.stringify(this.weather));
	}
}