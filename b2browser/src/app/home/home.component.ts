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
  providers: [InstApi, EnterpriseApi, OrderApi]
})
export class HomeComponent extends AppBase {

  toggle = false;
  instinfo = null;
  public operatorinfo: any = {
    name: '',
    enterprise: {
      name: ''
    }
  }

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public enterpriseApi: EnterpriseApi,
    public OrderApi: OrderApi,
  ) {
    super(router, activeRoute, instApi, OrderApi, enterpriseApi);

    this.instinfo = {};
    this.instApi.info({ unicode: "carmarkets" }).then((instinfo) => {

      this.instinfo = instinfo;
    });
  }

  enterprise_id = ''
  employee_id = ''
  obj = null
  returnnum = '';
  ordernum = ''
  quotereadnum = ""
  risread = 'Y'
  oread = 'Y'
  isread = 'Y'
  onMyShow() {

    let oldtime = (new Date()).getTime() + 10 * 60 * 1000;
    window.localStorage.setItem('oldtime', oldtime.toString())

    this.activeRoute.queryParams.subscribe((aa) => {

      this.update(aa);

      setInterval(() => {
        
        this.update(aa);
      }, 10 * 1000);


    })


  }


  toggleSidebar() {
    console.log('jjjjjj')
    this.toggle = !this.toggle;

  }

  update(aa){


    

    var that = this

    this.enterpriseApi.employeeinfo({}).then((employeeinfo: any) => {
      console.log(employeeinfo)

      if(employeeinfo.enterprise_id=="0"){
        this.router.navigate(["login"]);
        return
      }
      console.log("进来了");
      
      var a = this.orderapi
      a.quotelist({}).then((list: any) => {
          console.log(list,'list')
  
          a.quotationlist({quotecompan_id:employeeinfo.enterprise_id,quoteper:employeeinfo.id}).then((quotationlist:any)=>{
            if(quotationlist.length==0){
              for (let item of list) {
      
                if(item.quotestatus=='Q'){
                      
                      item.quote_id = item.id
                      item.quoteper = this.operatorinfo.id
                      item.quotecompan_id = this.operatorinfo.enterprise_id
                 
                      if(item.invoice_demand!=""){
                        item.invoice_demand =item.invoice_demand
                      }else if(item.invoice_demand=="" &&item.invoice_demand_value!=""){
                        item.invoice_demand =item.invoice_demand_value
                      }
                      
                        a.addquotation(item).then((addquotation:any)=>{
                          console.log(addquotation,'addquotation')
                        })
                      
                  }
              }
            }else {
                for (let item of list) {
      
                  if(item.quotestatus=='Q' || item.quotestatus=="W"){
                        if(this.notinignore4(item,quotationlist)){
                          item.quote_id = item.id
                          item.quoteper = this.operatorinfo.id
                          item.quotecompan_id = this.operatorinfo.enterprise_id
                           item.quotestatus = "Q"
                          if(item.invoice_demand!=""){
                            item.invoice_demand =item.invoice_demand
                          }else if(item.invoice_demand=="" &&item.invoice_demand_value!=""){
                            item.invoice_demand =item.invoice_demand_value
                          }
  
                          a.addquotation(item).then((addquotation:any)=>{
                            console.log(addquotation,'addquotation')
                          })
                        }
                       
                    }
                }
             
            }
           
          })
              
         
      })


      this.orderapi.orderisread({ enterprise_id: employeeinfo.enterprise_id, employee_id: employeeinfo.id }).then((ret: any) => {
        console.log(ret, '订单')
        if (ret) {
          if(ret.quote>'0'){
            this.isread = 'N';
            this.quotereadnum = ret.quote;
          }else {
            this.isread = 'Y';
          }

          if(ret.order>'0'){
            this.oread = 'N';
            this.ordernum = ret.order;
          }else {
            this.oread = 'Y';
          }

          if(ret.return>'0'){
            this.risread = 'N';
            this.returnnum = ret.return;
          }else {
            this.risread = 'Y';
          }
        
        }
      })

     

        




    })

    if (aa.result == 'yes') {
      this.enterpriseApi.employeeinfo({}).then((employeeinfo: any) => {
        console.log(employeeinfo)

        
      if(employeeinfo.enterprise_id=="0"){
        this.router.navigate(["login"]);
        return
      }

        this.enterprise_id = employeeinfo.enterprise_id
        this.employee_id = employeeinfo.id

        this.obj = employeeinfo


        var a = this.orderapi
        a.quotelist({}).then((list: any) => {
            console.log(list,'list')
    
            a.quotationlist({quotecompan_id:employeeinfo.enterprise_id,quoteper:employeeinfo.id}).then((quotationlist:any)=>{
              if(quotationlist.length==0){
                for (let item of list) {
        
                  if(item.quotestatus=='Q'){
                        
                        item.quote_id = item.id
                        item.quoteper = this.operatorinfo.id
                        item.quotecompan_id = this.operatorinfo.enterprise_id
                   
                        if(item.invoice_demand!=""){
                          item.invoice_demand =item.invoice_demand
                        }else if(item.invoice_demand=="" &&item.invoice_demand_value!=""){
                          item.invoice_demand =item.invoice_demand_value
                        }
                        
                          a.addquotation(item).then((addquotation:any)=>{
                            console.log(addquotation,'addquotation')
                          })
                        
                    }
                }
              }else {
                  for (let item of list) {
        
                    if(item.quotestatus=='Q' || item.quotestatus=="W"){
                          if(this.notinignore4(item,quotationlist)){
                            item.quote_id = item.id
                            item.quoteper = this.operatorinfo.id
                            item.quotecompan_id = this.operatorinfo.enterprise_id
                             item.quotestatus = "Q"
                            if(item.invoice_demand!=""){
                              item.invoice_demand =item.invoice_demand
                            }else if(item.invoice_demand=="" &&item.invoice_demand_value!=""){
                              item.invoice_demand =item.invoice_demand_value
                            }
    
                            a.addquotation(item).then((addquotation:any)=>{
                              console.log(addquotation,'addquotation')
                            })
                          }
                         
                      }
                  }
               
              }
             
            })
                
           
        })

        console.log("进来了");
       
        this.orderapi.orderisread({ enterprise_id: employeeinfo.enterprise_id, employee_id: employeeinfo.id }).then((ret: any) => {
          console.log(ret, '订单')
          if (ret) {
            if(ret.quote>'0'){
              this.isread = 'N';
              this.quotereadnum = ret.quote;
            }else {
              this.isread = 'Y';
            }
  
            if(ret.order>'0'){
              this.oread = 'N';
              this.ordernum = ret.order;
            }else {
              this.oread = 'Y';
            }
  
            if(ret.return>'0'){
              this.risread = 'N';
              this.returnnum = ret.return;
            }else {
              this.risread = 'Y';
            }
          
          }
        })



        
        

      })
    }
  }
  notinignore4(item,arr){
    for(let yiitem of arr){
      if(yiitem.quote_id==item.id){
        if(yiitem.quotecompan_id==this.operatorinfo.enterprise_id && yiitem.quoteper==this.operatorinfo.id){
          return false
        }
      }
    }
    return true;
  }

}
