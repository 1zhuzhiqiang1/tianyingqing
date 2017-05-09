import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Chart } from 'chart.js'; // 导入chart.js

import {Weather} from '../model/weather/weather';

@Component({
	templateUrl:'weather.detail.component.html'
})
export class WeatherDetailComponent {
	@ViewChild('chartBar') chartBar: ElementRef;

	weather;
	picUrl:string;
	futureWeeks = [];
	wenduArray = [];

	constructor(
		private navParams: NavParams
		){
		this.weather = this.navParams.get('item');
		this.picUrl = this.navParams.get('icon-url');
		let future = this.weather.future;
		for (let i=0;i<future.length;i++) {
			this.futureWeeks.push(future[i].week);
			this.wenduArray.push(future[i].temperature.substr(0,2));
		}
		console.log("传递来的数据对象是："+JSON.stringify(this.weather));
	}

	share(){
		
	}

	ionViewDidEnter() {
		Chart.Line(this.chartBar.nativeElement.getContext("2d"),{
			data:{
				labels: this.futureWeeks,
				datasets: [{
					label: "温度",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(75,192,192,0.4)",
					borderColor: "rgba(75,192,192,1)",
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: "rgba(75,192,192,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(75,192,192,1)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: this.wenduArray,
					spanGaps: false,
				}
				],
				options:{
					scaleStartValue:10
				}
			}
		});

	}
}