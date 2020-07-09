// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CarApi } from "../../apis/car.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      arr:[]
    })
  }
  onMyShow() {
    var that = this;
    var carapi = new CarApi();
    var id = this.Base.options.id;
    var carapi = new CarApi();
    carapi.chakan({ id: id }, (ret) => {
      console.log(ret);
      var data = ret.list.data;
      for(var i=0;i<data.length;i++){
        data[i].statusLogs = data[i].statusLogs.reverse();
        for (var j = 0; j < data[i].statusLogs.length;j++){
          data[i].statusLogs[j].mon = data[i].statusLogs[j].time.slice(5, 10);
          data[i].statusLogs[j].shi = data[i].statusLogs[j].time.slice(11, data[i].statusLogs[j].time.length-8);
          data[i].statusLogs[j].time = data[i].statusLogs[j].mon+" "+data[i].statusLogs[j].shi;
          console.log(data[i].statusLogs[j].deliveryman.length==0);
            this.getdizhi((res) => {
              console.log(res, 'ret');

            }, data[i].statusLogs[j], j);
          
        }
      }
      this.Base.setMyData({
        data
      })
    })
  }
  getdizhi(callback,json,j){
    var arr = this.Base.getMyData().arr;
    var lat = json.coordinate.latitude;
    var lng = json.coordinate.longitude;
    var that= this;
    if (lat != undefined) {
      var url = 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + lat + ',' + lng + '&key=IDVBZ-TSAKD-TXG43-H442I-74KVK-6LFF5'
      wx.getLocation({
        success: function (res) {
          wx.request({
            url: url,
            success: function (result) {
              console.log(result, 'resss');
              var data = result.data.result.address_component;
              var city = data.province + data.city + data.district;
              json.address = city;
              arr[j] = json;
              that.Base.setMyData({
                arr
              })
              callback(json);
            }
          })
        },
      })
    }else {
      arr[j] = json;
      
      that.Base.setMyData({
        arr
      })
    }
    
   
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getdizhi = content.getdizhi;
Page(body)