import {Component} from '@angular/core';
import {Http} from "@angular/http";
import { Loading, Modal, Platform, NavController, ViewController, ToastController } from "ionic-angular";
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: './add.city.component.html',
  styleUrls:['/pages/add-city/add.city.component.scss']
})
export class AddCityComponent {
	city;
	num;

	constructor(
		private http: Http,
		private navController: NavController,
  		private viewController: ViewController,
  		private platform: Platform,
  		private toastCtrl: ToastController,
  		private storage: Storage
  		) {
		
		this.city = {};
		this.city.cityname = "";
	}

	dismiss() {
		this.viewController.dismiss();
	}

	ionViewWillEnter() {
		this.storage.get('num').then((result) => {
     		console.log("num => " + result);
     		this.num = result;
     	});
	}

	// 
	register() {
		this.http.get("http://apicloud.mob.com/v1/weather/query?key=f1fb6815bbb6&city=" + this.city.cityname)
	    	.subscribe(data => {
	    		console.log(data.json());
	    		if (data.json().retCode == "200") {
	    			this.num++;
	    			var url = "http://qiniu.ursb.me/image/city-" + Math.floor(Math.random() * 4) + ".png";
	    			console.log('url => ' + url);
	    			this.storage.set('num', this.num);
	    			this.storage.set('distrct' + this.num, data.json().result[0].distrct);
	         		this.storage.set('weather' + this.num, data.json().result[0].weather);
	         		this.storage.set('temperature' + this.num, data.json().result[0].temperature);
	    			this.storage.set('picture' + this.num, url);
	    			this.toastCtrl.create({
                    	message: "添加成功！",
                    	duration: 1000
                	}).present();
	    		} else {
	    			this.toastCtrl.create({
                    	message: "对不起，没有该城市的数据。",
                    	duration: 1000
                	}).present();
	    		}
	    	}, error => {
	      		console.log("400");
	    }); 
	}
}
