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
    var instapi = new InstApi();

    instapi.addhistory({}, (addhistory) => {
      this.Base.setMyData({ addhistory });
    });


  }
  setPageTitle(instinfo) {
    var title = "配件查询";
    wx.setNavigationBarTitle({
      title: title,
    })
  }

  binddelete() {
    var that = this;
    this.Base.setMyData({
      searchinput: ''
    })
  } 

  addclick() {
    wx.navigateTo({
      url: '/pages/serchgo/serchgo',
    })

  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.addclick = content.addclick;
body.binddelete = content.binddelete;
Page(body)