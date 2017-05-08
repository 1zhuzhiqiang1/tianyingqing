import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Chart } from 'chart.js'; // 导入chart.js

import {Weather} from '../model/weather/weather';

@Component({
	templateUrl:'weather.detail.component.html'
})
export class WeatherDetailComponent {
	@ViewChild('chartBar') chartBar: ElementRef;

	weather:Weather;
	picUrl:string;

	constructor(
		private navParams: NavParams
	){
		this.weather = this.navParams.get('item');
		this.picUrl = this.navParams.get('icon-url');
		console.log("传递来的数据对象是："+JSON.stringify(this.weather));
	}

	ionViewDidEnter() {
		Chart.Bar(this.chartBar.nativeElement.getContext("2d"), {
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
				datasets: [{
					label: '呵呵',
					data: [12, 19, 3, 5, 2, 3],
					backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
	}
}