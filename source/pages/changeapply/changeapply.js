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
      id:this.Base.options.id,
    }, (change) => {
      this.Base.setMyData({ 
        change 
        });
    });
  }
  
  bindsub(e) {
    
    wx.navigateTo({
      url: '/pages/change/change',
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
Page(body)