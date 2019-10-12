// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
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
  }

  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    orderapi.shopcarlist({ quote_id:this.Base.options.id}, (shopcarlist) => {

      var  etplist = {};

      for (var i = 0; i < shopcarlist.length; i++) {
        shopcarlist[i].check=false;
        var list = shopcarlist[i]
        if (!etplist[list.enterprise_id]) {
          etplist[list.enterprise_id] = [];
        }
        etplist[list.enterprise_id].push(list)
      }

      var alllist = [];
      var price = 0;
      for (var key in etplist) {
        
         for(var i in etplist[key]){
           alllist.push({ id: key, enterprise_name: etplist[key][i].enterprise_id_name,  name: etplist[key],allcheck:false })
           break;
         }

        for (var s in etplist[key]) {
          price += (parseInt(etplist[key][s].price) * parseInt(etplist[key][s].qty))
        }
       
      }

      this.Base.setMyData({ alllist, price })
    })

  }

  bindchoose(e){
    var alllist = this.Base.getMyData().alllist;
    var id=e.currentTarget.id;
    var qtylist = alllist[id].name;
   
    //console.log(qtylist+"ddd")

  
    if (alllist[id].allcheck==false){
        for (var i = 0; i < qtylist.length; i++) {
          qtylist[i].check = true;
        }
        
        alllist[id].allcheck = true;
      }else{
        for (var i = 0; i < qtylist.length; i++) {
          qtylist[i].check = false;
        } 
        alllist[id].allcheck = false;
      }
     
    
    

    this.Base.setMyData({ alllist: alllist})
    console.log("ddd")

  }


  bindjisuan(e){
    var id=e.currentTarget.id;
    var name=e.currentTarget.dataset.name;
    var index = e.currentTarget.dataset.index;
    var idx = e.currentTarget.dataset.idx;
    var shopcarlist = this.Base.getMyData().shopcarlist;

    var alllist = this.Base.getMyData().alllist;
   // console.log("类型:" + name, 'id:', id,"来来来", index)
 
    if (name=='jian'){
      if (alllist[index].name[idx].qty>1){
        alllist[index].name[idx].qty--
      }else{
        wx.showToast({
          title: '数量至少为1',
          icon:'none'
        })
      }
    }else{
      alllist[index].name[idx].qty++
    }
    this.Base.setMyData({ alllist })
  }

  bindjiesuan() {
    var alllist = this.Base.getMyData().alllist;
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail?json=' + JSON.stringify(alllist) + '&carmodel=' + this.Base.options.carmodel + '&vin=' + this.Base.options.vin
    })
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindjiesuan = content.bindjiesuan; 
body.bindjisuan = content.bindjisuan; 

body.bindchoose = content.bindchoose;

Page(body)