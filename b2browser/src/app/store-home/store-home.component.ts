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
 yituihuoGoods=0;
 yiwanchengGoods=0;
 emm_id='';
  onMyShow(){
    let oldtime = (new Date()).getTime() +  6*60*60*1000;
    window.localStorage.setItem('oldtime',oldtime.toString());
    var a = this.orderApi

    // this.activeRoute.queryParams.subscribe((list)=>{
    //   console.log(list)
    // })


    this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{
      console.log(employeeinfo)
      this.enterprise_id = employeeinfo.enterprise_id;
      // if(employeeinfo.power == 'Y'){
      //   console.log('aaa')
      //   this.employee_id = 'a';
      // }else{
      //   console.log('bb')
      //   this.employee_id = employeeinfo.id
      // }

      if(employeeinfo.position == 'B'){
        console.log('aaa')
        this.employee_id = '';
        this.emm_id='a';
      }else{
        console.log('bb')
        this.employee_id = employeeinfo.id;
      }

        a.mylist({ enterprise_id: this.enterprise_id,employee_id:this.employee_id }).then((mylist:any)=>{
          
          console.log(mylist)
          a.returnlist({ gongsi: this.enterprise_id,baojia:this.employee_id,orderstatus:'Y'}).then((returnlist:any)=>{
            console.log(returnlist)
         
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
            
                if(mylist[i].order_time_dateformat ==  this.today_time){
                  
                  // if(mylist[i].order_status != 'R' && mylist[i].order_status != 'Y'){
                    if(mylist[i].order_status == 'L'){
                      this.goods ++;
                    }
                    if(mylist[i].order_status == 'R'){
                      this.returnGoods ++ ;
                      this.yiwanchengGoods ++ ;
                    }
      
                    if(mylist[i].order_status == 'Y'){
                      this.yituihuoGoods ++ ;
                      this.yiwanchengGoods ++ ;
                    }
      
                    if(mylist[i].order_status == 'N'){
                      this.yiwanchengGoods ++ ;
                    }
                    this.list.push(mylist[i])
                    this.totalIncome = this.getIncome(this.list,returnlist)
                  // }
                }

                if(mylist[i].order_status == 'R'){

                  this.monOrder ++  ;
                }
  
                if(mylist[i].order_status == 'Y'){
     
                  this.monOrder ++  ;
                }
  
                if(mylist[i].order_status == 'N'){
                  this.monOrder ++  ;
                }

                
                // if(mylist[i].order_status != 'R' && mylist[i].order_status != 'Y'){
                 
                  this.monList.push(mylist[i])
                  this.monIncome = this.getIncome(this.monList,returnlist)
                // }

              }
             

              if(mylist[i].order_status == 'R'){
                this.count ++;
                
              }

              if(mylist[i].order_status == 'Y'){
                this.count ++ ;
              
              }

              if(mylist[i].order_status == 'N'){
                this.count ++ ;
              }
              
            }
          })
        })
       

    })

  }

  getIncome(list,returnlist){
    let income = 0
    for(let i=0;i<list.length;i++){
      income += Number( list[i].totalamount);
      for(let item of returnlist){
        if(list[i].id==item.order_id){
          income -= Number(item.return_money);
        }
      }
    }
    
    return income
  }

  reGoods(){
   
    this.router.navigate(['orderManagement'],{
      queryParams: {
        stauts: 'L',
        emm_id:this.emm_id
      }
    })
  }

  applyGoods(flag){
    console.log(flag)
    if(flag){
      this.router.navigate(['returnsManagement'],{
        queryParams: {
          status: 'R',
          emm_id:this.emm_id
        }
      })
    }else {
      this.router.navigate(['returnsManagement'],{
        queryParams: {
          status: 'Y',
          emm_id:this.emm_id
        }
      })
    }
   
  }

  todayOrder(){
    this.router.navigate(['orderManagement'],{
      queryParams: {
        emm_id: this.emm_id
      }
    })
  }

  todayIncome(){

    if(this.position =='B'){
      this.router.navigate(['managementCenter'],{
        queryParams: {
          stauts: 'L',
          emm_id:this.emm_id
        }
      })
    }else{
      this.router.navigate(['employeeManagement'],{
        queryParams: {
          stauts: 'L',
          emm_id:this.emm_id
        }
      })
    }
    

  }

  monthOrder(){
    this.router.navigate(['orderManagement'],{
      queryParams: {
        month_time: this.year_mon,
        emm_id: this.emm_id
      }
    })
  }

  monthIncome(){
    if(this.position =='B'){
      this.router.navigate(['managementCenter'],{
        queryParams: {
          stauts: 'L',
          emm_id:this.emm_id
        }
      })
    }else{
      this.router.navigate(['employeeManagement'],{
        queryParams: {
          stauts: 'L',
          emm_id:this.emm_id
        }
      })
    }
  }
}