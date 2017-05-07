import { Weather } from './weather/weather';

export class HomeModel {
	weather:Weather;
	pic:string;

	constructor(pic:string,weather){
		this.pic = pic;
		this.weather = new Weather(weather);
	}
}