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
   
    this.Base.setMyData({
      order: "B"

    });
  }
  onMyShow() {
    var orderapi = new OrderApi();
    // orderapi.mylist({
    //   status: 'A,B',
    // }, (mylist) => {
    //   this.Base.setMyData({
    //     mylist
    //   })
    // })

    orderapi.mylist({
      status: 'L',
    }, (daifahuo) => {
      this.Base.setMyData({
        daifahuo
      })
    })

    orderapi.mylist({
      status: 'M',
    }, (daishouhuo) => {
      this.Base.setMyData({
        daishouhuo
      })
    })

    orderapi.mylist({
      status: 'N',
    }, (yiwancheng) => {
      this.Base.setMyData({
      
        yiwancheng
      })
    })

    orderapi.mylist({
      status: 'E',
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


  bindorder(e) {
    var orderid = e.currentTarget.dataset.order;
    console.log(orderid, "选中的节点值");
    this.Base.setMyData({
      order: orderid
    });
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindorder = content.bindorder;
body.bindreceive = content.bindreceive;
body.bindsend = content.bindsend;
body.bindsuccess = content.bindsuccess;
body.bindapply = content.bindapply;
Page(body)