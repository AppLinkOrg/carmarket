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

    carapi.searchhistory({}, (searchhistory) => {
      this.Base.setMyData({
        searchhistory
      });
    });

    carapi.addhistory({}, (addhistory) => {
      this.Base.setMyData({
        addhistory
      });
    });
  }


  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: "车架号查询",
    })
  }

  binddelete() {
    var that = this;
    this.Base.setMyData({
      searchinput: ''
    })
  }

  clickcamera() {
    var that = this;
    this.Base.takeImage("product", (ret) => {
      var images = that.Base.getMyData().images;
      images.push(ret);
      that.Base.setMyData({
        images
      });
    });
  }

  bindadd() {
    var add = e.currentTarget.setMyData.add
    this.Base.setMyData({});
  }
  bindreduce() {

  }

  add() {
    wx.navigateTo({
      url: '/pages/serch/serch',
    })
  }

  public() {
    wx.switchTab({
      url: '/pages/price/price',
    })
  }

  binvin(e) {
    console.log(e);
    this.Base.setMyData({
      vin: e.detail.value
    });

  }
  convin() {
    var that = this;
    var vin = this.Base.getMyData().vin;
    var api = new CarApi();
    api.vin({
      vin: vin
    }, (res) => {
      console.log(res);

      if (res.code == 0) {
        that.Base.info(res.msg);
      }
      var biaoti = res.title[0] + res.title[1] + res.title[2] + res.title[3] + res.title[4];
      if (res.code == 1) {
        console.log(res.code);
        api.addhistory({
          vin: vin,
          carrecord: biaoti
        }, (qwe) => {

          that.onMyShow();
        })
      }
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.add = content.add;
body.public = content.public;
body.binddelete = content.binddelete;
body.bindadd = content.bindadd;
body.bindreduce = content.bindreduce;
body.clickcamera = content.clickcamera;
body.binvin = content.binvin;
body.convin = content.convin;
Page(body)