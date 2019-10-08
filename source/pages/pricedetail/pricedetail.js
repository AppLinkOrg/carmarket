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
    //options.id = 1;
    super.onLoad(options);
    this.Base.setMyData({
      xuan: 'F',
      chakan: 'C',
      id: 0,
      shopcar: [],
      sum: 0,
      quantity: 0
    })
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var orderapi = new OrderApi();
    orderapi.quoteinfo({
      id: this.Base.options.id
    }, (quoteinfo) => {

      var fittingsitem = quoteinfo.fittingsitem;
      for (var i = 0; i < fittingsitem.length; i++) {

        var quoteitems = fittingsitem[i].quoteitems;
        for (var j = 0; j < quoteitems.length; j++) {
          quoteitems[j].check = false;
        }

      }


      this.Base.setMyData({
        quoteinfo
      });
    });

  }

  setPageTitle(instinfo) {
    var title = "待报价";
    wx.setNavigationBarTitle({
      title: title,
    })
  }


  bindshai() {
    this.Base.setMyData({
      showModal: true
    })
  }
  binddelect() {
    this.Base.setMyData({
      showModal: false
    })

  }
  bindchakan(e) {
    var chakan = e.currentTarget.dataset.chakan;
    this.Base.setMyData({
      chakan: chakan
    })

  }
  bindfapiao(e) {
    var xuan = e.currentTarget.id
    if (xuan == 'S') {
      this.Base.setMyData({
        xuan: 'F'
      })
    }
    if (xuan == 'F') {
      this.Base.setMyData({
        xuan: 'S'
      })
    }
  }
  onShareAppMessage() {

  }



  bindcheck(e) {
    var name = e.currentTarget.dataset.name;
    var index = e.currentTarget.dataset.index;
    var sx = e.currentTarget.dataset.sx;
    var fittings_id = e.currentTarget.dataset.fittings_id;
    var id = e.currentTarget.id;
    var quoteinfo = this.Base.getMyData().quoteinfo;
    var fittingsitem = quoteinfo.fittingsitem;
    var quoteitems = fittingsitem[index].quoteitems;



    // var checking = fittingsitem[index].quoteitems[sx].check;

    for (var i = 0; i < quoteitems.length; i++) { //将所有选中状态设为未选
      if (sx != i) {
        quoteitems[i].check = false;
      }
    }

    console.log(fittingsitem[index].quoteitems[sx].check);
    if (fittingsitem[index].quoteitems[sx].check == true) {
      fittingsitem[index].quoteitems[sx].check = false;
    } else {
      fittingsitem[index].quoteitems[sx].check = true;
    }

    // console.log(fittingsitem[index].quoteitems[sx].check)

    this.statistics(); //选中零件统计

    //this.carshoplist(); //选中的零件数组

    this.Base.setMyData({
      quoteinfo: quoteinfo
    })

  }

  statistics() { //选中零件统计
    var quoteinfo = this.Base.getMyData().quoteinfo;
    var fittingsitem = quoteinfo.fittingsitem;
    var shopcar = [];
    var sum = 0; //价格
    var quantity = 0; //选中数量
    for (var j = 0; j < fittingsitem.length; j++) {
      var quoteitems = fittingsitem[j].quoteitems;
      for (var a = 0; a < quoteitems.length; a++) {
        if (quoteitems[a].check == true) {
          console.log(quoteitems[a]);
          shopcar.push(quoteitems[a]);
          quantity++;
          sum += parseInt(quoteitems[a].price);
        }
      }
    }

    this.Base.setMyData({
      sum,
      quantity,
      shopcar
    })
    //console.log(sum);
  }

  carshoplist(json, i) {

    var that = this;
    var orderapi = new OrderApi();
    setTimeout(() => {
      orderapi.addshopcar(json, (addshopcar) => {

      })

      wx.navigateTo({
        url: '/pages/shopcar/shopcar'
      })
    }, i * 300)

  }

  addcar(e) {
    var that =this;
    console.log("加入购物车")
    var shopcar = this.Base.getMyData().shopcar;
    console.log(this.Base.getMyData().shopcar, "拉手动挡");
    //var aaa=[];
    for (var i = 0; i < shopcar.length; i++) {
      var list = {
        enterprise_id: shopcar[i].enterprise_id,
        fittings_id: shopcar[i].fittings_id,
        quote_id: this.Base.options.id,
        supplier: shopcar[i].company,
        parts: shopcar[i].name,
        quality: shopcar[i].quality,
        price: shopcar[i].price,
        qty: shopcar[i].qty,
        status: 'A'
      }
      this.carshoplist(list, i);

    }

  }

  tocar(e){
    var that =this;
    wx.navigateTo({
      url: '/pages/shopcar/shopcar?id='+this.Base.options.id
    })
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindfapiao = content.bindfapiao;
body.bindchakan = content.bindchakan;

body.tocar = content.tocar;
body.addcar = content.addcar; 

body.carshoplist = content.carshoplist;

body.bindcheck = content.bindcheck;

body.bindshai = content.bindshai;
body.binddelect = content.binddelect;

body.statistics = content.statistics;
Page(body)