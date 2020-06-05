import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-jiaoyijilu',
  templateUrl: './jiaoyijilu.component.html',
  styleUrls: ['./jiaoyijilu.component.scss'],
  providers:[InstApi,EnterpriseApi]
})
export class JiaoyijiluComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  type=[
    { id: 1, name: '已完成' },
    { id: 2, name: '已退货' },
  ];
  seq=0;
  list=[];
  templist=[];
  onMyShow(){
    var that = this;
    this.orderApi.consumelist({
      employee_id: this.operatorinfo.id,
      orderby:'r_main.consume_time desc'

    }).then( (list:any) => {
      console.log(list, 'ooooo')
      var templist=[];
      templist=list;
      var ss=[];
      for (var i = 0; i < templist.length;i++){
        templist[i].consume_time1 = that.changedate(templist[i].consume_time);
        templist[i].consume_time2 = that.changetime(templist[i].consume_time);
        if(that.seq==0){
          if (templist[i].type == 'G') {
            ss.push(templist[i]);
          }
        }else {
          if (templist[i].type == 'R') {
            ss.push(templist[i]);
          }
        }
        
      }
      // this.Base.setMyData({
      //   list:ss, templist
      // });
      this.list=ss;
      this.templist=templist;
    });
  }

  changedate(date){
    date = date.replace(/-/g,'/');
    date = date.slice(2,10);
    return date
  }

  changetime(date) {
    date = date.replace(/-/g, '/');
    date = date.slice(11, date.length - 3);
    return date
  }

 
  todetails(item,id) {
      // console.log(e)
      // var type=e.currentTarget.dataset.type.type;
      // return
      if(item.type=='G'){
        // wx.navigateTo({
        //   url: '/pages/success/success?id=' + e.currentTarget.id,

        // })
        this.navigate('/success',{id:id})
      }else {
        // wx.navigateTo({
        //   url: '/pages/changedetail/changedetail?order_id=' + e.currentTarget.id,

        // })
        this.navigate('/changedetail',{order_id:id})
      }
    
  }
  qiehuan(idx){
    // var cur = e.currentTarget.dataset.idx;
    // var templist = this.Base.getMyData().templist;
    var list=[];
    if(idx==1){
      for(var i=0;i<this.templist.length;i++){
        if (this.templist[i].type=='R'){
          list.push(this.templist[i])
        }
      }
    }else {
      for (var i = 0; i < this.templist.length; i++) {
        if (this.templist[i].type == 'G') {
          list.push(this.templist[i])
        }
      }
    }
    // console.log(e)
    // this.Base.setMyData({
    //   seq:cur,list
    // })
    this.seq =idx;
    this.list=list;

  }

}
