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
    this.Base.setMyData({
      vin: this.Base.options.vin,
      carname: this.Base.options.carname,
    });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var orderapi = new OrderApi();

    var id = this.Base.options.id;
    var vin = this.Base.getMyData().vin;
    var carname = this.Base.getMyData().carname;
    console.log(id, "我问问");

    orderapi.detail({
      id: id,
    }, (chuanzhi) => {
      this.Base.setMyData({
        chuanzhi
      })

    });
  }

  bindadddizhi() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  }

  bindreduce() {

  }


  bindtijiao() {

    var orderapi = new OrderApi();
   
    var order_id = this.Base.getMyData().order_id;
    var receiveaddress = this.Base.getMyData().receiveaddress;
    var receiver = this.Base.getMyData().receiver;

    orderapi.confirmquote({
      order_id: id,
      quote_id: quote_id,
      receiveaddress: receiveaddress,
      receiver: receiver,
      receivecontact: receivecontact,
      needitems: needitems,
      noneeditems: noneeditems,

    }, (querenbaojia) => {
      this.Base.setMyData({
        querenbaojia
      });
    });
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
body.bindadddizhi = content.bindadddizhi;
body.bindtijiao = content.bindtijiao;

body.bindreduce = content.bindreduce;
body.bindadd = content.bindadd;
Page(body)