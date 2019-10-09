import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-send-goods-detail',
  templateUrl: './send-goods-detail.component.html',
  styleUrls: ['./send-goods-detail.component.scss'],
  providers:[InstApi,OrderApi]
})
export class SendGoodsDetailComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi: OrderApi
  ) { 
    super(router,activeRoute,instApi);
  }

  id = '';
  list = null;
  orderItem = [];

  onMyShow(){
    

    this.activeRoute.queryParams.subscribe(queryParams=>{
      this.id = queryParams.id
    })

    var a = this.orderApi

    a.detail({ id: this.id }).then((detailList:any)=>{
    
      this.list = detailList
      this.orderItem = detailList.orderitems;
      console.log(this.list)

      this.orderApi.quoteinfo({id: this.list.quote_id}).then((quoteinfo:any)=>{
        console.log(quoteinfo)
        this.list.quote_time = quoteinfo.quote_time
      })

    })
   

  }

  changeStatus(){
    this.list.order_status = "M"
    this.orderApi.updatestatus({id: this.list.id, order_status: this.list.order_status, status: 'A'}).then((updatestatus:any)=>{
   
      if(updatestatus.code == 0){
        this.router.navigate(['receiveGoodsDetail'],{ queryParams: { id: this.id }});
      }
    })
  }

  print(){
    let bdHtml = document.getElementsByClassName('printHtml')[0].innerHTML
    let wind = window.open("",'newwindow', 'height=300, width=700, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
    wind.document.body.innerHTML = bdHtml;
    wind.print();
    // window.document.body.innerHTML=prnhtml;   
    // window.print();
  }

}

