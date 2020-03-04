import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
  providers:[InstApi,EnterpriseApi]
})
export class SuccessComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  onMyShow(){
    this.orderApi.detail({
      id: this.params.id,
     // id: 1,
    }).then ((yiwancheng:any) => {
      // this.Base.setMyData({
      //   yiwancheng, orderlijian: yiwancheng.orderitem
      // });
      this.getreturn(yiwancheng.orderitem, yiwancheng);
    });
  }
  lijian=[];
  yiquantuohuo=false;
  yiwancheng={};
  weiquantuohuo=false;

  getreturn(orderlijian, yiwancheng){
    // var orderapi = new OrderApi();
    console.log(orderlijian,'orderlijian');
    // var yiwancheng=this.Base.getMyData().yiwancheng;
   var lijian = [];
    this.orderApi.returnlist({ order_id: this.params.id }).then( (returndetail:any)=>{
      console.log(returndetail,'getreturn');
      if (returndetail.length>0){
        returndetail.filter((item) => {
          // lijian = item.returnitem;
          for (var e = 0; e < item.returnitem.length; e++) {
            lijian.push(item.returnitem[e])
          }

        })
       
        if (orderlijian.length ==  lijian.length) {
          var yiquantuohuo = true;
        }
        if (orderlijian.length >  lijian.length) {
          var weiquantuohuo = false;
        
        }
        if(lijian.length>0){
          for (var i = 0; i < orderlijian.length; i++) {
            for (var j = 0; j <  lijian.length; j++) {
              if (orderlijian[i].parts ==  lijian[j].name) {
                yiwancheng.orderitem[i].tui = true
              }
            }
          }
        }
          
        // this.Base.setMyData({ lijian, yiquantuohuo, weiquantuohuo,yiwancheng })
        this.yiwancheng=yiwancheng;
        this.lijian=lijian;
        this.weiquantuohuo=weiquantuohuo;
        this.yiwancheng=yiwancheng;

      }else {
        this.yiwancheng=yiwancheng;
        this.weiquantuohuo=false;
        // this.Base.setMyData({
        //   weiquantuohuo:false,
        //   yiwancheng
        // })
      }
      
      
    })

  }

  bindapply(id) {
    // var id = e.currentTarget.id;
    // wx.navigateTo({
    //   url: '/pages/changeapply/changeapply?id=' + id,
    // })
    this.navigate('changeapply',{id:id})
  }

  // back(){
  //   this.navigate('/watchorder')
  // }

}
