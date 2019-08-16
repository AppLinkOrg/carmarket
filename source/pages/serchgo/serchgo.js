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
    this.Base.setMyData({
      vin: this.Base.options.vin,
      b: this.Base.options.brandCode,
      c: this.Base.options.mcid,
    });
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var carapi = new CarApi();
  }


  bindclear() {
    var that = this;
    this.Base.setMyData({
      searchinput: ''
    })
  }
  setPageTitle(instinfo) {
    var title = "配件查询";
    wx.setNavigationBarTitle({
      title: title,
    })
  }

  clickimage() {
    
    var that = this;
    this.Base.uploadImage("product", (ret) => {
      console.log(ret,"查看")
      that.Base.setMyData({
        image: ret,
        one: true,
      });
    });
  }
  bindart(e) {
    console.log(e);
    this.Base.setMyData({
      part: e.detail.value
    });

    var carapi = new CarApi();
    var search_key = e.detail.value;
    var vin = this.Base.getMyData().vin;
    var brandCode = this.Base.getMyData().b;
    var mcid = this.Base.getMyData().c;

    //return;
    //接口传值
    carapi.partsearch({
      vin: vin,
      brandCode: brandCode,
      mcid: mcid,
      search_key: search_key
    }, (partsearch) => {
      this.Base.setMyData({
        partsearch
      });
    });
  }
  complete(e) {
    console.log(e, "啦啦啦");
    //return;
    var qqljk = { name: this.Base.getMyData().part,num:1}  ;
    console.log(qqljk);
    //return;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
   console.log("sdfsdsds")
    //return;
    prevPage.setData({
     
      jhjj11: qqljk
    })
    wx.navigateBack({})
  }

  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.complete = content.complete;
body.bindclear = content.bindclear;
body.clickimage = content.clickimage;
body.bindart = content.bindart;

Page(body)