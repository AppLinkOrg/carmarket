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
    var orderapi = new OrderApi();
    if(this.Base.options.order_id!=undefined){
      orderapi.returnlist({
        order_id: this.Base.options.order_id,
      }, (returnlist) => {
        var info = returnlist[0];
        info.tuihuoitem = returnlist[0].returnitem
        this.Base.setMyData({
          info
        });
      });
    }else {
      orderapi.returndetail({
        id: this.Base.options.id
      }, (info) => {
        this.Base.setMyData({
          info
        });
      });
    }
    

  }

  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '退货申请',
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)