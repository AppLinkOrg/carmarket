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

import {
  OrderApi
} from "../../apis/order.api.js";

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
    var orderapi = new OrderApi();

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

    orderapi.create({}, (create) => {
      this.Base.setMyData({
        create: create
      });
    });


  }
  bindshou() {
    wx.navigateTo({
      url: '/pages/serchgo/serchgo',
    })
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
    // var add = e.currentTarget.setMyData.add
    // this.Base.setMyData({});
  }
  bindreduce() {}

  add(e) {
    // var vin = e.currentTarget.vin
    // console.log(vin)

    var vin = this.Base.getMyData().a;
    var brandCode = this.Base.getMyData().b
    var mcid = this.Base.getMyData().c
    var carapi = new CarApi();

    console.log(vin, brandCode, mcid, "输出");

    wx.navigateTo({
      url: '/pages/serch/serch?vin=' + vin + '&brandCode=' + brandCode + '&mcid=' + mcid,
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
    var api654654 = new CarApi();
    api654654.vin({
      vin: vin
    }, (res) => {
      this.Base.setMyData({

        a: res.data.vin,
        b: res.data.brandCode,
        c: res.data.mcid,
        biaoti: res.title[0] + res.title[1] + res.title[2] + res.title[3] + res.title[4]
      })

      console.log(res.data.vin, res.data.brandCode, res.data.mcid, "输出");

      if (res.code == 0) {
        that.Base.info(res.msg);
      }
      var biaoti = this.Base.getMyData().biaoti;

      if (res.code == 1) {
        console.log(res.code);
        api654654.addhistory({
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
body.bindshou = content.bindshou; 
Page(body)