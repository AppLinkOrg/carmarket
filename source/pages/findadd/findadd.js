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
      fapiao: 'N',
    })
  }
  onMyShow() {
    var that = this;

  }

  bindimg() {
    wx.navigateTo({
      url: '/pages/serchgo/serchgo',
    })
  }


  bindfabu() {
    wx.reLaunch({
      url: '/pages/price/price',
    })
  }


  bindadd() {
    wx.navigateBack({
      
    })
  }


  bindjian(e){
    var index = e.currentTarget.dataset.id;

  }


  bindjia(){
    var index = e.currentTarget.dataset.id;

  }


  bindfapiao(e) {
    var fapiaoed = e.currentTarget.id;
    if (fapiaoed == 'Y') {
      this.Base.setMyData({
        fapiao: 'N'
      })
    }
    if (fapiaoed == 'N') {
      this.Base.setMyData({
        fapiao: 'Y'
      })
    }

  }
  //多选
  bindchose(e) {
    var chose = e.currentTarget.dataset.chose;
    var xza = this.Base.getMyData().chose;
    if (xza == 'A') {
      this.Base.setMyData({
        chose: '',
      })
    } else {
      this.Base.setMyData({
        chose: chose,
      })
    }
  }

  bindxuanb(e) {
    var xuanb = e.currentTarget.dataset.xuanb;
    var xzb = this.Base.getMyData().xuanb;
    if (xzb == 'B') {
      this.Base.setMyData({
        xuanb: '',
      })
    } else {
      this.Base.setMyData({
        xuanb: xuanb,
      })
    }
  }
  bindxuanc(e) {
    var xuanc = e.currentTarget.dataset.xuanc;
    var xzc = this.Base.getMyData().xuanc;
    if (xzc == 'C') {
      this.Base.setMyData({
        xuanc: '',
      })
    } else {
      this.Base.setMyData({
        xuanc: xuanc,
      })
    }
  }
  bindxuand(e) {
    var xuand = e.currentTarget.dataset.xuand;
    var xzd = this.Base.getMyData().xuand;
    if (xzd == 'D') {
      this.Base.setMyData({
        xuand: '',
      })
    } else {
      this.Base.setMyData({
        xuand: xuand,
      })
    }
  }
  bindxuane(e) {
    var xuane = e.currentTarget.dataset.xuane;
    var xze = this.Base.getMyData().xuane;
    if (xze == 'E') {
      this.Base.setMyData({
        xuane: '',
      })
    } else {
      this.Base.setMyData({
        xuane: xuane,
      })
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindimg = content.bindimg;
body.bindfabu = content.bindfabu;
body.bindadd = content.bindadd;
body.bindfapiao = content.bindfapiao;
body.bindjian = content.bindjian;
body.bindjia = content.bindjia;

body.bindchose = content.bindchose;
body.bindxuanb = content.bindxuanb;
body.bindxuanc = content.bindxuanc;
body.bindxuand = content.bindxuand;
body.bindxuane = content.bindxuane;

Page(body)