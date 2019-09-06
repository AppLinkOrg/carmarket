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
    this.Base.setMyData({
      fittings: []
    })
  }
  onMyShow() {
    var that = this;

  }


  bindupimg() {
    var that = this;
    this.Base.uploadImage("quote", (ret) => {
      that.Base.setMyData({
        imageone: ret,
        one: true,
      })
    })
  }

  binduptwo() {
    var that = this;
    this.Base.uploadImage("quote", (ret) => {
      that.Base.setMyData({
        imagetwo: ret,
        two: true,
      })
    })
  }

  bindupthree() {
    var that = this;
    this.Base.uploadImage("quote", (ret) => {
      that.Base.setMyData({
        imagethree: ret,
        three: true,
      })
    })
  }

  bindupfour() {
    var that = this;
    this.Base.uploadImage("quote", (ret) => {
      that.Base.setMyData({
        imagefour: ret,
        four: true,
      })
    })
  }

  bindupfive() {
    var that = this;
    this.Base.uploadImage("quote", (ret) => {
      that.Base.setMyData({
        imagefive: ret,
        five: true,
      })
    })
  }


  binddelect() {
    this.Base.setMyData({
      four: false
    })
  }
  bindquchu() {
    this.Base.setMyData({
      five: false
    })
  }



  bindfubu() {
    wx.reLaunch({
      url: '/pages/price/price',
    })
  }


  recognition(e) {


    var shibie = (e.detail.value).split(/[,?. ，。''‘’“”""!``~+_-]/);

    this.Base.setMyData({
      shibie
    })

    //console.log(hangshu)
  }

  bindshibie(e) {
    var fittings = this.Base.getMyData().shibie;

    this.Base.setMyData({
      fittings
    })
  }
  bindclear(e) {
    var idx = e.currentTarget.id;
    var fittings = this.Base.getMyData().fittings;

    fittings.splice(idx, 1);
    this.Base.setMyData({
      fittings
    })
  }

  bindsubmit(e) {
    var that = this;
    var imageone = this.Base.getMyData().imageone;
    var imagetwo = this.Base.getMyData().imagetwo;
    var imagethree = this.Base.getMyData().imagethree;
    var imagefour = this.Base.getMyData().imagefour;
    var imagefive = this.Base.getMyData().imagefive;
    var shibie = this.Base.getMyData().fittings;
    console.log(shibie);
    //return;

    wx.showModal({
      title: '提交',
      content: '确认发布询价？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '发布中',
            mask: true
          })

          var orderapi = new OrderApi();
          orderapi.create({
            quotestatus: 'Q',
            namesplate: imageone,
            frontofcar: imagetwo,
            rearofcar: imagethree,
            photo1: imagefour,
            photo2: imagefive,
            status: 'A'

          }, (create) => {

            that.Base.setMyData({
              create
            })


            for (var i = 0; i < shibie.length; i++) {

              var list = {
                quote_id: create.return,
                name: shibie[i],
                quantity: 1,
                status: 'A'
              }
              that.fitting(list, i)

            }


          })

        }
      }
    });

  }

  fitting(json, i) {
    var that = this;
    var orderapi = new OrderApi();
    setTimeout(() => {
      orderapi.addfittings(json, (addfittings) => {
        that.Base.setMyData({
          addfittings
        })
        wx.hideLoading();
        wx.reLaunch({
          url: '/pages/price/price',
        })
      })
    }, i * 300)
  }



}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindfubu = content.bindfubu;
body.binddelect = content.binddelect;

body.fitting = content.fitting;
body.bindsubmit = content.bindsubmit;

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