// pages/waitpay/waitpay.js
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
    //options.id=1;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var sumprice = 0;
    var orderapi = new OrderApi();
    // var shopcarlist = JSON.parse(this.Base.options.json);


    //var alllist = [];

    // for (var i = 0; i < shopcarlist.length; i++) {
    //   var list = shopcarlist[i]
    //   for(let key of list.name){
    //     alllist.push({
    //       quote_id: key.quote_id,
    //       quotecompan_id: key.enterprise_id
    //     })
    //   }
    // }


    // this.Base.setMyData({
    //   alllist
    //})


    // console.log(shopcarlist,'555555555555');
    // console.log(alllist, 'eeee');

    //  console.log(this.Base.options.id,"1111111")

    orderapi.mylist({
      quote_id: this.Base.options.id,
      order_status: 'W'
    }, (mylist) => {

      for (var i = 0; i < mylist.length; i++) {
        sumprice += parseFloat(mylist[i].totalamount);
      }

      this.Base.setMyData({
        mylist,
        sumprice
      })
    })
  }

  bindbuy() {
    var that = this;
    var orderapi = new OrderApi();
    var mylist = this.Base.getMyData().mylist;

    console.log(this.Base.getMyData().employeeinfo.enterprise.id, "-996")
    //return;


    // var arr = this.Base.getMyData().alllist;

    // console.log(arr,'arr')

    wx.showModal({
      title: '付款',
      content: '确认付款？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {
          console.log(that.Base.getMyData().employeeinfo.enterprise.id, "-996")
          //return;
 

          for (var i = 0; i < mylist.length; i++) {

            orderapi.updatestatus({
              id: mylist[i].id,
              order_status: "L"
            }, (updatestatus) => {})

            orderapi.updatemoney({
              id: that.Base.getMyData().employeeinfo.enterprise.id,
              ent_id: mylist[i].enterprise_id,
              em_id: mylist[i].employee_id,
              money: mylist[i].totalamount
            }, (updatemoney) => {



            })


            var list = {
              enterprise_id: that.Base.getMyData().employeeinfo.enterprise.id,
              employee_id: that.Base.getMyData().employeeinfo.id,
              amount: mylist[i].totalamount,
              type: 'G',
              enterprise_id2: mylist[i].enterprise_id,
              employee_id2: mylist[i].employee_id, 
              type2: 'S'
            }
            // var list2 = {
            //   enterprise_id: mylist[i].enterprise_id,
            //   employee_id: mylist[i].employee_id,
            //   amount: mylist[i].totalamount,
            //   type: 'S'
            // }
            that.bindinsert(list, i);


           // that.bindinsert2(list2, i)

 
            orderapi.editquotation({
              quotecompan_id: mylist[i].quotecompan_id,
              quote_id: mylist[i].quote_id,
              quotestatus: 'W'
            }, (editquotation) => {

            })

            orderapi.editquotestatus({
              quoteenterprise_id: mylist[i].quotecompan_id,
              quote_id: mylist[i].quote_id,
              quotestatus: 'C',
              invalid: 'Y'
            }, (editquotestatus) => {
              console.log(editquotestatus, 'ooooo')
            })

              wx.reLaunch({
                url: '/pages/order/order',
              })

          }


        }
      }
    })


  }

  bindinsert(json, i) {
    var that = this;
    var orderapi = new OrderApi();
    setTimeout(() => { 
      orderapi.addconsume(json, (updatestatus) => {
        console.log(updatestatus, '-9961')
      }) 
    }, i * 300)
 
  }

 
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindbuy = content.bindbuy; 
body.bindinsert = content.bindinsert;  
Page(body)