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
      vin:this.Base.options.vin,
      b:this.Base.options.brandCode,
      c:this.Base.options.mcid,
      biaoti:this.Base.options.biaoti

    })
  }
  onMyShow() {
    var that = this;
    var carapi = new CarApi();

    carapi.searchhistory({}, (searchhistory) => {
      this.Base.setMyData({
        searchhistory
      })
    })

    carapi.addhistory({}, (addhistory) => {
      this.Base.setMyData({
        addhistory
      })
    })

  }
  setPageTitle(instinfo) {
    wx.setNavigationBarTitle({
      title: '添加配件',
    })
  }
  bindpart(e) {
    console.log(e,"输出")
    this.Base.setMyData({
      search_key: e.detail.value
    })
    var carapi = new CarApi();
    var search_key = e.detail.value;
    var vin = this.Base.getMyData().vin;
    var brandCode = this.Base.getMyData().b
    var mcid = this.Base.getMyData().c;

    carapi.partsearch({
      vin:vin,
      brandCode:brandCode,
      mcid:mcid,
      search_key:search_key
    }, (partsearch) =>{
      this.Base.setMyData({
        partsearch
      })
    })

  }
  binddelect() {
    var that = this;
    this.Base.setMyData({
      partinput: ''
    })
  }
  bindquchu(){

  }
  bindclick() {
    // var that = this;
    // var api = new CarApi();
    // api.vin({
    //   vin: vin
    // }, (res) => {
    //   this.Base.setMyData({

    //   })
    // })
  }
  bindleft(){

  }
  bindnext() {
    wx.navigateTo({
      url: '/pages/findadd/findadd',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindpart = content.bindpart;
body.binddelect = content.binddelect;
body.bindnext = content.bindnext;
body.bindclick = content.bindclick;
body.bindleft = content.bindleft; 
body.bindquchu = content.bindquchu; 
Page(body) 