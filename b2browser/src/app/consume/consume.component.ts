import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';


@Component({
  selector: 'app-consume',
  templateUrl: './consume.component.html',
  styleUrls: ['./consume.component.scss'],
  providers:[OrderApi]
})
export class ConsumeComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  consumelist=null
  allenterprise=null
  name=''
  templist=null
  onMyShow(){
    let oldtime = (new Date()).getTime() +  10*60*1000;
    window.localStorage.setItem('oldtime',oldtime.toString())
    console.log(this.params,'llll')
    console.log(this.operatorinfo.name,'uuuuuu')
    // this.name = this.params.name
    this.enterpriseApi.allenterprise({enterprise_id:this.params.enterprise_id }).then((allenterprise:any)=>{
      console.log(allenterprise,'全部')
      this.allenterprise = allenterprise
    })


    this.orderApi.consumelist({enterprise_id:this.params.enterprise_id}).then((consumelist)=>{
      console.log(consumelist)
      this.templist = consumelist
      this.consumelist = consumelist
      
    })
  } 
 
  changcode(){
    console.log(this.name)
    if(this.name!=""){
      this.consumelist = this.templist.filter(item=>{
        if(item.employee_name==this.name){
          return item
        }

      })
    }
  }

  reset(){
    this.consumelist = this.templist
  }
}
