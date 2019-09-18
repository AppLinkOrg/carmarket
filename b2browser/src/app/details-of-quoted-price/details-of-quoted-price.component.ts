import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';


@Component({
  selector: 'app-details-of-quoted-price',
  templateUrl: './details-of-quoted-price.component.html',
  styleUrls: ['./details-of-quoted-price.component.scss'],
  providers:[InstApi,OrderApi]
})
export class DetailsOfQuotedPriceComponent  extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi: OrderApi
  ) { 
    super(router,activeRoute,instApi);
  }


  quoteinfo={};
  id='';
  list=[];

  onMyShow(){

    this.activeRoute.queryParams.subscribe(queryParams=>{
      
        this.id = queryParams.id
      })
      
      var a = this.orderApi
      a.quoteinfo({ id: this.id }).then((quoteinfo:any)=>{

        
        this.quoteinfo = quoteinfo;
        
        for(let item of quoteinfo.fittingsitem){
          if(item.quoteitems.length != 0){
         
            for(let list of item.quoteitems){
              this.list.push(list)
            }
          }
        
        }

      })
      

  }

}
