var Weather = (function () {
    function Weather(obj) {
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
    return Weather;
}());
export { Weather };
//# sourceMappingURL=weather.js.map