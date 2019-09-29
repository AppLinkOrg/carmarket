// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js"; 
import { OrderApi } from "../../apis/order.api.js";
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

    orderapi.detail({
      id: this.Base.options.id
    }, (daishouhuo) => {
      this.Base.setMyData({
        daishouhuo
      })
    })
  }

  bindshou(e){
    var id = e.currentTarget.id
    var orderapi = new OrderApi();


    wx.showModal({
      title: '收货',
      content: '确认货物已收到？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          orderapi.updatestatus({
            id: id,
            order_status: "N"
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
body.bindshou = content.bindshou; 
Page(body)