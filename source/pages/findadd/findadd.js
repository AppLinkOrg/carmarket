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
      fapiao:'N',
    })
  }
  onMyShow() {
    var that = this;

  }
  bindchose(e) {
    //var id = e.currentTarget.id
    var chose = e.currentTarget.dataset.chose;
    this.Base.setMyData({
      chose: chose,
    })
  }
  bindimg(){
    var that=this;
    this.Base.uploadImage("product",(ret)=>{
      that.Base.setMyData({
        image:ret,
        upimage:true
      })
    })


  }
  bindupimg(){
    var that=this;
    this.Base.uploadImage("upimage",(ret)=>{
      that.Base.setMyData({
        image:ret,
        chuanimg:true
      })
    })

  }
  bindfabu(){
    wx.reLaunch({
      url: '/pages/price/price',
    })
  }
  bindadd(){
    wx.navigateTo({
      url: '/pages/check/check',
    })

  }
  bindfapiao(e){
    var fapiaoed = e.currentTarget.id;
    if(fapiaoed=='Y'){
      this.Base.setMyData({
        fapiao:'N'
      })
    }
    if(fapiaoed=='N'){
      this.Base.setMyData({
        fapiao:'Y'
      })
    }

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindchose = content.bindchose;
body.bindimg = content.bindimg;
body.bindfabu = content.bindfabu;
body.bindadd = content.bindadd;
body.bindfapiao = content.bindfapiao; 
body.bindupimg = content.bindupimg;
Page(body)