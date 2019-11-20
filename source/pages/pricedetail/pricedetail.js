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
     //options.id = 10;
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
    this.Base.setMyData({ quantity: 0, sum:0});






    orderapi.quoteinfo({
      id: this.Base.options.id
    }, (quoteinfo) => {
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

        var price = 0;
 
        for (var key in etplist) {

          for (var a in etplist[key]) {
            enterpriselist.push({ id: key, allcheck:false,show:false, enterprise_name: etplist[key][a].edt_name, address: etplist[key][a].edt_address, qtylist: etplist[key] })
            break;
          }

          for (var s in etplist[key]) {

            if(this.Base.getMyData().xuan=='F'){
              price += (parseInt(etplist[key][s].price) * parseInt(etplist[key][s].qty))
            }else{
              price += (parseInt(etplist[key][s].rateprice) * parseInt(etplist[key][s].qty))
            }
            
          }

        }
 
      }

      orderapi.deleteshop({
        id: quoteinfo.id
      }, (deleteshop) => {
      })
  
      this.Base.setMyData({
        quoteinfo, enterpriselist, price
      });

    });

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

    this.onMyShow();
 
    this.Base.setMyData({
      chakan: chakan, quantity:0,sum:0
    })

  }



  bindfapiao(e) {
    var xuan = e.currentTarget.id;
    var quoteinfo=this.Base.getMyData().quoteinfo;
    if (quoteinfo.invoice_demand_value=='N'){
      wx.showToast({
        title: '未要求发票',
        icon:'none'
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
    this.onMyShow();

    this.statistics();
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

  bindcheckone(e){
    var enterprise_id = e.currentTarget.dataset.enterprise_id;
    var index = e.currentTarget.dataset.index;
    var sx = e.currentTarget.dataset.sx;
    var enterpriselist = this.Base.getMyData().enterpriselist;
    var check = enterpriselist[index].qtylist[sx].check;

    
    
    if (check==false){
      enterpriselist[index].qtylist[sx].check = true;
      var qtylist = enterpriselist[index].qtylist;
      var leng=0;
      for (var i = 0; i < qtylist.length;i++){
        if (qtylist[i].check==true){
          leng++; 
          if (enterpriselist[index].qtylist.length == leng){
            enterpriselist[index].allcheck = true;
          } 
        }
      }
    }else{
      enterpriselist[index].qtylist[sx].check = false;
      enterpriselist[index].allcheck=false;
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

          if(this.Base.getMyData().xuan=='F'){
            sum += parseInt(quoteitems[a].price);
          }else{
            sum += parseInt(quoteitems[a].rateprice);
          }
          
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
            sum += parseInt(qtylist[a].price);
          } else {
            sum += parseInt(qtylist[a].rateprice);
          }
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



  addcar(e) {
    var that =this;
   // console.log(this.Base.getMyData().employeeinfo.enterprise.id)
     //return;
    var shopcar = this.Base.getMyData().shopcar;
    var emp_id = this.Base.getMyData().employeeinfo.enterprise.id;
    var xuan = this.Base.getMyData().xuan;
  
    for (var i = 0; i < shopcar.length; i++) {
   
      if (xuan=='F'){
        var price = shopcar[i].price;
     }else{
        var price = shopcar[i].rateprice;
     }
      var list = {
       
        enterprise_id: shopcar[i].enterprise_id,
        supplier: emp_id,
        baojia: this.Base.getMyData().employeeinfo.id,
        employee_id: shopcar[i].employee_id,
        fittings_id: shopcar[i].fittings_id,
        quote_id: this.Base.options.id,
        //supplier: shopcar[i].company,
        parts: shopcar[i].name,
        mcid: shopcar[i].partnubmer,
        quality: shopcar[i].quality,
        price: price,
        qty: shopcar[i].qty,
        standby_time: shopcar[i].standby_time,
        guarantee:shopcar[i].guarantee,
        sendcar_time:shopcar[i].sendcar_time,
        status: 'A'
      }
      this.carshoplist(list, i);

    }

  }

  carshoplist(json, i) {

    var that = this;
    var orderapi = new OrderApi();
    setTimeout(() => {
      orderapi.addshopcar(json, (addshopcar) => {
      })
    }, i * 300)

    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/shopcar/shopcar?id=' + this.Base.options.id + '&carmodel=' + this.Base.getMyData().quoteinfo.carmodel + '&vin=' + this.Base.getMyData().quoteinfo.vincode + '&xuan=' + this.Base.getMyData().xuan
      })
    }, i * 500)
      
  }

  toast(e){
    wx.showModal({
      title: 'ERRO',
      content: 'Unable to get the current location temporarily, please check whether the interface is correct！',
      showCancel: false,
      confirmText: "cancel", 
    })
  }

  tocar(e){
    var that =this;
    wx.navigateTo({
      url: '/pages/shopcar/shopcar?id=' + this.Base.options.id + '&carmodel=' + this.Base.getMyData().quoteinfo.carmodel + '&vin=' + this.Base.getMyData().quoteinfo.vincode
    })
  }

  quanxuan(e){
    var type=e.currentTarget.dataset.type;
    var idx=e.currentTarget.id;

    var enterpriselist = this.Base.getMyData().enterpriselist;
    console.log(type,idx);

    enterpriselist[idx].allcheck = type;

    var qtylist = enterpriselist[idx].qtylist;

    for (var i = 0; i < qtylist.length;i++){
      qtylist[i].check = type 
    }
    this.statisticsone();
    this.Base.setMyData({ enterpriselist});

  
  }
  shoucang(e){
    var type = e.currentTarget.dataset.type;
    var idx = e.currentTarget.id;

    var enterpriselist = this.Base.getMyData().enterpriselist;
    console.log(type, idx);

    enterpriselist[idx].show = type;

    var qtylist = enterpriselist[idx].qtylist;

    for (var i = 0; i < qtylist.length; i++) {
      qtylist[i].show = type
    }
    this.Base.setMyData({ enterpriselist });

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

Page(body)