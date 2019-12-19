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
  }

  onMyShow() {
    var that = this;
    var orderApi = new OrderApi();
    orderApi.consumelist({
      enterprise_id: that.Base.getMyData().employeeinfo.enterprise.id
    }, (list) => {
      console.log(list,'ooooo')
      this.Base.setMyData({
        list
      });
    });
  }
  
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: "我的账户",
    })
  }
  todetails(e){
    wx.navigateTo({
      url: '/pages/success/success?id='+e.currentTarget.id,
      
    })
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.todetails = content.todetails;
Page(body)