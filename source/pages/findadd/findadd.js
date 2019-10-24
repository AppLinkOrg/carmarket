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
    // var json = JSON.parse(this.Base.options.json)
    this.Base.setMyData({
      fapiao: 'N',mcid:this.Base.options.mcid,biaoti:this.Base.options.biaoti
    })
 
    
  }
  onMyShow() {
    var that = this;

    if (this.Base.getMyData().list==undefined){
      var json = JSON.parse(this.Base.options.json);
      this.Base.setMyData({
        json
      })
    }else{
      var json = JSON.parse(this.Base.getMyData().list);
      this.Base.setMyData({
        json
      })
    }

    
    // for(var i=0;i<json.length;i++){
    //   json[i].num=1
    // }

  }

  bindimg(e) {
    var idx=e.currentTarget.id;
    var json = this.Base.getMyData().json;
   // var info = json[idx];

    wx.navigateTo({
      url: '/pages/serchgo/serchgo?info=' + JSON.stringify(json) + '&idx=' + idx + '&biaoti=' + this.Base.options.biaoti + '&vin=' + this.Base.options.vin,
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



  bindsubmit(e) {
    var that = this;
    // invoice_demand
    var shibie = this.Base.getMyData().json; 
    var fapiao = this.Base.getMyData().fapiao;
 
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
      success: function (res) {
        if (res.confirm) {

          wx.showLoading({
            title: '发布中',
            mask: true
          })

          var orderapi = new OrderApi();
          orderapi.create({
            quotestatus: 'Q',
            carmodel: that.Base.options.biaoti,
            vincode: that.Base.options.vin, 
            invoice_demand: fapiao,
            status: 'A'
          }, (create) => {

            that.Base.setMyData({
              create
            })

            for (var i = 0; i < shibie.length; i++) {

              var list = {
                quote_id: create.return,
                name: shibie[i].name,
                quantity: shibie[i].num,
                partnubmer: shibie[i].mid,
                photo1: shibie[i].photo[0],
                photo2: shibie[i].photo[1],
                photo3: shibie[i].photo[2],
                photo4: shibie[i].photo[3],
                photo5: shibie[i].photo[4],
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
      })
      
    }, i * 300)

    setTimeout(() => {
      wx.hideLoading();
      wx.reLaunch({
        url: '/pages/price/price',
      })
    }, json.length * 500)
   
 

  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindimg = content.bindimg;
body.bindsubmit = content.bindsubmit; 

body.fitting = content.fitting; 


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