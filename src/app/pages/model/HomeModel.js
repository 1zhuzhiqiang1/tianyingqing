import { Weather } from './weather/weather';
var HomeModel = (function () {
    function HomeModel(pic, weather) {
        this.pic = pic;
        this.weather = new Weather(weather);
    }
    return HomeModel;
}());
export { HomeModel };
//# sourceMappingURL=HomeModel.js.map