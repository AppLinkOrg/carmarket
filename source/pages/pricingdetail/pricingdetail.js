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
      vin: this.Base.options.vin,
      carname: this.Base.options.carname,
      check:0,
      chakan: 'C',
      xuan: 'F',

    });
  }
  onMyShow() {
    var that = this;
    var carapi = new CarApi();
    var orderapi = new OrderApi();
    var vin = this.Base.getMyData().vin;
    var carname = this.Base.getMyData().carname;
    var id = this.Base.options.id;
    
    console.log(id, "了解");
    // return;

    orderapi.detail({
      id: id,
    }, (index) => {
      this.Base.setMyData({
        index
      })

    });
    console.log("sdfsdg")
    //return
   
    orderapi.virtualquote({
      order_id:id,
    }, (monibaojia) => {
      this.Base.setMyData({
        monibaojia
      });
    });

    orderapi.quotelist({
      order_id:id,      
    }, (userbaojia) => {
      this.Base.setMyData({
        userbaojia
      });
    });
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

  bindshai(){

  }

  bindxz(){
    var xuanze = e.currentTarget.dataset.id;
    // var baojia = this.Base.getMyData().baojia;
    // userbaojia[xuanze].xz = !userbaojia[xuanze].xz;
    // this.Base.setMyData({
    //   baojia
    // })
  }
  bindchakan(e) {
    var chakan = e.currentTarget.dataset.chakan;
    this.Base.setMyData({
      chakan: chakan
    })

  }

  binddianji(e){
    var checkid = e.currentTarget.dataset.check;
    var check = this.Base.getMyData().check;
    console.log(checkid, "选中的节点值");
    // return;
    if (check==0){
      this.Base.setMyData({
        check: checkid
      });
    }else{
      this.Base.setMyData({
        check: 0
      });
    }
  }


  bindqueren(e) {
    var id = this.Base.options.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail?id=' + id,
    })
  }


  setPageTitle(instinfo) {
    var title = "报价中";
    wx.setNavigationBarTitle({
      title: title,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindqueren = content.bindqueren; 
body.binddianji = content.binddianji;
body.bindchakan = content.bindchakan;
body.bindfapiao = content.bindfapiao; 
body.bindxz = content.bindxz; 
body.bindshai = content.bindshai;
Page(body)