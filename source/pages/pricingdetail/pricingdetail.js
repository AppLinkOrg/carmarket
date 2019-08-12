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
  OrderApi
} from "../../apis/order.api.js";

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
    var orderapi = new OrderApi();


    // orderapi.detail({
    //   name = this.Base.options.name
    // }, (index) => {
    //   this.Base.setMyData({
    //     index
    //   });
    // });
  }
  bindqueren(e) {
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail',
    })
  }


  setPageTitle(instinfo) {
    var title = "报价详情";
    wx.setNavigationBarTitle({
      title: title,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindqueren = content.bindqueren;
Page(body)