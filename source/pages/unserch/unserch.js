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
      fapiao: 'N', fittings: [], images: []
    })
  }
  onMyShow() {
    var that = this;

  }

  bindfapiao(e) {
    
    var fapiaoed = e.currentTarget.id;
    console.log('0000', fapiaoed);
     
      this.Base.setMyData({
        fapiao: fapiaoed
      })
    
 

  }

  bindupimg() {
    var that = this;
    this.Base.uploadImage("quote", (ret) => {
      that.Base.setMyData({
        imageone: ret,
        one: true,
      })
    },1)
  }



  binduptwo() {
    var that = this;
    this.Base.uploadImage("quote", (ret) => {
      that.Base.setMyData({
        imagetwo: ret,
        two: true,
      })
    },1)
  }

  bindupthree() {
    var that = this;
    this.Base.uploadImage("quote", (ret) => {
      that.Base.setMyData({
        imagethree: ret,
        three: true,
      })
    },1)
  }

  jguploadimg() {
    var that = this;
    this.Base.uploadImage("quote", (ret) => {
      var images = that.Base.getMyData().images;

      images.push(ret);
      that.Base.setMyData({
        images
      });

    }, 9, undefined);
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

    this.Base.gotoBottom();

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

    var images = this.Base.getMyData().images;
    var imagefour = this.Base.getMyData().imagefour;
    var imagefive = this.Base.getMyData().imagefive;
    var shibie = this.Base.getMyData().fittings;
    var fapiao = this.Base.getMyData().fapiao;
    console.log(shibie);
    //return;

    if (imageone==undefined){
     wx.showToast({
       title: '请选择铭牌图片',
       icon:'none'
     })
     return;
    }
    if (imagetwo == undefined) {
      wx.showToast({
        title: '请选择车头图片',
        icon: 'none'
      })
      return;
    }
    if (imagethree == undefined) {
      wx.showToast({
        title: '请选择车尾图片',
        icon: 'none'
      })
      return;
    }
 
    if (shibie == '') {
      wx.showToast({
        title: '请输入零件名并识别',
        icon: 'none'
      })
      return;
    }
 

    wx.showModal({
      title: '提交',
      content: '确认发布询价？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor00: '#2699EC',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '发布中',
            mask: true
          })

          var orderapi = new OrderApi();
          orderapi.create({
            quotestatus: 'Q',
            employee_id: that.Base.getMyData().employeeinfo.id,
            employee_id_mobile: that.Base.getMyData().employeeinfo.mobile,
            enterprise_id: that.Base.getMyData().employeeinfo.enterprise.id,
            namesplate: imageone,
            frontofcar: imagetwo,
            rearofcar: imagethree,
            photo1: images, 
            invoice_demand: fapiao,
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
        
      })
    }, i * 300)

    wx.reLaunch({
      url: '/pages/price/price',
    })
  }



}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindfubu = content.bindfubu;
body.binddelect = content.binddelect;

body.jguploadimg = content.jguploadimg;
body.jgminusImg = content.jgminusImg;

body.fitting = content.fitting;
body.bindsubmit = content.bindsubmit;

body.recognition = content.recognition;

body.bindquchu = content.bindquchu;
body.bindshibie = content.bindshibie;
body.bindclear = content.bindclear;
body.bindfapiao = content.bindfapiao;
body.bindupimg = content.bindupimg;
body.binduptwo = content.binduptwo;
body.bindupthree = content.bindupthree;
body.bindupfour = content.bindupfour;
body.bindupfive = content.bindupfive;
Page(body)