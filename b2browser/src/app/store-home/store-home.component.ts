import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrls: ['./store-home.component.scss'],
  providers:[,OrderApi]  
})
export class StoreHomeComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi
  ) { 
    super(router,activeRoute,instApi);
  }

  list = []
  monList = []

  count = 0
  totalIncome = 0

  monOrder = 0
  monIncome = 0

  goods = 0
  returnGoods = 0
  

  onMyShow(){
    
    var a = this.orderApi

    a.mylist({ enterprise_id: 2 }).then((mylist:any)=>{
      

      for(let i=0;i<mylist.length;i++){
        let day = new Date()
        let year = day.getFullYear()
        let  month :any = (day.getMonth()+1)
        let date :any = day.getDate()

        month = month < 10 ? '0'+ month : month
        date = date < 10  ? '0'+ date : date
        let today_time = year+ "-" + month + "-" + date;
        let year_mon = year+ "-" + month 

        let index = mylist[i].order_time.indexOf('-')
        
        mylist[i].order_time = mylist[i].order_time.substring(0,index+3)
        


        if(mylist[i].order_time == year_mon){

          this.monOrder ++ 
          this.monList.push(mylist[i])
          this.monIncome = this.getIncome(this.monList)
         
          if(mylist[i].order_time_dateformat == today_time){

            this.count ++ 
            this.list.push(mylist[i])
            this.totalIncome = this.getIncome(this.list)
          }

          if(mylist[i].status_name == '待发货'){
            this.goods ++
          }

          if(mylist[i].status_name == '待退货'){
            this.returnGoods ++ 
          }

        }
        
      }
    })

  }

  getIncome(list){
    let income = 0
    for(let i=0;i<list.length;i++){
      income += parseInt( list[i].totalamount)
    }
    return income
  }



}