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
  bindvin() {
    var that = this;
    var vin = this.Base.getMyData().vin;
    var carapi = new CarApi();
    carapi.vin({
      vin: vin
    }, (res) => {
      this.Base.setMyData({
        a: res.data.vin,
        b: res.data.brandCode,
        c: res.data.mcid,
        biaoti: res.title[0] + res.title[1] + res.title[2] + res.title[3] + res.title[4]
      })
      console.log(res.data.vin, res.data.brandCode, res.data.mcid, res,"输出");
      if (res.code == 0) {
        that.Base.info(res.msg);
      }
      var biaoti = this.Base.getMyData().biaoti;
      if (res.code == 1) {
        console.log(res.code);
        carapi.addhistory({
          vin: vin,
          carrecord: biaoti
        }, (qwe) => {
          that.onMyShow();
        })
      }
    })
  }
  bindvalue(e) {
    this.Base.setMyData({
      vin: e.detail.value
    })

  }
  bindsearch(e) {
    var vin = this.Base.getMyData().a;
    var biaoti = this.Base.getMyData().biaoti;
    var brandCode = this.Base.getMyData().b
    var mcid = this.Base.getMyData().c
    var api = new CarApi();
    console.log(vin, biaoti, "聊聊");
    wx.navigateTo({
      url: '/pages/check/check?vin=' + vin + '&biaoti=' + biaoti + '&brandCode=' + brandCode +'&mcid=' + mcid,
    })
  }


  bindclear() {
    var that = this;
    var carapi = new CarApi();
    wx.showModal({
      title: '提示',
      content: '是否全部清空',
      confirmText: "确认",
      success: function(res) {
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

  bindcheck() {


    wx.navigateTo({
      url: '/pages/check/check',
    })
  }
  bindunable() {
    wx.navigateTo({
      url: '/pages/unserch/unserch'
    })
  }


  clickvin() {
    // var that = this;
    // this.Base.takeImage("product", (ret) => {
    //   var images = that.Base.getMyData().images;
    //   images.push(ret);
    //   that.Base.setMyData({
    //     images
    //   });
    // });
    wx.navigateTo({
      url: '/pages/vinscan/vinscan',
    })
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.clickvin = content.clickvin;
body.bindclear = content.bindclear;
body.bindcheck = content.bindcheck;
body.bindunable = content.bindunable;
body.bindsearch = content.bindsearch;
body.bindvin = content.bindvin;
body.bindvalue = content.bindvalue;
Page(body)