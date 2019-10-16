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
      change: "A"

    });
  }
  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    orderapi.returnlist({
    orderstatus:'D'
    }, (returnlist) => {
      this.Base.setMyData({
        returnlist
      })
    })

    orderapi.returnlist({ 
      orderstatus: 'Y'
    }, (yituihuan) => {
      this.Base.setMyData({
        yituihuan
      })
    })
  }
  bindtui(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/changedetail/changedetail?id=' + id,
    })
   
  }

  bindchange(e) {
    var changeid = e.currentTarget.dataset.change;
    this.Base.setMyData({
      change: changeid
    });
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindchange = content.bindchange;
body.bindtui = content.bindtui;
Page(body)