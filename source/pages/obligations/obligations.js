// pages/obligations/obligations.js
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
    //options.id=1;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var sumprice = 0;
    var orderapi = new OrderApi();
    orderapi.detail({
      order_status: 'W',
      id: this.Base.options.id
    }, (detail) => {
      this.Base.setMyData({
        detail
      })
    })
  }

  bindbuy(e) {
    var that = this;
    var orderapi = new OrderApi();
    var price = e.currentTarget.id;
    var mylist = this.Base.getMyData().mylist;

    wx.showModal({
      title: '购买',
      content: '确认购买？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {
          orderapi.updatemoney({
            id: that.Base.getMyData().employeeinfo.id,
            money: price
          }, (updatemoney) => {
            orderapi.updatestatus({
              id: that.Base.options.id,
              order_status: "L"
            }, (updatestatus) => {

            })

            wx.navigateBack({

            })

          })
        }
      }
    })





  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindbuy = content.bindbuy;
Page(body)