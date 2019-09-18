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
    options.id = 1;
    super.onLoad(options);
    this.Base.setMyData({
      xuan: 'F',
      chakan: 'C',
      id: 0,
      shopcar: []
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
    var shopcar = this.Base.getMyData().shopcar;

    var name = e.currentTarget.dataset.name;
    var index = e.currentTarget.dataset.index;

    var sx = e.currentTarget.dataset.sx;
    var fittings_id = e.currentTarget.dataset.fittings_id;

    //console.log(name, "", index)

    var id = e.currentTarget.id;

    var quoteinfo = this.Base.getMyData().quoteinfo;
    var fittingsitem = quoteinfo.fittingsitem;
    var quoteitems = fittingsitem[index].quoteitems;
    // var checking = fittingsitem[index].quoteitems[sx].check;



    for (var i = 0; i < quoteitems.length; i++) {
      if (sx != i) {
        quoteitems[i].check = false;
      }
    }

    console.log(fittingsitem[index].quoteitems[sx].check);
    if (fittingsitem[index].quoteitems[sx].check) {
      fittingsitem[index].quoteitems[sx].check = false;
    } else {
      fittingsitem[index].quoteitems[sx].check = true;
    }

    // console.log(fittingsitem[index].quoteitems[sx].check)
    // console.log(fittingsitem[index].quoteitems[sx])
    // if (fittingsitem[index].quoteitems[sx].check==true){
    //   fittingsitem[index].quoteitems[sx].check =false;
    // }else{
    //   fittingsitem[index].quoteitems[sx].check = true;
    // }


    this.Base.setMyData({
      quoteinfo: quoteinfo
    })

  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindfapiao = content.bindfapiao;
body.bindchakan = content.bindchakan;

body.bindcheck = content.bindcheck;

body.bindshai = content.bindshai;
body.binddelect = content.binddelect;
Page(body)