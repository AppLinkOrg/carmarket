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

import {
  AddressApi
} from "../../apis/address.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      qty: 1,
      xuan: 'N',
      quan: 'B'
      // vin: this.Base.options.vin,
      // carname: this.Base.options.carname,
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
    var addressapi = new AddressApi();
    addressapi.addresslist({

    }, (addresslist) => {
      this.Base.setMyData({
        addresslist
      })
    })

    orderapi.detail({
      id: id,
    }, (chuanzhi) => {

      chuanzhi.orderitems.map((item) => {

        item.xz = false;

      })

      this.Base.setMyData({
        chuanzhi
      })
      console.log(chuanzhi);
    });
    // var quote_id = this.Base.getMyData().quote_id;
    // var needitems = this.Base.getMyData().needitems;
    // var noneeditems = this.Base.getMyData().noneeditems;
    // var anotherprice = this.Base.getMyData().anotherprice;
    orderapi.confirmquote({
      order_id: id,
      // quote_id,
      // needitems,
      // noneeditems,    
      // anotherprice,
    }, (querenbaojia) => {
      this.Base.setMyData({

        querenbaojia
      });
    });
  }

  bindadddizhi() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  }

  bindchoice(e) {
    var chuanzhi = this.Base.getMyData().chuanzhi;
    var xuan = e.currentTarget.dataset.id;
    chuanzhi.orderitems[xuan].xz = !chuanzhi.orderitems[xuan].xz;
    this.Base.setMyData({
      chuanzhi
    })
  }

  bindallchoice(e) {
    var chuanzhi = this.Base.getMyData().chuanzhi;
    var quan = e.currentTarget.id;
    if (quan == 'Q') {
      chuanzhi.orderitems.map((item) => {
        item.xz = false;
      })
      this.Base.setMyData({
        quan: 'B'
      })
    }

    if (quan == 'B') {
      chuanzhi.orderitems.map((item) => {
        item.xz = true;
      })
      this.Base.setMyData({
        quan: 'Q'
      })
    }
    this.Base.setMyData({
      chuanzhi
    })
  }

  bindadd(e) {
    var index = e.currentTarget.dataset.id;
    var chuanzhi = this.Base.getMyData().chuanzhi;
    console.log(chuanzhi.orderitems[index].qty, "sdgytrujtutrk")
    chuanzhi.orderitems[index].qty ++;
    console.log(chuanzhi.orderitems[index].qty, "输出")
    this.Base.setMyData({
      chuanzhi
    })
  }

  bindreduce(e) {
    var index = e.currentTarget.dataset.id;
    var chuanzhi = this.Base.getMyData().chuanzhi;
    var qty = chuanzhi.orderitems[index].qty;
    if (qty == 1) {
      return
    } else {
      chuanzhi.orderitems[index].qty--;
      this.Base.setMyData({
        chuanzhi
      })
    }
  }

  binddizhi(e) {
    this.Base.setMyData({
      dizhi: e.detail.value
    })
  }

  bindtijiao() {
    this.Base.setMyData({
      showModal: true
    })

    var orderapi = new OrderApi();

    // var order_id = this.Base.getMyData().order_id;
    // var receiveaddress = this.Base.getMyData().receiveaddress;
    // var receiver = this.Base.getMyData().receiver;

    // orderapi.confirmquote({
    //   order_id: id,
    //   quote_id: quote_id,
    //   receiveaddress: receiveaddress,
    //   receiver: receiver,
    //   receivecontact: receivecontact,
    //   needitems: needitems,
    //   noneeditems: noneeditems,

    // }, (querenbaojia) => {
    //   this.Base.setMyData({
    //     querenbaojia
    //   });
    // });
  }

  binddelect() {

    this.Base.setMyData({
      showModal: false
    })
  }

  confirm() {
    
    this.Base.setMyData({
      showModal: true
    })

    wx.navigateTo({
      url: '/pages/jiaoyisuccess/jiaoyisuccess',
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
body.bindadddizhi = content.bindadddizhi;
body.bindtijiao = content.bindtijiao;
body.confirm = content.confirm;

body.bindreduce = content.bindreduce;
body.bindadd = content.bindadd;
body.binddizhi = content.binddizhi;
body.binddelect = content.binddelect;
body.bindchoice = content.bindchoice;
body.bindallchoice = content.bindallchoice;
Page(body)