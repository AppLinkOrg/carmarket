// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  CarApi
} from "../../apis/car.api.js";



class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;

  }
  clickimage(){
    var that = this;
    this.Base.uploadImage("product",(ret)=>{
      console.log(ret,"有没有")
      that.Base.setMyData({
        image:ret,
        one:true,
      })
    })

  }

  bindbaocun() {
    wx.navigateTo({
      url: '/pages/findadd/findadd',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.clickimage = content.clickimage;
body.bindbaocun = content.bindbaocun;
Page(body)