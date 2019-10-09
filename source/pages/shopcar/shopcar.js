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
        var list = shopcarlist[i]
        if (!etplist[list.enterprise_id]) {
          etplist[list.enterprise_id] = [];
        }
        etplist[list.enterprise_id].push(list)
      }

      var arr = [];
      var price = 0;
      for (var key in etplist) {
        
         for(var i in etplist[key]){
           arr.push({ id: key, enterprise_name: etplist[key][i].enterprise_id_name,  name: etplist[key] })
           break;
         }

        for (var s in etplist[key]) {
          price += (parseInt(etplist[key][s].price) * parseInt(etplist[key][s].qty))
        }
       
      }

      this.Base.setMyData({ arr, price })
    })

  }


  bindjisuan(e){
    var id=e.currentTarget.id;
    var name=e.currentTarget.dataset.name;
    var index = e.currentTarget.dataset.index;
    var idx = e.currentTarget.dataset.idx;
    var shopcarlist = this.Base.getMyData().shopcarlist;

    var arr = this.Base.getMyData().arr;
   // console.log("类型:" + name, 'id:', id,"来来来", index)
 
    if (name=='jian'){
      if (arr[index].name[idx].qty>1){
        arr[index].name[idx].qty--
      }else{
        wx.showToast({
          title: '数量至少为1',
          icon:'none'
        })
      }
    }else{
      arr[index].name[idx].qty++
    }
    this.Base.setMyData({ arr })
  }

  bindjiesuan() {
    var arr = this.Base.getMyData().arr;
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail?json=' + JSON.stringify(arr) + '&carmodel=' + this.Base.options.carmodel + '&vin=' + this.Base.options.vin
    })
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindjiesuan = content.bindjiesuan; 
body.bindjisuan = content.bindjisuan; 
Page(body)