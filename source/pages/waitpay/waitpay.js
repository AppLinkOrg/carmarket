// pages/waitpay/waitpay.js
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

  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '等待付款',
    });
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=2;
    super.onLoad(options);
  }
 

  onMyShow() {
    var that = this;
    var sumprice = 0;
    var orderapi = new OrderApi();
    var arr = [];
     var all=this.Base.options.order_id;
    // var all="3,4";
    console.log(all,'订单id')
   // return;
   // var idlist=all.split(",");
    orderapi.mylist({
      // quote_id: 3,
      order_status: 'W',
      id: all
    }, (mylist) => {
      
      for (var i = 0; i < mylist.length; i++) { 
        sumprice += parseFloat(mylist[i].totalamount)  ;
      }

       sumprice = sumprice.toFixed(2);
      this.Base.setMyData({
        mylist: mylist,
        sumprice
      })
    })
  }

  bindbuy() {
    var that = this;
    var orderapi = new OrderApi();
    var mylist = this.Base.getMyData().mylist;
    // console.log(mylist);
    // return
    var sumprice = this.Base.getMyData().sumprice;
    var enmoney = this.Base.getMyData().employeeinfo.enterprise.account_money;
    wx.showModal({
      title: '付款',
      content: '确认付款？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在付款~',
          })

          if (Number(sumprice) > Number(enmoney)){
            wx.showToast({
              title: '余额不足，请及时充值！',
              icon: 'none'
            })
            return;
          }


          for (var i = 0; i < mylist.length; i++) {

            var list = {
              enterprise_id: that.Base.getMyData().employeeinfo.enterprise.id,
              employee_id: that.Base.getMyData().employeeinfo.id,
              amount: mylist[i].totalamount,
              type: 'G',
              enterprise_id2: mylist[i].enterprise_id,
              employee_id2: mylist[i].baojia,
              order_id: mylist[i].id,
              type2: 'S'
            }

            orderapi.updatestatus({
              id: mylist[i].id,
              order_status: "L",
              quote_id: that.Base.options.id
            }, (updatestatus) => {

            })

            orderapi.updatemoney({
              id: that.Base.getMyData().employeeinfo.enterprise.id,
              ent_id: mylist[i].enterprise_id,
              em_id: mylist[i].baojia,
              money: mylist[i].totalamount
            }, (updatemoney) => {
 
            })
  
           // that.bindinsert2(list2, i)
 
            orderapi.editquotation({
              quotecompan_id: mylist[i].enterprise_id,
              quote_id: mylist[i].quote_id,
              quotestatus: 'W',
              quoteper: mylist[i].baojia,
            }, (editquotation) => {

            })

            // orderapi.editquotestatus({
            //   quoteenterprise_id: mylist[i].enterprise_id,
            //   quote_id: mylist[i].quote_id,
            //   quotestatus: 'C',
            //   invalid: 'Y'
            // }, (editquotestatus) => {
            //   console.log(editquotestatus, 'ooooo')
            // })

            that.bindinsert(list, i);

          }
 
        }
      }
    })


  }

  bindinsert(json, i) {
    var that = this;
    var orderapi = new OrderApi();
    setTimeout(() => { 
      orderapi.addconsume(json, (updatestatus) => {
        console.log(updatestatus, '-9961')
      }) 
    }, i * 300)

    setTimeout(() => {
      wx.hideLoading();
      wx.reLaunch({
        url: '/pages/order/order',
      })
    }, i * 500)
 
  }

 
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindbuy = content.bindbuy; 
body.bindinsert = content.bindinsert;  
Page(body)