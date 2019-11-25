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
   // options.id = 1;
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
 
  }

  bindquxiao(e) {
    var that =this;
    var orderapi = new OrderApi();
    wx.showModal({
      title: '取消订单',
      content: '确认取消订单？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          
          orderapi.updatestatus({
            id: that.Base.options.id,
            order_status: "E"
          }, (updatestatus) => {
            wx.navigateBack({
            })
          })
        }
      }
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