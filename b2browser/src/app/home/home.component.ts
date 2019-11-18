import { Component, OnInit, ɵConsole } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[InstApi,EnterpriseApi,OrderApi]
})
export class HomeComponent  extends AppBase  {

  toggle=false;
  instinfo=null;
  public operatorinfo:any = {
    name: '',
    enterprise: {
      name: ''
    }
  }

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public OrderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi,OrderApi,enterpriseApi);

    this.instinfo={};
    this.instApi.info({unicode:"carmarkets"}).then((instinfo)=>{

      this.instinfo=instinfo;
    });
  }

  enterprise_id = ''
  employee_id = ''
  obj = null
  returnnum='';
  ordernum=''
  quotereadnum=""
  risread='Y'
  oread='Y'
  isread='Y'
  onMyShow(){
    let oldtime = (new Date()).getTime() +  10*60*1000;
    window.localStorage.setItem('oldtime',oldtime.toString())
    
    this.activeRoute.queryParams.subscribe((aa)=>{
      
   

        var that = this
      
        this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{
          console.log(employeeinfo)
      
          setTimeout(() => {
            console.log("进来了");
            this.orderapi.returnisread({gongsi:employeeinfo.enterprise_id,baojia:employeeinfo.id}).then((ret:any)=>{
              console.log('退货')
              if(ret){
                  if(ret.code=='0'){
                      that.risread = 'Y'
                  }else if(ret.code!="0"){
                      that.risread = 'N'
                      that.returnnum = ret.code
                  }
              }
            })
    
    
            this.orderapi.orderisread({enterprise_id:employeeinfo.enterprise_id,employee_id:employeeinfo.id}).then((ret:any)=>{
              console.log(ret,'订单')
              if(ret){
                  if(ret.code=='0'){
                      that.oread = 'Y'
                  }else if(ret.code!="0"){
                      that.oread = 'N'
                      that.ordernum = ret.code
                  }
              }
            })
      
            this.orderapi.isread({enterprise_id:employeeinfo.enterprise_id,employee_id:employeeinfo.id}).then((ret:any)=>{
              console.log(ret,'已读')
              if(ret){
                  if(ret.code=='0'){
                      that.isread = 'Y'
                  }else if(ret.code!="0") {
                      that.isread = 'N'
                      that.quotereadnum = ret.code
                  }
              }
            
            })

            
          }, 1000);

     

          
        })

      if(aa.result == 'yes'){
        this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{
          console.log(employeeinfo)
          this.enterprise_id = employeeinfo.enterprise_id
          this.employee_id = employeeinfo.id
    
          this.obj = employeeinfo

     console.log("进来了");
          this.orderapi.returnisread({gongsi:employeeinfo.enterprise_id,baojia:employeeinfo.id}).then((ret:any)=>{
            console.log('退货')
            if(ret){
                if(ret.code=='0'){
                    that.risread = 'Y'
                }else if(ret.code!="0"){
                    that.risread = 'N'
                    that.returnnum = ret.code
                }
            }
        })


          
        })
      }
      
      
    })
    

  }


  toggleSidebar(){
    console.log('jjjjjj')
    this.toggle=!this.toggle;
  
  }


}
