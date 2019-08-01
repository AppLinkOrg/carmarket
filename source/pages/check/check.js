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

    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({
        indexbanner
      });
    });
  }
  setPageTitle(instinfo) {
    var title = "车架号查询";
    wx.setNavigationBarTitle({
      title: title,
    })
  }

  add() {
    wx.navigateTo({
      url: '/pages/serch/serch',
    })
  }

  public() {
    wx.navigateTo({
      url: '/pages/pricedetail/pricedetail',
    })
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.add = content.add;
body.public = content.public;
Page(body)