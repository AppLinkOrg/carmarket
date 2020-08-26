// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  ApiUtil
} from "../../apis/apiutil.js";
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
    //options.id = 3;
    super.onLoad(options);
    if(this.Base.options.fapiao=='Y'){
      var xuan = 'S';
    }else {
      var xuan = 'F';
    }
    this.Base.setMyData({
      xuan: xuan,
      chakan: 'C',
      id: 0,
      shopcar: [],
      sum: 0,
      quantity: 0,
      sortby: "D",
      districtlist: [],
      fdistrict: []
    })

  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var orderapi = new OrderApi();

    this.Base.setMyData({
      quantity: 0,
      sum: 0
    });
    try {
      var myaddress = this.Base.getMyData().myaddress;
      var city_id = myaddress.ad_info.adcode.substr(0, 4) + "00";
      orderapi.districtlist({
        city_id
      }, (districtlist) => {
        var fdistrict = [];
        for (var i = 0; i < districtlist.length; i++) {
          districtlist[i]["id"] = Number(districtlist[i]["id"].substr(4, 2));
          fdistrict[districtlist[i]["id"]] = "Y";
        }
        this.Base.setMyData({
          districtlist,
          fdistrict
        });
      });
    } catch (ex) {}
    this.refreshdata();
  }

  setPageTitle(instinfo) {
    var title = "查看报价";
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

    this.refreshdata();

    this.Base.setMyData({
      chakan: chakan,
      quantity: 0,
      sum: 0
    })

  }



  bindfapiao(e) {
    var xuan = e.currentTarget.id;
    var quoteinfo = this.Base.getMyData().quoteinfo;
    if (quoteinfo.invoice_demand_value == 'N') {
      wx.showToast({
        title: '未要求发票',
        icon: 'none'
      })
      //this.Base.toast('未要求发票');
      return;
    }
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
    this.statistics();
    this.onMyShow();

    
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

  bindcheckone(e) {
    var enterprise_id = e.currentTarget.dataset.enterprise_id;
    var index = e.currentTarget.dataset.index;
    var sx = e.currentTarget.dataset.sx;
    var enterpriselist = this.Base.getMyData().enterpriselist;
    var check = enterpriselist[index].qtylist[sx].check;



    if (check == false) {
      enterpriselist[index].qtylist[sx].check = true;
      var qtylist = enterpriselist[index].qtylist;
      var leng = 0;
      for (var i = 0; i < qtylist.length; i++) {
        if (qtylist[i].check == true) {
          leng++;
          if (enterpriselist[index].qtylist.length == leng) {
            enterpriselist[index].allcheck = true;
          }
        }
      }
    } else {
      enterpriselist[index].qtylist[sx].check = false;
      enterpriselist[index].allcheck = false;
    }

    this.Base.setMyData({
      enterpriselist: enterpriselist
    })


    this.statisticsone();
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
          //console.log(quoteitems[a]);
          shopcar.push(quoteitems[a]);
          quantity++;

          if (this.Base.getMyData().xuan == 'F') {
            sum += parseFloat(quoteitems[a].price) * parseFloat(quoteitems[a].qty);
          } else {
            sum += parseFloat(quoteitems[a].rateprice) * parseFloat(quoteitems[a].qty);
          }

        }
      }
    }
    sum = sum.toFixed(2);
    this.Base.setMyData({
      sum,
      quantity,
      shopcar
    })
    //console.log(sum);
  }

  statisticsone() { //选中零件统计
    //return;
    var enterpriselist = this.Base.getMyData().enterpriselist;

    var shopcar = [];
    var sum = 0; //价格
    var quantity = 0; //选中数量

    for (var j = 0; j < enterpriselist.length; j++) {
      var qtylist = enterpriselist[j].qtylist;
      for (var a = 0; a < qtylist.length; a++) {
        if (qtylist[a].check == true) {
          //console.log(quoteitems[a]);
          shopcar.push(qtylist[a]);
          quantity++;
          // sum += parseInt(qtylist[a].price);
          if (this.Base.getMyData().xuan == 'F') {
            sum += parseFloat(qtylist[a].price) * parseFloat(qtylist[a].qty);
          } else {
            sum += parseFloat(qtylist[a].rateprice) * parseFloat(qtylist[a].qty);
          }
        }
      }
    }
    sum = sum.toFixed(2);
    this.Base.setMyData({
      sum,
      quantity,
      shopcar
    })
    //console.log(sum);
  }



  addcar(e) {
    var that = this;
    var shopcar = this.Base.getMyData().shopcar;

    if(shopcar.length==0){
      wx.showToast({
        title: '请选择商品',
        icon:'none'
      })
      return
    }
    console.log('shopcar',shopcar);
    wx.showLoading({
      title: '提交中...',
    })
    // console.log(this.Base.getMyData().employeeinfo.enterprise.id)
    //return;

   
    var emp_id = this.Base.getMyData().employeeinfo.enterprise.id;
    var xuan = this.Base.getMyData().xuan;
    var arr = [];
    for (var i = 0; i < shopcar.length; i++) {

      if (xuan == 'F') {
        var price = shopcar[i].price;
      } else {
        var price = shopcar[i].rateprice;
      }
      
      var list = {

        enterprise_id: shopcar[i].enterprise_id,
        supplier: emp_id,
        baojia: shopcar[i].employee_id,
        employee_id: this.Base.getMyData().employeeinfo.id,
        fittings_id: shopcar[i].fittings_id,
        quote_id: this.Base.options.id,
        //supplier: shopcar[i].company,
        parts: shopcar[i].name,
        mcid: shopcar[i].partnubmer,
        quality: shopcar[i].quality,
        price: price,
        qty: shopcar[i].qty,
        standby_time: shopcar[i].standby_time,
        guarantee: shopcar[i].guarantee,
        sendcar_time: shopcar[i].sendcar_time,
        status: 'A'
      }
      arr[i]=list;

      // this.carshoplist(list, i, shopcar.length);

    }

    if (arr.length == shopcar.length){
      var datajson = JSON.stringify(arr);
      var orderapi = new OrderApi();
      orderapi.addshopcar({ datajson: datajson}, (addshopcar) => {
        wx.hideLoading();
        wx.navigateTo({
          url: '/pages/shopcar/shopcar?id=' + this.Base.options.id + '&carmodel=' + this.Base.getMyData().quoteinfo.carmodel + '&vin=' + this.Base.getMyData().quoteinfo.vincode + '&xuan=' + this.Base.getMyData().xuan
        }) 
       })
      
    }
    
  }

  carshoplist(json, i, length) {

    var that = this;
    var orderapi = new OrderApi();
    var a = 0;
    setTimeout(() => {
      //  console.log('uuu');
      orderapi.addshopcar(json, (addshopcar) => {})

      //  console.log(i, '噢噢噢');

      if (i + 1 == length) {
        wx.hideLoading();
        wx.navigateTo({
          url: '/pages/shopcar/shopcar?id=' + this.Base.options.id + '&carmodel=' + this.Base.getMyData().quoteinfo.carmodel + '&vin=' + this.Base.getMyData().quoteinfo.vincode + '&xuan=' + this.Base.getMyData().xuan
        }) 
      }

    }, i * 300)

  }

  toast(e) {
    var id = e.currentTarget.id;
    var fdistrict = this.Base.getMyData().fdistrict;
    fdistrict[id] = fdistrict[id] != "Y" ? "Y" : "N";
    this.Base.setMyData({
      fdistrict
    });
  }

  tocar(e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/shopcar/shopcar?id=' + this.Base.options.id + '&carmodel=' + this.Base.getMyData().quoteinfo.carmodel + '&vin=' + this.Base.getMyData().quoteinfo.vincode
    })
  }

  quanxuan(e) {
    var type = e.currentTarget.dataset.type;
    var idx = e.currentTarget.id;

    var enterpriselist = this.Base.getMyData().enterpriselist;
    console.log(type, idx);

    enterpriselist[idx].allcheck = type;

    var qtylist = enterpriselist[idx].qtylist;

    for (var i = 0; i < qtylist.length; i++) {
      qtylist[i].check = type
    }
    this.statisticsone();
    this.Base.setMyData({
      enterpriselist
    });


  }
  shoucang(e) {
    var type = e.currentTarget.dataset.type;
    var idx = e.currentTarget.id;

    var enterpriselist = this.Base.getMyData().enterpriselist;
    console.log(type, idx);

    enterpriselist[idx].show = type;

    var qtylist = enterpriselist[idx].qtylist;

    for (var i = 0; i < qtylist.length; i++) {
      qtylist[i].show = type
    }
    this.Base.setMyData({
      enterpriselist
    });

  }
  refreshdata() {
    var mylat = this.Base.getMyData().mylat;
    var mylng = this.Base.getMyData().mylng;
    var sortby = this.Base.getMyData().sortby;

    var orderapi = new OrderApi();

    orderapi.quoteinfo({
      id: this.Base.options.id,
      mylat,
      mylng,
      sortby: sortby
    }, (quoteinfo) => {
      console.log(quoteinfo,'quot')
      // if (quoteinfo.invoice_demand_value=='Y'){
      //   this.Base.setMyData({
      //     xuan:'S'
      //   })
        
      // }
      var etplist = {};
      var fittingsitem = quoteinfo.fittingsitem;
      for (var i = 0; i < fittingsitem.length; i++) {
        var quoteitems = fittingsitem[i].quoteitems;
        for (var j = 0; j < quoteitems.length; j++) {
          quoteitems[j].check = false;

          quoteitems[j].show = false;

          var list = quoteitems[j];
          if (!etplist[list.enterprise_id]) {
            etplist[list.enterprise_id] = [];
          }
          etplist[list.enterprise_id].push(list)
        }

        var enterpriselist = [];

        // var price = 0;
        // var allprice = 0;

        for (var key in etplist) {

          for (var a in etplist[key]) {
            var lat = etplist[key][a].edt_lat;
            var lng = etplist[key][a].edt_lng; 
            var distance = ApiUtil.GetDistance(mylat, mylng, lat, lng);
            var mile = ApiUtil.GetMileTxt(distance);
 
            enterpriselist.push({
              id: key,
              allcheck: false,
              show: false, 
              enterprise_name: etplist[key][a].edt_name,
              address: etplist[key][a].edt_address,
              maxprice: etplist[key][a].maxprice,
              minprice: etplist[key][a].minprice,
              maxrate: etplist[key][a].maxrate,
              minrate: etplist[key][a].minrate,
              qtylist: etplist[key],
              district_id: Number(etplist[key][a].district_id.substr(4, 2)),
              mile,
              em_mobile: etplist[key][a].em_mobile,
              em_name: etplist[key][a].em_name,
            })

            break;
          }

          // for (var s in etplist[key]) {

          //   if (this.Base.getMyData().xuan == 'F') {
          //     price += (parseInt(etplist[key][s].price) * parseInt(etplist[key][s].qty))
          //   } else {
          //     price += (parseInt(etplist[key][s].rateprice) * parseInt(etplist[key][s].qty))
          //   }
             
          // }

        }

      }

      orderapi.deleteshop({
        id: quoteinfo.id
      }, (deleteshop) => {})
 
      this.Base.setMyData({
        quoteinfo,
        enterpriselist
      });

    });
  }
  orderbyD() {
    this.Base.setMyData({
      sortby: "D"
    });
    this.refreshdata();
  }
  orderbyP() {
    this.Base.setMyData({
      sortby: "P"
    });
    this.refreshdata();
  }
  lianxi(e){
    console.log(e);
    var mobile = e.currentTarget.dataset.mobile;
    wx.showActionSheet({
      itemList: ["拨打电话"],
      success(e) {
        console.log(e,'oooo')
        if (e.tapIndex == 0) {
          wx.makePhoneCall({
            phoneNumber: mobile
          })
        }
      }
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
body.bindcheckone = content.bindcheckone;

body.bindshai = content.bindshai;
body.binddelect = content.binddelect;

body.statistics = content.statistics;

body.toast = content.toast;

body.statisticsone = content.statisticsone;
body.quanxuan = content.quanxuan;
body.shoucang = content.shoucang;

body.refreshdata = content.refreshdata;
body.orderbyD = content.orderbyD;
body.orderbyP = content.orderbyP;
body.lianxi = content.lianxi;
Page(body)