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
   // options.id = 2;
    super.onLoad(options);
    this.Base.setMyData({
      qty: 1,
      quan: 'B',price:0
    });
  }

  onMyShow() {
    var that = this;
    var orderapi = new OrderApi();
    var id = this.Base.options.id;

    orderapi.detail({
      id: id,
    }, (change) => {

      var list = change.orderitem;

      for (var i = 0; i < list.length; i++) {
        list[i].check = false;
        list[i].shuliang = list[i].qty;
      }
      
      // this.Base.setMyData({
      //   change
      // });
      this.getreturn(list, change)
    });
  }

  getreturn(orderlijian, change) {
    var orderapi = new OrderApi();
    console.log(orderlijian, 'orderlijian');
    var lijian = [];
    // var change = this.Base.getMyData().change;
    console.log(change,'change')
    orderapi.returnlist({ order_id: this.Base.options.id}, (returndetail) => {
      console.log(returndetail, 'getreturn');
      if (returndetail.length > 0) {
        returndetail.filter((item) => {
          // var lijian =item.returnitem;
         
            for (var i = 0; i < orderlijian.length; i++) {
              for (var k = 0; k < item.returnitem.length; k++) {
                if (orderlijian[i].id == item.returnitem[k].shop_id) {

                  if (orderlijian[i].qty > item.returnitem[k].qty){
                    change.orderitem[i].qty = orderlijian[i].qty - item.returnitem[k].qty
                  } else {
                    change.orderitem.splice(i, 1);
                  }
                  
                }
              }
            }
          
        })
        console.log(lijian)
         
        if(change.orderitem.length==0){
          wx.showModal({
            title: '退货提示',
            content: '此订单已全部退换',
            confirmText:'查看',
            cancelText:'返回',
            success:function(res){
              console.log(res);
              if(res.confirm){
                wx.navigateTo({
                  url: '/pages/changedetail/changedetail?id=' + returndetail[0].id,
                })
              }else {
                wx.switchTab({
                  url: '/pages/order/order',
                })
              }
            }
          })
        }
        this.Base.setMyData({ change})


      }else {
        this.Base.setMyData({ change})
      }


    })

  }

 
  bindxuanze(e) {
    var change = this.Base.getMyData().change;
    var price = 0;
    console.log(change, "sdfsdfg")

    var xuan = e.currentTarget.dataset.id;
    var list = change.orderitem;

    if (change.orderitem[xuan].check == false) {
      change.orderitem[xuan].check = true
    } else {
      change.orderitem[xuan].check = false
      this.Base.setMyData({ quan: 'B' })
    }

    for (var i = 0; i < list.length; i++) {

      if (list[i].check == true) {
        price += (parseFloat(list[i].price) * parseInt(list[i].qty));
      }

    }


    //  change.orderitems[xuan].xz = !change.orderitems[xuan].xz;

    this.Base.setMyData({
      change,
      price:price.toFixed(2)
    })
  }

  bindall(e) {
    var change = this.Base.getMyData().change;
    var orderitem = change.orderitem;
    var price=0;
    var id=e.currentTarget.id;
    console.log(id,"lll"); 

    if (id == 'B') {
      for (var i = 0; i < orderitem.length; i++) { 
        change.orderitem[i].check = true
      }
      this.Base.setMyData({ quan:'Q'})
    } else {
      for (var i = 0; i < orderitem.length; i++) {
        change.orderitem[i].check = false
      }
      this.Base.setMyData({ quan: 'B' })
    }

    for (var i = 0; i < orderitem.length; i++) {

      if (orderitem[i].check == true) {
        price += parseFloat(orderitem[i].price) * parseInt(orderitem[i].qty)
      }

    }
  
    this.Base.setMyData({
      change, price: price.toFixed(2)
    })
  }

  bindadd(e) {
    var index = e.currentTarget.id;
    var type = e.currentTarget.dataset.type;
    var change = this.Base.getMyData().change;
    var price=0;
    var qty = change.orderitem[index].qty;
    var list = change.orderitem;
    var shuliang = change.orderitem[index].shuliang;
    if (type == 'jia' ) {
      if (qty<shuliang){
        change.orderitem[index].qty++
      }
      
    } else{
      if (qty>1){
        change.orderitem[index].qty-- 
      }
    }

    for (var i = 0; i < list.length; i++) {

      if (list[i].check == true) {
        price += parseFloat(list[i].price) * parseInt(list[i].qty)
      }

    }

    this.Base.setMyData({
      change, price: price.toFixed(2)
    })

  }

  bindsubmit(e) {
    var that = this;

    var change = this.Base.getMyData().change;
    var shibie = change.orderitem;

  
    console.log(shibie);
    // return;
    if(this.checkno(shibie)){
      wx.showModal({
        title: '提交',
        content: '确认提交退货申请？',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#EE2222',
        confirmText: '确定',
        confirmColor: '#2699EC',
        success: function (res) {
          if (res.confirm) {


            // wx.showLoading({
            //   title: '提交中',
            //   mask: true
            // })


            var orderapi = new OrderApi();

            orderapi.addtuihuo({
              order_id: change.id,
              // enterprise_id: change.enterprise_id,
              // enterprise_id: that.Base.getMyData().employeeinfo.enterprise.id,
              // employee_id: change.employee_id,

              baojia: change.baojia,
              gongsi: change.enterprise_id,

              enterprise_id: that.Base.getMyData().employeeinfo.enterprise.id,
              employee_id: that.Base.getMyData().employeeinfo.id,

              remarks: that.Base.getMyData().content,
              carmodel: change.carname,
              return_money: that.Base.getMyData().price,
              receivecontact: that.Base.getMyData().phone,
              orderstatus: 'R',
              status: 'A',
              receiver: change.receiver
            }, (addtuihuo) => {

              // orderapi.updatestatus({
              //   id: that.Base.options.id,
              //   order_status: "R"
              // }, (updatestatus) => {

              // })

              that.Base.setMyData({
                addtuihuo
              })
              var arr=[];
              var a=0;
              for (var i = 0; i < shibie.length; i++) {
                if (shibie[i].check == true) {
                  var list = {
                    tuihuo_id: addtuihuo.return,
                    name: shibie[i].parts,
                    photo: shibie[i].photo,
                    qty: shibie[i].qty,
                    price: shibie[i].price,
                    quality: shibie[i].quality,
                    mcid: shibie[i].mcid,
                    stand_time: shibie[i].standby_time,
                    guarantee: shibie[i].guarantee,
                    remark: shibie[i].sendcar_time,
                    status: 'A',
                    shop_id: shibie[i].id
                  }
                  arr[a] = list;
                  a++;
                  // that.fitting(list, i)
                }
              }
              if (arr.length==a && a>0){
                var datajson = JSON.stringify(arr);
                orderapi.addtuohuoitem({ datajson: datajson}, (addtuohuoitem) => {
                  that.Base.setMyData({
                    addtuohuoitem
                  })

                  wx.hideLoading();
                  wx.reLaunch({
                    url: '/pages/order/order',
                  })
                })
              }
              console.log(arr.length, a);
            console.log(arr,a);

            })
          }
        }
      });

    }else {
      wx.showToast({
        title: '请选择退货的零件！',
        icon: 'none'
      })
      return
    }

    
  }
  checkno(arr){
    for(var i=0;i<arr.length;i++){
      if(arr[i].check==true){
        return true
      }
    }
    return false
  }
  fitting(json, i) {
    var that = this;
    var orderapi = new OrderApi();
    setTimeout(() => {
      orderapi.addtuohuoitem(json, (addtuohuoitem) => {
        that.Base.setMyData({
          addtuohuoitem
        })

        wx.hideLoading();
       
      })
    }, i * 300)

    wx.reLaunch({
      url: '/pages/order/order',
    })
  }

  bindphone(e){
    this.Base.setMyData({
      phone: e.detail.value
    })
  }

  bindcon(e) {
    this.Base.setMyData({
      content: e.detail.value
    })
  }

  setPageTitle(instinfo) {
    var title = "退换货申请";
    wx.setNavigationBarTitle({
      title: title,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindsubmit = content.bindsubmit; 
body.fitting = content.fitting; 
body.bindcon = content.bindcon; 
body.bindphone = content.bindphone;
body.bindxuanze = content.bindxuanze;
body.bindall = content.bindall;
body.bindreduce = content.bindreduce;
body.bindadd = content.bindadd; 
body.checkno = content.checkno; 
body.getreturn = content.getreturn;
Page(body)