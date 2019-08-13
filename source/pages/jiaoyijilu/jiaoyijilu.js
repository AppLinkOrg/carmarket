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
  ConsumeApi
} from "../../apis/consume.api.js";

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
    var consumeapi = new ConsumeApi();
    var id = this.Base.options.id;
    consumeapi.list({
      employee_id:id,
    }, (list) => {
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


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

Page(body)