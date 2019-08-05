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
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '我的',
    });
  }
  bindright() {
    wx.navigateTo({
      url: '/pages/edit/edit',
    })
  }

  bindorder() {
    wx.reLaunch({
      url: '/pages/order/order',
    })
  }

  bindaddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  }
  bindauth() {
    wx.navigateTo({
      url: '/pages/authority/authority',
    })
  }
  bindaccount() {
    wx.navigateTo({
      url: '/pages/account/account',
    })
  }
  bindchange() {
    wx.navigateTo({
      url: '/pages/change/change',
    })
  }
  bindaboutus() {
    wx.navigateTo({
      url: '/pages/aboutus/aboutus',
    })
  }

  bindhelp() {
    wx.navigateTo({
      url: '/pages/helpcenter/helpcenter',
    })
  }

  logout() {
    wx.showModal({
      title: '提示',
      content: '确认退出当前用户？',
      confirmText: "退出",
      success: function(res) {
        if (res.confirm) {
          wx.clearStorage();
          wx.redirectTo({
            url: '/pages/login/login',
          })
        } else {

        }
      }
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindright = content.bindright;
body.bindorder = content.bindorder;
body.bindaddress = content.bindaddress;
body.bindauth = content.bindauth;
body.bindaccount = content.bindaccount;
body.bindchange = content.bindchange;
body.bindaboutus = content.bindaboutus;
body.bindhelp = content.bindhelp;
body.logout = content.logout;
Page(body)