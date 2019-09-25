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
    var json = JSON.parse(this.Base.options.json)
    this.Base.setMyData({
      fapiao: 'N', json
    })

    var json = JSON.parse(this.Base.options.json);
    
  }
  onMyShow() {
    var that = this;
    
    // for(var i=0;i<json.length;i++){
    //   json[i].num=1
    // }
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
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    var json = JSON.stringify(this.Base.getMyData().json)
    
    //不需要页面更新
    prevPage.setData({
      json: json
    })
    wx.navigateBack({
      
    })
  }


  bindjian(e){
    var type = e.currentTarget.dataset.type;
    var idx = e.currentTarget.id; 
    var json = this.Base.getMyData().json;
    
      if (type == 'add') {
        json[idx].num++
      } else {
        if (json[idx].num<=1){
          wx.showToast({
            title: '数量不能低于1~',
            icon:'none'
          })
          return;
        }else{
          json[idx].num--
        }
        
      }
 
    this.Base.setMyData({ json })
    

  }
  
  bindbeizhu(e) {
    var idx = e.currentTarget.id;
    var json = this.Base.getMyData().json;

    json[idx].beizhu=e.detail.value;

    this.Base.setMyData({ json: json })
    
    // console.log(e);
    // console.log(e.currentTarget.id);

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

body.bindbeizhu = content.bindbeizhu; 

body.bindchose = content.bindchose;
body.bindxuanb = content.bindxuanb;
body.bindxuanc = content.bindxuanc;
body.bindxuand = content.bindxuand;
body.bindxuane = content.bindxuane;

Page(body)