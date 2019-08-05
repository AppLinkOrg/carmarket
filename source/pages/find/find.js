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
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '找零件',
    });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var carapi = new CarApi();

    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({
        indexbanner
      });
    });

    carapi.searchhistory({}, (searchhistory) => {
      this.Base.setMyData({
        searchhistory
      });
    });

  }

  bindclear(){
    var that=this;
    var carapi = new CarApi();
    wx.showModal({
      title: '提示',
      content: '是否全部清空',
      confirmText: "确认",
      success: function (res) {
        if (res.confirm) {
          carapi.clearallsearch({}, (clearallsearch) => {
            console.log(clearallsearch);
            that.onMyShow();
          });
        } else {
        
        }
      }
    })
  }


  clickvin() {
  wx.navigateTo({
  url: '',
})
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.clickvin = content.clickvin;
body.bindclear = content.bindclear; 
Page(body)