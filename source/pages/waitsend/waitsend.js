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
    //var id = this.Base.options.id;

    orderapi.detail({
      id: this.Base.options.id
    }, (daifahuo) => {
      this.Base.setMyData({
        daifahuo
      })
    })

    orderapi.updatestatus({
   
    }, (update) => {
      this.Base.setMyData({
        update
      });
    });
  }

  bindquxiao(e) {
    var id = e.currentTarget.id 
    var orderapi = new OrderApi();
    orderapi.updatestatus({
      order_id: id,
      status: "E"

    }, (myd) => {
      this.Base.setMyData({
        myd
      })
    })
    wx.reLaunch({
      url: '/pages/order/order',
    })
  }

  setPageTitle(instinfo) {
    var title = "订单详情";
    wx.setNavigationBarTitle({
      title: title,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.bindquxiao = content.bindquxiao; 
Page(body)