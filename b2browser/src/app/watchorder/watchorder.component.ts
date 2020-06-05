import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchorder',
  templateUrl: './watchorder.component.html',
  styleUrls: ['./watchorder.component.scss'],
  providers:[InstApi,EnterpriseApi,OrderApi]
})
export class WatchorderComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
    public commonModule:CommonModule,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  onMyLoad(){
    this.params;
    console.log('oooo11')
  }
  order='A';
  daifukuan=[];
  daifahuo=[];
  daishouhuo=[];
  yiwancheng=[];
  yiquxiao=[];
  onMyShow(){
    console.log('oooo22')
    // this.operatorinfo.id=1;
    // this.operatorinfo.enterprise_id="1";
    this.orderApi.mylist({
      order_status: 'W', baojia: this.operatorinfo.id, orderby:'r_main.orderno desc'
    }).then((daifukuan:any) => {
      for (var i = 0; i < daifukuan.length; i++) {
        daifukuan[i].order_time_formatting = this.gettime(daifukuan[i].order_time_formatting)
      }
      this.daifukuan=daifukuan;
      console.log( this.daifukuan,'oooo22')
    })

    this.orderApi.mylist({
      order_status: 'L', baojia:this.operatorinfo.id, orderby: 'r_main.orderno desc'
    }).then( (daifahuo:any) => {
      for(var i=0;i<daifahuo.length;i++){
        daifahuo[i].order_time_formatting=this.gettime(daifahuo[i].order_time_formatting)
      }
     this.daifahuo=daifahuo;
     console.log( this.daifahuo,'oooo22')
    })

    this.orderApi.mylist({
      order_status: 'M', baojia: this.operatorinfo.id, orderby: 'r_main.orderno desc'
    }).then( (daishouhuo:any) => {
      for (var i = 0; i < daishouhuo.length; i++) {
        daishouhuo[i].order_time_formatting = this.gettime(daishouhuo[i].order_time_formatting)
      }
    this.daishouhuo=daishouhuo;
    console.log( this.daishouhuo,'oooo22')
    })

    this.orderApi.mylist({
      order_status: 'N,R,Y,I', baojia: this.operatorinfo.id, orderby: 'r_main.orderno desc'
    }).then( (yiwancheng:any) => {
      for (var i = 0; i < yiwancheng.length; i++) {
        yiwancheng[i].order_time_formatting = this.gettime(yiwancheng[i].order_time_formatting)
      }
     this.yiwancheng=yiwancheng;
     console.log( this.yiwancheng,'oooo22')
    })

    this.orderApi.mylist({
      order_status: 'E', 
      baojia: this.operatorinfo.id, orderby: 'r_main.orderno desc'
    }).then( (yiquxiao:any) => {
      for(var i=0;i<yiquxiao.length;i++){
        yiquxiao[i].order_time_dateformat = this.gettime(yiquxiao[i].order_time_dateformat)
      }
      this.yiquxiao=yiquxiao;
      console.log( this.yiquxiao,'oooo22')
    })

  }
  gettime(date) {
    date = date.replace(/-/g, '/');
    date = date.slice(5, 10);
    return date
  }

  bindsend(id) {
    this.navigate('/waitsend',{id:id})
   
  }

  bindreceive(id) {
   
    this.navigate('/waitreceive',{id:id})
   
  }

  bindsuccess(id) {
  
    this.navigate('/success',{id:id})
  }

  totuihuan(id){
  
    this.navigate('/changeapply',{id:id})
  }

  bindorder(e) {

    this.order=e;
    console.log(this.order,'pppp')
    this.onMyShow();
  }


  bindquxiao(id) {
    var that = this;

    var price = 0;
    for (var i = 0; i < this.daifahuo.length;i++){
      if (id == this.daifahuo[i].id){
        for (var j = 0; j < this.daifahuo[i].orderitem.length;j++){
          price += parseFloat(this.daifahuo[i].orderitem[j].price);
        }
      }
    }

    if (price>0){
      
    // wx.showModal({
    //   title: '取消订单',
    //   content: '确认取消订单？',
    //   showCancel: true,
    //   cancelText: '取消',
    //   cancelColor: '#EE2222',
    //   confirmText: '确定',
    //   confirmColor: '#2699EC',
    //   success: function(res) {
    //     if (res.confirm) {

          this.orderApi.updatemoney({
            ent_id: that.operatorinfo.enterprise_id,
            money: price,
          }).then( (updatemoney) => {

            this.orderApi.addxiaofei({
              type: 'E',
              amount:price,
              enterprise_id: that.operatorinfo.enterprise_id,
              employee_id:that.operatorinfo.id,
              order_id: id,
            }).then( (addxiaofei) => {

           

              this.orderApi.updatestatus({
              id: id,
              order_status: "E"
            }).then( (updatestatus) => {
              that.onMyShow();
            })

              })

          })

         
          

        // }
      // }
    // })


    }

  }

  bindshou(id) {
    // var id = e.currentTarget.id
    // var orderapi = new OrderApi();
    var that = this;
    // wx.showModal({
    //   title: '收货',
    //   content: '确认货物已收到？',
    //   showCancel: true,
    //   cancelText: '取消',
    //   cancelColor: '#EE2222',
    //   confirmText: '确定',
    //   confirmColor: '#2699EC',
    //   success: function(res) {
    //     if (res.confirm) {
          this.orderApi.updatestatus({
            id: id,
            order_status: "N"
          }).then((updatestatus) => {
            that.onMyShow();
          })
    //     }
    //   }
    // })




  }


  bindtobuy(id) {
    
    this.navigate('/obligations',{id:id})
    
  }

}