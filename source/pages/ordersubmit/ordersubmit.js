// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      gouxuan:'N',
      wechatxz:'F'
    })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();

    instapi.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    });
  }
  bindgouxuan(e){
    var gouxuan = e.currentTarget.id;
    if(gouxuan=='N'){
      this.Base.setMyData({
        gouxuan:'Y'
      })
    }
    if(gouxuan=='Y'){
      this.Base.setMyData({
        gouxuan:'N'
      })
    }

  }
  bindwechat(e){
    var wechatxz = e.currentTarget.id;
    if (wechatxz=='F'){
      this.Base.setMyData({
        wechatxz:'S'
      })
    }
    if(wechatxz=='S'){
      this.Base.setMyData({
        wechatxz:'F'
      })
    }
  }
  bindfukuan(){
    this.Base.setMyData({
      showModal:true
    })
  }
  binddelect() {
    this.Base.setMyData({
      showModal: false
    })
  }

  confirm() {
    this.Base.setMyData({
      showModal: true
    })
    wx.navigateTo({
      url: '/pages/jiaoyisuccess/jiaoyisuccess',
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindgouxuan = content.bindgouxuan;
body.bindwechat = content.bindwechat;

body.bindfukuan = content.bindfukuan;
body.binddelect = content.binddelect;
body.confirm = content.confirm;
Page(body)