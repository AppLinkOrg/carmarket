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
    console.log(item)
    console.log(this.operatorinfo)
    if(item.orderstatus=='R'){

      item.orderstatus = 'I'
      this.orderApi.updatereturnstatus({id:item.id,orderstatus:item.orderstatus}).then((updatereturnstatus:any)=>{
        console.log(updatereturnstatus)
        if(updatereturnstatus.code=='0'){
          this.navigate('returnsManagement')
        }
      })

    }else if(item.orderstatus=='I'){
      that.orderApi.addconsume({type:"R",amount:item.return_money,enterprise_id:this.operatorinfo.enterprise_id,employee_id:this.operatorinfo.id}).then((addconsume)=>{
        console.log(addconsume,'aaaa')
        if(addconsume){
          that.memberApi.editenterprise({id:item.enterprise_id,account_money:item.return_money}).then((editenterprise)=>{
            if(editenterprise){
              that.memberApi.editmoney({id:this.operatorinfo.id,sales_volume:item.return_money}).then((editmoney)=>{
                if(editmoney){
                  item.orderstatus='Y'
                  that.orderApi.updatereturnstatus({id:item.id,orderstatus:item.orderstatus}).then((updatereturnstatus:any)=>{
                    console.log(updatereturnstatus)
                    if(updatereturnstatus.code=='0'){
                      that.navigate('returnsManagement')
                    }
                  })
                }
              })
            }
          })
          
        }
      })
    }

    


  }
}
