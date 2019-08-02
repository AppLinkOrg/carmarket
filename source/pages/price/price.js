// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

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
  }
  setPageTitle(instinfo) {
    var title = "报价中心";
    wx.setNavigationBarTitle({
      title: title,
    })
  }

  pricedetail() {
    wx.navigateTo({
      url: '/pages/pricedetail/pricedetail',
    })
  }


  bindpricing(){
    wx.navigateTo({
      url: '/pages/pricingdetail/pricingdetail',
    })

  }
  

  bindlost() {
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail',
    })
  }

  bindcheck(e){
    var checkid = e.currentTarget.dataset.check;

    console.log(checkid,"选中的节点值");

   // return;

    this.Base.setMyData({
      check: checkid
    });
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.pricedetail = content.pricedetail;
body.bindpricing = content.bindpricing;
body.bindlost = content.bindlost;

body.bindcheck = content.bindcheck;


Page(body)