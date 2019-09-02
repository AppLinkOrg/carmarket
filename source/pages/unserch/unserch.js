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
    this.Base.setMyData({ fittings:[]})
  }
  onMyShow() {
    var that = this;

  }


  bindupimg() {
    var that = this;
    this.Base.uploadImage("product", (ret) => {
      that.Base.setMyData({
        imageone: ret,
        one: true,
      })
    })
  }

  binduptwo() {
    var that = this;
    this.Base.uploadImage("product", (ret) => {
      that.Base.setMyData({
        imagetwo: ret,
        two: true,
      })
    })
  }

  bindupthree() {
    var that = this;
    this.Base.uploadImage("product", (ret) => {
      that.Base.setMyData({
        imagethree: ret,
        three: true,
      })
    })
  }

  bindupfour() {
    var that = this;
    this.Base.uploadImage("product", (ret) => {
      that.Base.setMyData({
        imagefour: ret,
        four: true,
      })
    })
  }

  bindupfive() {
    var that = this;
    this.Base.uploadImage("product", (ret) => {
      that.Base.setMyData({
        imagefive: ret,
        five: true,
      })
    })
  }

 
  binddelect() {
    this.Base.setMyData({
      four:false
    })
  }
  bindquchu(){
    this.Base.setMyData({
      five: false
    })
  }

  bindfubu() {
    wx.reLaunch({
      url: '/pages/price/price',
    })
  }
  recognition(e){

    var shibie = (e.detail.value).split(',')
    
    this.Base.setMyData({ shibie})
    
    //console.log(hangshu)
  }

  bindshibie(e) {
    var fittings = this.Base.getMyData().shibie;
 
    this.Base.setMyData({ fittings})
  }
  bindclear(e){
    var idx=e.currentTarget.id;
    var fittings = this.Base.getMyData().fittings;

    fittings.splice(idx, 1);
    this.Base.setMyData({ fittings})
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindfubu = content.bindfubu;
body.binddelect = content.binddelect; 

body.recognition = content.recognition;

body.bindquchu = content.bindquchu; 
body.bindshibie = content.bindshibie; 
body.bindclear = content.bindclear;

body.bindupimg = content.bindupimg;
body.binduptwo = content.binduptwo;
body.bindupthree = content.bindupthree;
body.bindupfour = content.bindupfour;
body.bindupfive = content.bindupfive; 
Page(body)