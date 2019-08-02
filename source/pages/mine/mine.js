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
  bindright(){
    wx.navigateTo({
      url: '/pages/edit/edit',
    })
  }

  logout(){
    wx.showModal({
      title: '提示',
      content: '确认退出当前用户？',
      confirmText: "退出",
      success: function (res) {
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
body.logout = content.logout;
Page(body)