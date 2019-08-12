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
    var vin="";
    if(options.vin!=undefined){
      vin=options.vin;
    }

    this.Base.setMyData({
      jhjj: [],
      qwrfwa: [],
      vin
    });

  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var carapi = new CarApi();
    var orderapi = new OrderApi();
    var jhjj = this.Base.getMyData().jhjj;
    var qwrfwa = this.Base.getMyData().qwrfwa;
    console.log(13132131);
    console.log(this.Base.getMyData().jhjj11);

    if (this.Base.getMyData().jhjj11 != undefined) {
      var jiancha = jhjj.filter((item) => {

        return item.name == this.Base.getMyData().jhjj11.name;

      })
      console.log('jianchale');
      console.log(jiancha);
      console.log(jiancha.name);
     
      if (jiancha.length!=0) {
        console.log("重复");
        console.log(jhjj);
        jhjj.map((item) => {
          console.log(item);
          console.log(11111);
          if (item.name == jiancha[0].name) {
            item.num++;
          }

        })
        this.Base.setMyData({
          jhjj11: undefined
        })
      }
      else {
        console.log("不重复");
        jhjj.push(this.Base.getMyData().jhjj11);
        this.Base.setMyData({
          jhjj11: undefined
        })
      }
    }

    if (this.Base.getMyData().qwrfwa11 != undefined) {
      qwrfwa.push(this.Base.getMyData().qwrfwa11);
      this.Base.setMyData({
        qwrfwa11: undefined
      })
    }
    this.Base.setMyData({
      jhjj: jhjj,
      qwrfwa: qwrfwa
    })
    //console.log(ssasd, "浏览")
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


  bindshou() {
    var vin = this.Base.getMyData().a;
    var brandCode = this.Base.getMyData().b
    var mcid = this.Base.getMyData().c
    var carapi = new CarApi();

    console.log(vin, brandCode, mcid, "输出来啦啦啦");

    wx.navigateTo({
      url: '/pages/serchgo/serchgo?vin=' + vin + '&brandCode=' + brandCode + '&mcid=' + mcid,
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
      vin: ''
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


  bindadd(e) {
    var jhjj = this.Base.getMyData().jhjj;


    jhjj[e.currentTarget.id].num = jhjj[e.currentTarget.id].num + 1;
    this.Base.setMyData({

      jhjj: jhjj
    })
  }
  //减
  bindreduce(e) {
    var jhjj = this.Base.getMyData().jhjj;

    if (jhjj[e.currentTarget.id].num == 1) {


      this.Base.setMyData({
        jhjj: jhjj.filter((item, idx) => {

          return idx != [e.currentTarget.id];

        })
      })
      console.log(jhjj);

      return

    }

    jhjj[e.currentTarget.id].num = jhjj[e.currentTarget.id].num - 1;
    this.Base.setMyData({

      jhjj: jhjj
    })







  }

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

    var orderapi = new OrderApi();
    var mcid = this.Base.getMyData().c;
    var vin = this.Base.getMyData().vin;
    var brandCode = this.Base.getMyData().b;
    var carname = this.Base.getMyData().biaoti;
    var needinvoice = 'Y';
    var jhjj = this.Base.getMyData().jhjj;
    var qwrfwa = this.Base.getMyData().qwrfwa;
    var items = this.Base.getMyData().items;

    var item = jhjj.map((item) => {
      return item = item.name + '|12313|' + item.num;
    })
    var items = item.join(',');
    console.log(mcid);
    orderapi.create({
      mcid: mcid,
      vin: vin,
      brandCode: brandCode,
      carname: carname,
      needinvoice: needinvoice,
      items: items

    }, (res) => {
      console.log(res);
    })


    //console.log(vin, brandCode, mcid,"史蒂夫");
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