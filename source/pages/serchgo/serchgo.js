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

    var list = JSON.parse(this.Base.options.info);
    var info = list[this.Base.options.idx];
    if (info.photo.length > 0) {
      this.Base.setMyData({ images: info.photo })
    } else {
      this.Base.setMyData({ images: [] })
    }
    this.Base.setMyData({ list, beizhu: info.beizhu,biaoti:this.Base.options.biaoti,vin:this.Base.options.vin })
     
    //this.Base.setMyData({ images: [] })
  }
  onMyShow() {
    var that = this;
  
  }
  clickimage() {
    var that = this;
    this.Base.uploadImage("product", (ret) => {
      console.log(ret, "有没有")
      that.Base.setMyData({
        image: ret,
        one: true,
      })
    })

  }
  binddelect() {
    this.Base.setMyData({
      one: false
    })
  }

  bindart(e) {
    this.Base.setMyData({
      beizhu: e.detail.value
    })
  }




  jguploadimg() {
    var that = this;
    this.Base.uploadImage("fittings", (ret) => {
      var images = that.Base.getMyData().images;
      if (images.length<5){
        images.push(ret);
        that.Base.setMyData({
          images
        });
      }else{
        wx.showToast({
          title: '最多上传5张图片',
          icon:'none'
        })
      }
      
    }, 5, undefined);
  }

  jgminusImg(e) {
    var that = this;
    var seq = e.currentTarget.id;
    var images = that.Base.getMyData().images;
    var imgs = [];
    for (var i = 0; i < images.length; i++) {
      if (seq != i) {
        imgs.push(images[i]);
      }
    }
    that.Base.setMyData({
      images: imgs
    });
  }

  bindbaocun(e) {
    var that=this;
    var list = this.Base.getMyData().list;
    var idx = this.Base.options.idx;
    var images = this.Base.getMyData().images;
    var beizhu = this.Base.getMyData().beizhu;

  
    list[idx].beizhu = beizhu;
    //list[idx].imgnum = images.length;
    list[idx].photo = images;
    // list[idx].photo2 = images[1];
    // list[idx].photo3 = images[2];
    // list[idx].photo4 = images[3];
    // list[idx].photo5 = images[4];


    console.log(list)
    //return;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    var json = JSON.stringify(list)

    //不需要页面更新
    prevPage.setData({
      list: json
    })

    wx.navigateBack({

    })

  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;

body.bindart = content.bindart;

body.jguploadimg = content.jguploadimg;
body.jgminusImg = content.jgminusImg;

body.clickimage = content.clickimage;
body.bindbaocun = content.bindbaocun;
body.binddelect = content.binddelect;
Page(body)