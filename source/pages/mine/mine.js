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

    consumeapi.list({

    }, (list) => {
      this.Base.setMyData({
        list
      });
    });
  }


  bindjilu(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/jiaoyijilu/jiaoyijilu?id=' + id,
    })
  
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
  bindaccount(){
    wx.navigateTo({
      url: '/pages/account/account',
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
body.bindjilu = content.bindjilu; 
body.logout = content.logout;
Page(body)