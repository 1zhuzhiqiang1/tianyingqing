export class Weather {
	airCondition:string; //空气
	city:string;		//城市
	coldIndex:string;	//冷空气来袭
	date:string;		//日期
	distrct:string;		//城市
	dressingIndex:string;	//适宜穿戴
	exerciseIndex:string;	//外出活动
	future:string;		//未来天气 json数组
	humidity:string;	//湿度
	pollutionIndex:string;	//污染程度
	province:string;	//城市
	sunrise:string;	//日出时间
	sunset:string;	//日落时间
	temperature:string;	//温度
	time:string;	//当前时间
	updateTime:string; //更新时间
	washIndex:string;  //洗衣服
	weather:string;	//天气
	week:string;	//星期
	wind:string;	//风力

	constructor(obj){
		this.airCondition = obj.airCondition;
		this.city = obj.city;
		this.coldIndex = obj.coldIndex;
		this.date = obj.data;
		this.distrct = obj.distrct;
		this.dressingIndex = obj.dressingIndex;
		this.exerciseIndex = obj.exerciseIndex;
		this.future = obj.future;
		this.humidity = obj.humidity;
		this.pollutionIndex = obj.pollutionIndex;
		this.province = obj.province;
		this.sunrise = obj.sunrise;
		this.sunset = obj.sunset;
		this.temperature = obj.temperature;
		this.time = obj.time;
		this.updateTime = obj.updateTime;
		this.washIndex = obj.washIndex;
		this.weather = obj.weather;
		this.week = obj.week;
		this.wind = obj.wind;
		
		// console.log('123'+obj.airCondition);
	}
}