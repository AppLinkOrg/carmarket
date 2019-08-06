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
  CarApi
} from "../../apis/car.api.js";

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
    var carapi = new CarApi();

  }
  binpart(e) {
    console.log(e);
    this.Base.setMyData({
      part: e.detail.value
    });

  }

  binpartsearch() {
    var that = this;
    var partsearch = this.Base.getMyData().partsearch;
    var api = new CarApi();
    api.partsearch({
      partsearch: partsearch
    }, (res) => {
      console.log(res);

   
    })
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
body.binpartsearch = content.binpartsearch;
body.binpart = content.binpart;
Page(body)