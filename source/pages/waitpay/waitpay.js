// pages/waitpay/waitpay.js
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
    //options.id=1;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var sumprice=0;
    var orderapi = new OrderApi();
    orderapi.mylist({
      order_status: 'W',quote_id:this.Base.options.id
    }, (mylist) => { 
      for (var i = 0; i < mylist.length;i++){
        sumprice += parseFloat(mylist[i].totalamount) ;
      }
      
      this.Base.setMyData({
        mylist, sumprice
      })
    })
  }

  bindbuy(){
    var that = this;
    var orderapi = new OrderApi();
    var mylist=this.Base.getMyData().mylist;
 
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
          orderapi.updatemoney({
            id: that.Base.getMyData().employeeinfo.id,
            money: that.Base.getMyData().sumprice
          }, (updatemoney) => {
            for (var i = 0; i < mylist.length; i++) {
              orderapi.updatestatus({
                id: mylist[i].id,
                order_status: "L"
              }, (updatestatus) => {
              })
            }
            // wx.reLaunch({
            //   url: '/pages/order/order',
            // })
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