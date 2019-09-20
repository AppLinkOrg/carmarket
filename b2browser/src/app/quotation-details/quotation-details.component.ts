import { Component, OnInit, Input } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-quotation-details',
  templateUrl: './quotation-details.component.html',
  styleUrls: ['./quotation-details.component.scss'],
  providers:[InstApi,OrderApi]
})
export class QuotationDetailsComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi
  ) { 
    super(router,activeRoute,instApi);
  }


  quoteinfo=null;
  id='';

  list=[];
  fittinglist=[];
 

  addConfir = false;

  onMyShow(){
    
    this.activeRoute.queryParams.subscribe(queryParams=>{
      this.id = queryParams.id
    })
    var a = this.orderApi
    a.quoteinfo({ id: this.id }).then((quoteinfo:any)=>{

      this.quoteinfo = quoteinfo;
      this.fittinglist = quoteinfo.fittingsitem;
      for(let i=0;i<quoteinfo.fittingsitem.length;i++){
        if(quoteinfo.fittingsitem[i].quoteitems.length != 0){
     
          quoteinfo.fittingsitem[i].quoteitems = []
        }

      }
      console.log(quoteinfo)
      console.log(this.fittinglist)
     
    })

    

  }


  addQuote(item){
    console.log(item)

    
    if(item.count >= 2){

      for(var i=0;i<this.fittinglist.length;i++){

        if(item.id == this.fittinglist[i].id){
          item.count ++;
        }
      }
    }else {
      item.count = 2
    }

    var addList = {
      fittings_id: item.id,
      name: item.name,
      quantity: item.quantity,
      quality: item.quality,
      standby_time: item.standby_time,
      guarantee: item.guarantee,
      price: item.price,
      remarks_infor: item.remarks_infor,
      count: item.count
    }

   
    if(addList.price !=0 ){

      for(var j=0;j<this.fittinglist.length;j++){

          if(this.fittinglist[j].id==item.id){
              this.fittinglist[j].quoteitems.push(addList)
              this.fittinglist[j].count = addList.count
          }
      }

      this.list.push(addList)
      
    }


  }

  deleteQuote(item){

    for(let i=0; i<this.list.length;i++){
      if(item.fittings_id == this.list[i].fittings_id && item.count == this.list[i].count){
        this.list.splice(i,1)
      }
    }

    for(let j=0;j<this.fittinglist.length;j++){
      if(item.fittings_id == this.fittinglist[j].id){
        for(let k=0;k<this.fittinglist[j].quoteitems.length;k++){
          if(item.count == this.fittinglist[j].quoteitems[k].count){
            this.fittinglist[j].quoteitems.splice(k,1)
          }
        }
      }
    }

  }





  saveQuote(enterprise_id){
     

     //console.log(enterprise_id,"坎坎坷坷");
     //return;


     for(let i=0;i<this.list.length;i++){

        var lists = {
          fittings_id: (this.list[i].fittings_id), 
          name: (this.list[i].name),
          price: (this.list[i].price),
          qty: (this.list[i].quantity), 
          quality: (this.list[i].quality),
          standby_time: (this.list[i].standby_time),
          guarantee: (this.list[i].guarantee),
          remarks_infor: (this.list[i].remarks_infor),
          enterprise_id: enterprise_id
        }

        this.fitting(lists,i)

     }

      if(this.list.length !=0 ){
      console.log(enterprise_id,"卡啦啦啦");

        setTimeout(()=>{
          this.editStatus()
        },this.list.length*300)
        
      }
      
  }

  fitting(json,i){

    setTimeout(()=>{
      this.orderApi.confirmquote(json).then((confirmquote:any)=>{
        console.log(confirmquote)
      })
    },i*300)    
  }

  editStatus(){
    var a = this.orderApi
    this.quoteinfo.quotestatus = "W"
    a.editstatus({ id: this.quoteinfo.id, quotestatus: this.quoteinfo.quotestatus,status: this.quoteinfo.status}).then((editstatus:any)=>{
      console.log(editstatus)
      if(editstatus.code == '0'){

        a.deleteignore({ id: this.quoteinfo.id }).then((deletData:any)=>{
        
         })

          this.router.navigate(['detailsOfQuotedPrice'],{
            queryParams:{
              id: this.quoteinfo.id
            }
          })
        }
    })


    

  }

}