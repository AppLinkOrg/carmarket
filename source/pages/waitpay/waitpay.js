// pages/waitpay/waitpay.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";

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
    var sumprice=0;
    var orderapi = new OrderApi();
    var shopcarlist = JSON.parse(this.Base.options.json);
    

    var alllist = [];

    for (var i = 0; i < shopcarlist.length; i++) {
      var list = shopcarlist[i]
      for(let key of list.name){
        alllist.push({
          quote_id: key.quote_id,
          quotecompan_id: key.enterprise_id
        })
      }
    }

   
    this.Base.setMyData({
      alllist
    })



    console.log(shopcarlist,'555555555555');
    console.log(alllist, 'eeee');
    
  //  console.log(this.Base.options.id,"1111111")

    orderapi.mylist({
      quote_id: this.Base.options.id, order_status: 'W'
    }, (mylist) => { 

      for (var i = 0; i < mylist.length;i++){
        sumprice += parseFloat(mylist[i].totalamount) ;
      }
      
      this.Base.setMyData({
        mylist, sumprice
      })
    })
  }

  bindbuy(){
    var that = this;
    var orderapi = new OrderApi();
    var mylist=this.Base.getMyData().mylist;
    var arr = this.Base.getMyData().alllist;

    console.log(arr,'arr')
 
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
          orderapi.updatemoney({
            id: that.Base.getMyData().employeeinfo.id,
            money: that.Base.getMyData().sumprice
          }, (updatemoney) => {
            for (var i = 0; i < mylist.length; i++) {
              orderapi.updatestatus({
                id: mylist[i].id,
                order_status: "L"
              }, (updatestatus) => {
              })
            }
            wx.reLaunch({
              url: '/pages/order/order',
            })
          })

          orderapi.addconsume({ 
            enterprise_id: that.getMyData().employeeinfo.enterprise.id,
            employee_id: that.getMyData().employeeinfo.id,
            amount: that.Base.getMyData().sumprice,
            
          }).then(()=>{

          })

          for(var i=0;i<arr.length;i++){
            orderapi.editquotation({
              quotecompan_id:arr[i].quotecompan_id,
              quote_id: arr[i].quote_id,
              quotestatus:'W'
            }, (editquotation)=>{
            })

            orderapi.editquotestatus({
              quoteenterprise_id: arr[i].quotecompan_id,
              quote_id: arr[i].quote_id,
              quotestatus: 'C',
              invalid: 'Y'
            }, (editquotestatus) => {
              console.log(editquotestatus, 'ooooo')
            })

          }

         
        }
      }
    })
 

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.bindbuy = content.bindbuy;
Page(body)