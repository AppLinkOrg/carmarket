import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { MemberApi } from 'src/providers/member.api';

@Component({
  selector: 'app-returns-detail',
  templateUrl: './returns-detail.component.html',
  styleUrls: ['./returns-detail.component.scss'],
  providers:[InstApi,OrderApi,EnterpriseApi,MemberApi]
})
export class ReturnsDetailComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi,
    public enterpriseApi:EnterpriseApi,
    public memberApi:MemberApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }

  id = '';
  returndetail=null;
  returnitem=[];

  returnstatus = ''
  
  onMyShow(){
    let oldtime = (new Date()).getTime() +  6*60*60*1000;
    window.localStorage.setItem('oldtime',oldtime.toString())
    this.activeRoute.queryParams.subscribe(queryParams=>{
      this.id = queryParams.id
    })

    this.orderApi.returndetail({id: this.id}).then((returndetail:any)=>{
      console.log(returndetail,'llllll')
      this.returnstatus = returndetail.orderstatus
      this.returndetail = returndetail
      this.returnitem = returndetail.tuihuoitem.filter((item)=>{
        if(returndetail.id==item.tuihuo_id){
          return item
        }
      })
    })
    

  }
  
  saveQuote(item){
    var that = this
    console.log(item,'hhhhhhhhh')
    console.log(this.operatorinfo)
    if(item.orderstatus=='R'){

      item.orderstatus = 'I'
      this.orderApi.updatereturnstatus({id:item.id,orderstatus:item.orderstatus,order_id:item.order_id}).then((updatereturnstatus:any)=>{
        console.log(updatereturnstatus)
        // if(updatereturnstatus.code=='0'){
          this.navigate('returnsManagement',{bb:3})
        // }
      })

    }else if(item.orderstatus=='I'){
      that.orderApi.addxiaofei({type:"R",amount:item.return_money,enterprise_id:item.enterprise_id,employee_id:item.employee_id,order_id:item.order_id,returnemp_id:this.operatorinfo.id}).then((addconsume)=>{
        console.log(addconsume,'aaaa')
        if(addconsume){
          that.memberApi.editenterprise({id:this.operatorinfo.enterprise_id,account_money:item.return_money}).then((editenterprise)=>{
            if(editenterprise){
              console.log(this.operatorinfo.enterprise_id)
              that.orderApi.updatemoney({ent_id:item.enterprise_id,money:item.return_money}).then(()=>{

              })

              that.orderApi.addxiaofei({type:"R",amount:item.return_money,enterprise_id:this.operatorinfo.enterprise_id,employee_id:this.operatorinfo.id,order_id:item.order_id}).then(()=>{

              })
              that.memberApi.editmoney({id:this.operatorinfo.id,sales_volume:item.return_money}).then((editmoney)=>{
                if(editmoney){
                  item.orderstatus='Y'
                  that.orderApi.updatereturnstatus({id:item.id,orderstatus:item.orderstatus,order_id:item.order_id}).then((updatereturnstatus:any)=>{
                    console.log(updatereturnstatus)
                    // if(updatereturnstatus.code=='0'){
                      that.navigate('returnsManagement',{bb:4})
                    // }
                  })
                }
              })
            }
          })
          
        }
      })
    }

    


  }
  fanhui(){
    this.navigate('returnsManagement',{bb:this.params.bb})
  }
}
