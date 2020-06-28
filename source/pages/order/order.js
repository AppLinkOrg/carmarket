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
  OrderApi
} from "../../apis/order.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;

    this.Base.setMyData({
      order: "A"
    });
  }
  onMyShow() {
    var orderapi = new OrderApi();
 
    orderapi.mylist({
      order_status: 'W', employee_id: this.Base.getMyData().emp_id, orderby:'r_main.orderno desc'
    }, (daifukuan) => {
      for (var i = 0; i < daifukuan.length; i++) {
        daifukuan[i].order_time_formatting = this.gettime(daifukuan[i].order_time_formatting)
      }
      this.Base.setMyData({
        daifukuan
      })
    })

    orderapi.mylist({
      order_status: 'L', employee_id: this.Base.getMyData().emp_id, orderby: 'r_main.orderno desc'
    }, (daifahuo) => {
      for(var i=0;i<daifahuo.length;i++){
        daifahuo[i].order_time_formatting=this.gettime(daifahuo[i].order_time_formatting)
      }
      this.Base.setMyData({
        daifahuo
      })
    })

    orderapi.mylist({
      order_status: 'M', employee_id: this.Base.getMyData().emp_id, orderby: 'r_main.orderno desc'
    }, (daishouhuo) => {
      for (var i = 0; i < daishouhuo.length; i++) {
        daishouhuo[i].order_time_formatting = this.gettime(daishouhuo[i].order_time_formatting)
      }
      this.Base.setMyData({
        daishouhuo
      })
    
    })

    orderapi.mylist({
      order_status: 'N,R,Y,I', employee_id: this.Base.getMyData().emp_id, orderby: 'r_main.orderno desc'
    }, (yiwancheng) => {
      for (var i = 0; i < yiwancheng.length; i++) {
        yiwancheng[i].order_time_formatting = this.gettime(yiwancheng[i].order_time_formatting)
      }
      this.Base.setMyData({
        yiwancheng
      })
    })

    orderapi.mylist({
      order_status: 'E', 
      employee_id: this.Base.getMyData().emp_id, orderby: 'r_main.orderno desc'
    }, (yiquxiao) => {
      for(var i=0;i<yiquxiao.length;i++){
        yiquxiao[i].order_time_dateformat = this.gettime(yiquxiao[i].order_time_dateformat)
      }
      this.Base.setMyData({
        yiquxiao
      })
    })

  
  }
  gettime(date) {
    date = date.replace(/-/g, '/');
    date = date.slice(5, 10);
    return date
  }

  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '我的订单',
    });
  }

  bindsend(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/waitsend/waitsend?id=' + id,
    })

  }

  bindreceive(e) {
    var id = e.currentTarget.id;
    console.log(id);
    //return;
    wx.navigateTo({
      url: '/pages/waitreceive/waitreceive?id=' + id,
    })
  }

  bindsuccess(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/success/success?id=' + id,
    })
  }

  totuihuan(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/changeapply/changeapply?id=' + id,
    })
  }

  bindorder(e) {

    var id = this.Base.getMyData().employeeinfo.id;
    console.log(id);

    var orderid = e.currentTarget.dataset.order;
    //console.log(orderid, "选中的节点值");
    this.Base.setMyData({
      order: orderid
    });
    this.onMyShow();
  }


  bindquxiao(e) {
    var that = this;
    var orderapi = new OrderApi();
    console.log(e)
    console.log(this.Base.getMyData().daifahuo)
    var daifahuo = this.Base.getMyData().daifahuo;
    var id = e.currentTarget.id;
    var price = 0;
    for (var i = 0; i < daifahuo.length;i++){
      if (id == daifahuo[i].id){
        for (var j = 0; j < daifahuo[i].orderitem.length;j++){
          price += parseFloat(daifahuo[i].orderitem[j].price);
        }
      }
    }

    if (price>0){
      
    wx.showModal({
      title: '取消订单',
      content: '确认取消订单？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {

          orderapi.updatemoney({
            ent_id: that.Base.getMyData().employeeinfo.enterprise.id,
            money: price,
          }, (updatemoney) => {

            orderapi.addxiaofei({
              type: 'E',
              amount:price,
              enterprise_id: that.Base.getMyData().employeeinfo.enterprise.id,
              employee_id:that.Base.getMyData().employeeinfo.id,
              order_id: e.currentTarget.id,
            }, (addxiaofei) => {

           

            orderapi.updatestatus({
              id: e.currentTarget.id,
              order_status: "E"
            }, (updatestatus) => {
              that.onMyShow();
            })

              })

          })

         
          

        }
      }
    })


    }

  }

  bindshou(e) {
    var id = e.currentTarget.id
    var orderapi = new OrderApi();
    var that = this;
    wx.showModal({
      title: '收货',
      content: '确认货物已收到？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {
          orderapi.updatestatus({
            id: id,
            order_status: "N"
          }, (updatestatus) => {
            that.onMyShow();
          })
        }
      }
    })




  }


  bindtobuy(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/obligations/obligations?id=' + id
    })
  }
  bindquxiao2(e){
    var that = this;
    var orderapi = new OrderApi();
    var daifukuan = this.Base.getMyData().daifukuan;
    var id = e.currentTarget.id;
   

      wx.showModal({
        title: '取消订单',
        content: '确认取消订单？',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#EE2222',
        confirmText: '确定',
        confirmColor: '#2699EC',
        success: function (res) {
          if (res.confirm) {


                orderapi.updatestatus({
                  id: e.currentTarget.id,
                  order_status: "E"
                }, (updatestatus) => {
                  that.onMyShow();
                })

          }
        }
      })


    }
  watchwuliu(e){
    var id = e.currentTarget.id;
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindorder = content.bindorder;
body.bindreceive = content.bindreceive; 

body.totuihuan = content.totuihuan; 

body.bindquxiao = content.bindquxiao;
body.bindshou = content.bindshou;
body.bindtobuy = content.bindtobuy;

body.bindsend = content.bindsend;
body.bindsuccess = content.bindsuccess;
body.bindapply = content.bindapply;
body.gettime = content.gettime;
body.bindquxiao2 = content.bindquxiao2;
body.watchwuliu = content.watchwuliu;
Page(body)