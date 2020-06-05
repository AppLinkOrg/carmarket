import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-changeapply',
  templateUrl: './changeapply.component.html',
  styleUrls: ['./changeapply.component.scss'],
  providers:[InstApi,EnterpriseApi]
})
export class ChangeapplyComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  qty= 1;
  quan= 'B';
  price=0;
  id='';
  change=null;
  change2={};
  phone='';
  content='';
  onMyShow(){
    var that = this;
    this.id = this.params.id
    this.orderApi.detail({
      id: this.id,
    },).then((change:any) => {

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
  
    console.log(orderlijian, 'orderlijian');
    var lijian = [];
    // var change = this.Base.getMyData().change;
    console.log(change,'change')
    this.orderApi.returnlist({ order_id: this.id}).then( (returndetail:any) => {
      console.log(returndetail, 'getreturn');
      if (returndetail.length > 0) {
        returndetail.filter((item) => {
          // var lijian =item.returnitem;
         
            for (var i = 0; i < orderlijian.length; i++) {
              for (var k = 0; k < item.returnitem.length; k++) {
                if (orderlijian[i].parts == item.returnitem[k].name) {

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
         
        
       this.change=change;
       this.change2=change;


      }else {
        this.change=change;
        this.change2=change;
      }


    })

  }

  bindxuanze(e) {
    // var change = this.Base.getMyData().change;
    var price = 0;
    console.log(this.change, "sdfsdfg")

    var xuan = e;
    var list = this.change.orderitem;

    if (this.change.orderitem[xuan].check == false) {
      this.change.orderitem[xuan].check = true
    } else {
      this.change.orderitem[xuan].check = false
      // this.Base.setMyData({ quan: 'B' })
      this.quan='B';
    }

    for (var i = 0; i < list.length; i++) {

      if (list[i].check == true) {
        price += parseFloat(list[i].price) * parseInt(list[i].qty)
      }

    }
    this.price = price;

    //  change.orderitems[xuan].xz = !change.orderitems[xuan].xz;

  }

  bindall(e) {
    // var change = this.Base.getMyData().change;
    var orderitem = this.change.orderitem;
    var price=0;
    var id=e;
    console.log(id,"lll"); 

    if (id == 'B') {
      for (var i = 0; i < orderitem.length; i++) { 
        this.change.orderitem[i].check = true
      }
      // this.Base.setMyData({ quan:'Q'})
      this.quan='Q';
    } else {
      for (var i = 0; i < orderitem.length; i++) {
        this.change.orderitem[i].check = false
      }
      // this.Base.setMyData({ quan: 'B' })
      this.quan='B';
    }

    for (var i = 0; i < orderitem.length; i++) {

      if (orderitem[i].check == true) {
        price += parseFloat(orderitem[i].price) * parseInt(orderitem[i].qty)
      }

    }
  this.price=price;
  }

  bindadd(e,type) {
    var index = e;
    var type = type;
    // var change = this.Base.getMyData().change;
    var price=0;
    var qty = this.change.orderitem[index].qty;
    var list = this.change.orderitem;
    var shuliang = this.change.orderitem[index].shuliang;
    if (type == 'jia' ) {
      if (qty<shuliang){
        this.change.orderitem[index].qty++
      }
      
    } else{
      if (qty>1){
        this.change.orderitem[index].qty-- 
      }
    }

    for (var i = 0; i < list.length; i++) {

      if (list[i].check == true) {
        price += parseFloat(list[i].price) * parseInt(list[i].qty)
      }

    }
      this.price=price;

  }
  addtuihuo=null;
  bindsubmit(e) {
    var that = this;

    // var change = this.Base.getMyData().change;
    var shibie = this.change.orderitem;

  
    // console.log(shibie);
    // return;
    if(this.checkno(shibie)){
      // wx.showModal({
      //   title: '提交',
      //   content: '确认提交退货申请？',
      //   showCancel: true,
      //   cancelText: '取消',
      //   cancelColor: '#EE2222',
      //   confirmText: '确定',
      //   confirmColor: '#2699EC',
      //   success: function (res) {
      //     if (res.confirm) {


            // wx.showLoading({
            //   title: '提交中',
            //   mask: true
            // })


            // var orderapi = new OrderApi();

            this.orderApi.addtuihuo({
              order_id: that.change.id,
              // enterprise_id: change.enterprise_id,
              // enterprise_id: that.Base.getMyData().employeeinfo.enterprise.id,
              // employee_id: change.employee_id,

              baojia: that.change.employee_id,
              gongsi: that.change.enterprise_id,

              enterprise_id: that.operatorinfo.enterprise_id,
              employee_id: that.operatorinfo.id,

              remarks: that.content,
              carmodel: that.change.carname,
              return_money: that.price,
              receivecontact: that.phone,
              orderstatus: 'R',
              status: 'A'
            }).then((addtuihuo:any) => {

              // orderapi.updatestatus({
              //   id: that.Base.options.id,
              //   order_status: "R"
              // }, (updatestatus) => {

              // })

              // that.Base.setMyData({
                this.addtuihuo=addtuihuo;
              // })

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
                    status: 'A'
                  }
                  that.fitting(list, i)
                }
              }
            })
      //     }
      //   }
      // });

    }else {
      // wx.showToast({
      //   title: '请选择退货的零件！',
      //   icon: 'none'
      // })
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
  addtuohuoitem=null;
  fitting(json, i) {
    var that = this;
    // var orderapi = new OrderApi();
    setTimeout(() => {
      that.orderApi.addtuohuoitem(json).then((addtuohuoitem) => {
       this.addtuohuoitem=addtuohuoitem;

       
      })
    }, i * 300)

    // wx.reLaunch({
    //   url: '/pages/order/order',
    // })
  }
}