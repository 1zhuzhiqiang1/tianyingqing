import {Component} from '@angular/core';
import {Http} from "@angular/http";
import { Toast, Alert, Modal, Loading, Platform, NavController, ViewController} from "ionic-angular";
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: './clause.html'
})

export class ClausePage {

  	constructor(private http: Http,
  		private navController: NavController,
  		private viewController: ViewController,
  		private platform: Platform) {
  	}

}