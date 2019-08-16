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
      qty: 1,

      quan: 'B'

    });
  }

  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var orderapi = new OrderApi();
    var id = this.Base.options.id;

    orderapi.detail({
      id: id,
    }, (change) => {
      change.orderitems.map((item) => {
        item.xz = false;
      })
      this.Base.setMyData({
        change
      });
      console.log(change);
    });
  }



  bindxuanze(e) {
    var change = this.Base.getMyData().change;
    console.log(change, "sdfsdfg")

    var xuan = e.currentTarget.dataset.id;
    change.orderitems[xuan].xz = !change.orderitems[xuan].xz;
    this.Base.setMyData({
      change
    })
  }
  bindall(e) {
    var change = this.Base.getMyData().change;
    var quan = e.currentTarget.id;
    if (quan == 'Q') {
      change.orderitems.map((item) => {
        item.xz = false;
      })
      this.Base.setMyData({
        quan: 'B'
      })
    }

    if (quan == 'B') {
      change.orderitems.map((item) => {
        item.xz = true;
      })
      this.Base.setMyData({
        quan: 'Q'
      })
    }
    this.Base.setMyData({
      change
    })
  }

  bindreduce(e) {
    var index = e.currentTarget.dataset.id;
    var change = this.Base.getMyData().change;
    var qty = change.orderitems[index].qty;
    if (qty == 1) {
      return
    } else {
      change.orderitems[index].qty--;
      this.Base.setMyData({
        change
      })
    }
  }


  bindadd(e) {
    var index = e.currentTarget.dataset.id;
    var change = this.Base.getMyData().change;
    console.log(change.orderitems[index].qty, "加出来")

    change.orderitems[index].qty++;
    this.Base.setMyData({
      change
    })
  }
  bindsub(e) {

    wx.navigateTo({
      url: '/pages/change/change',
    })
  }

  bindcon() {
    this.Base.setMyData({
      content: e.detail.value
    })
  }

  setPageTitle(instinfo) {
    var title = "退换货申请";
    wx.setNavigationBarTitle({
      title: title,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindsub = content.bindsub;
body.bindcon = content.bindcon;
body.bindxuanze = content.bindxuanze;
body.bindall = content.bindall;
body.bindreduce = content.bindreduce;
body.bindadd = content.bindadd;
Page(body)