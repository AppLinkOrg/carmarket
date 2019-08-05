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


  binddelete() {
    var that = this;
    this.Base.setMyData({
      searchinput: ''
    })
  } 
  setPageTitle(instinfo) {
    var title = "配件查询";
    wx.setNavigationBarTitle({
      title: title,
    })
  }

  complete(e) {
    wx.navigateTo({
      url: '/pages/check/check',
    })

  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.complete = content.complete;
body.binddelete = content.binddelete;
Page(body)