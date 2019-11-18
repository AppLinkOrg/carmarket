import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrls: ['./store-home.component.scss'],
  providers:[InstApi,OrderApi,EnterpriseApi]  
})
export class StoreHomeComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi,
    public enterpriseApi:EnterpriseApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }

  list = []
  monList = []

  count = 0
  totalIncome = 0

  monOrder = 0
  monIncome = 0

  goods = 0
  returnGoods = 0
  
  today_time = null
  year_mon = null

 enterprise_id = ''
 employee_id=''

  onMyShow(){
    
    var a = this.orderApi

    // this.activeRoute.queryParams.subscribe((list)=>{
    //   console.log(list)
    // })


    this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{
      console.log(employeeinfo)
      this.enterprise_id = employeeinfo.enterprise_id
      
      if(employeeinfo.power == 'Y'){
        console.log('aaa')
        this.employee_id = ''
      }else{
        console.log('bb')
        this.employee_id = employeeinfo.id
      }

        a.mylist({ enterprise_id: this.enterprise_id,employee_id:this.employee_id }).then((mylist:any)=>{
          
          console.log(mylist)
          
          for(let i=0;i<mylist.length;i++){
            let day = new Date()
            let year = day.getFullYear()
            let  month :any = (day.getMonth()+1)
            let date :any = day.getDate()

            month = month < 10 ? '0'+ month : month
            date = date < 10  ? '0'+ date : date
            this.today_time = year+ "-" + month + "-" + date;
            this.year_mon = year+ "-" + month 

            let index = mylist[i].order_time.indexOf('-')
            
            mylist[i].order_time = mylist[i].order_time.substring(0,index+3)
            


            if(mylist[i].order_time == this.year_mon){

              // this.monOrder ++ 
              // this.monList.push(mylist[i])
              // this.monIncome = this.getIncome(this.monList)
            
              if(mylist[i].order_time_dateformat == this.today_time){
                if(mylist[i].order_status != 'R' && mylist[i].order_status != 'Y'){
                  this.count ++ 
                  this.list.push(mylist[i])
                  this.totalIncome = this.getIncome(this.list)
                }
              }

              if(mylist[i].order_status != 'R' && mylist[i].order_status != 'Y'){
                this.monOrder ++ 
                this.monList.push(mylist[i])
                this.monIncome = this.getIncome(this.monList)
              }

            }
            if(mylist[i].order_status == 'L'){
              this.goods ++
            }

            if(mylist[i].order_status == 'R'){
              this.returnGoods ++ 
            }

          }
        })

    })

  }

  getIncome(list){
    let income = 0
    for(let i=0;i<list.length;i++){
      income += parseInt( list[i].totalamount)
    }
    return income
  }

  reGoods(){
   
    this.router.navigate(['orderManagement'],{
      queryParams: {
        stauts: 'L'
      }
    })
  }

  applyGoods(){
    this.router.navigate(['returnsManagement'],{
      queryParams: {
        status: 'R'
      }
    })
  }

  todayOrder(){
    this.router.navigate(['orderManagement'],{
      queryParams: {
        order_time_dateformat: this.today_time
      }
    })
  }

  todayIncome(){

    if(this.position =='B'){
      this.router.navigate(['managementCenter'],{
        queryParams: {
          stauts: 'L'
        }
      })
    }else{
      this.router.navigate(['employeeManagement'],{
        queryParams: {
          stauts: 'L'
        }
      })
    }
    

  }

  monthOrder(){
    this.router.navigate(['orderManagement'],{
      queryParams: {
        month_time: this.year_mon
      }
    })
  }

  monthIncome(){
    if(this.position =='B'){
      this.router.navigate(['managementCenter'],{
        queryParams: {
          stauts: 'L'
        }
      })
    }else{
      this.router.navigate(['employeeManagement'],{
        queryParams: {
          stauts: 'L'
        }
      })
    }
  }
}