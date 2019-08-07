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
    var instapi = new InstApi();
    var carapi = new CarApi();



  }


  bindclear() {
    var that = this;
    this.Base.setMyData({
      searchinput: ''
    })
  }
  setPageTitle(instinfo) {
    var title = "配件查询";
    wx.setNavigationBarTitle({
      title: title,
    })
  }

  clickimage() {
    var that = this;
    this.Base.uploadImage("product", (ret) => {
      var images = that.Base.getMyData().images;
      images.push(ret);
      that.Base.setMyData({
        images
      });
    });
  }

  complete(e) {
    wx.navigateTo({
      url: '/pages/check/check',
    })
    // wx.navigateBack({
    //   delta: 2
    // })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.complete = content.complete;
body.bindclear = content.bindclear;
body.clickimage = content.clickimage;

Page(body)