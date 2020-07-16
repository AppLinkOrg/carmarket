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
    var carapi=new CarApi();
    carapi.pinzhilist({ orderby: 'r_main.seq' }, (pinzhilist) => {
      for (var i = 0; i < pinzhilist.length;i++){
        pinzhilist[i].check=false;
      }
      this.Base.setMyData({ pinzhilist })
    })
   // console.log(JSON.parse(this.Base.options.json),'999');
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
      json: json,select:true
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
   //  console.log('0000', fapiaoed);

    this.Base.setMyData({
      fapiao: fapiaoed
    })

  }
  //多选
  bindchose(e) {

    var id = e.currentTarget.id;

    var pinzhilist = this.Base.getMyData().pinzhilist;

    if (pinzhilist[id].check == true){
      pinzhilist[id].check = false;
   }else{
      pinzhilist[id].check = true;
   }
   
    this.Base.setMyData({ pinzhilist});
 
  }

  


  bindsubmit(e) {
    var that = this; 
    var shibie = this.Base.getMyData().json; 
    var fapiao = this.Base.getMyData().fapiao;
    var pinzhilist=this.Base.getMyData().pinzhilist;
    var arr=[];
    for (var i = 0; i < pinzhilist.length;i++){
      if (pinzhilist[i].check==true){
           arr.push(pinzhilist[i].name)
         }
    }
    var pinzhi = arr;
    //console.log(arr);
   //return;
    //console.log(shibie);

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
            employee_id: that.Base.getMyData().employeeinfo.id,
            enterprise_id: that.Base.getMyData().employeeinfo.enterprise.id,
            quotestatus: 'Q', 
            carmodel: that.Base.options.biaoti,
            vincode: that.Base.options.vin, 
            invoice_demand: fapiao,
            pinzhi: pinzhi,
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
                Sprice: shibie[i].cost_price,
                status: 'A',
                remarks_infor: shibie[i].beizhu
              }
              that.fitting(list, i, shibie.length)
 
             

            }


          })

        }
      }
    });

  }

  fitting(json, i,length) {
    var that = this;
    var orderapi = new OrderApi();
    setTimeout(() => {
      orderapi.addfittings(json, (addfittings) => {
        that.Base.setMyData({
          addfittings
        }) 
      })
      if (i + 1 == length){
        wx.hideLoading();
        wx.reLaunch({
          url: '/pages/price/price',
        })
      }
      
      
    }, i * 300)

  }

  clearfits(e){
   var idx=e.currentTarget.id;
    var json = this.Base.getMyData().json;
    json.splice(idx,1)
    this.Base.setMyData({ json})
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindimg = content.bindimg;
body.bindsubmit = content.bindsubmit; 

body.fitting = content.fitting; 

body.clearfits = content.clearfits; 

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