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

    this.Base.setMyData({
      order: "A"
    });
  }
  onMyShow() {
    var orderapi = new OrderApi();
 
    orderapi.mylist({
      order_status: 'W', employee_id: this.Base.getMyData().emp_id
    }, (daifukuan) => {
      this.Base.setMyData({
        daifukuan
      })
    })

    orderapi.mylist({
      order_status: 'L', employee_id: this.Base.getMyData().emp_id
    }, (daifahuo) => {
      this.Base.setMyData({
        daifahuo
      })
    })

    orderapi.mylist({
      order_status: 'M', employee_id: this.Base.getMyData().emp_id
    }, (daishouhuo) => {
      this.Base.setMyData({
        daishouhuo
      })
    })

    orderapi.mylist({
      order_status: 'N,R,Y', employee_id: this.Base.getMyData().emp_id
    }, (yiwancheng) => {
      this.Base.setMyData({
        yiwancheng
      })
    })

    orderapi.mylist({
      order_status: 'E', employee_id: this.Base.getMyData().emp_id
    }, (yiquxiao) => {
      this.Base.setMyData({
        yiquxiao
      })
    })


  }

  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '我的订单',
    });
  }

  bindsend(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/waitsend/waitsend?id=' + id,
    })

  }

  bindreceive(e) {
    var id = e.currentTarget.id;
    console.log(id);
    //return;
    wx.navigateTo({
      url: '/pages/waitreceive/waitreceive?id=' + id,
    })
  }

  bindsuccess(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/success/success?id=' + id,
    })
  }

  totuihuan(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/changeapply/changeapply?id=' + id,
    })
  }

  bindorder(e) {

    var id = this.Base.getMyData().employeeinfo.id;
    console.log(id);

    var orderid = e.currentTarget.dataset.order;
    //console.log(orderid, "选中的节点值");
    this.Base.setMyData({
      order: orderid
    });
  }


  bindquxiao(e) {
    var that = this;
    var orderapi = new OrderApi();
    wx.showModal({
      title: '取消订单',
      content: '确认取消订单？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {

          orderapi.updatestatus({
            id: e.currentTarget.id,
            order_status: "E"
          }, (updatestatus) => {
            that.onMyShow();
          })
        }
      }
    })




  }

  bindshou(e) {
    var id = e.currentTarget.id
    var orderapi = new OrderApi();
    var that = this;
    wx.showModal({
      title: '收货',
      content: '确认货物已收到？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {
          orderapi.updatestatus({
            id: id,
            order_status: "N"
          }, (updatestatus) => {
            that.onMyShow();
          })
        }
      }
    })




  }


  bindtobuy(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/obligations/obligations?id=' + id
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindorder = content.bindorder;
body.bindreceive = content.bindreceive; 

body.totuihuan = content.totuihuan; 

body.bindquxiao = content.bindquxiao;
body.bindshou = content.bindshou;
body.bindtobuy = content.bindtobuy;

body.bindsend = content.bindsend;
body.bindsuccess = content.bindsuccess;
body.bindapply = content.bindapply;
Page(body)