import { Component, OnInit, Input } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { TabHeadingDirective } from 'ngx-bootstrap/tabs/public_api';

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
  count=1;

  data = [];
  obj = [];
  addConfir = false;


  obj1=[];
  obj2=[];
  obj3=[]
  

  onMyShow(){
    
    this.activeRoute.queryParams.subscribe(queryParams=>{
      this.id = queryParams.id
    })
    var a = this.orderApi
    a.quoteinfo({ id: this.id }).then((quoteinfo:any)=>{

      this.quoteinfo = quoteinfo;
      this.list = quoteinfo.quoteitems;
      console.log(quoteinfo)

    })

    

  }


  addQuote(item){

    item.count = 2   
    
    var addList = {
      quantity: item.quantity,
      quality: item.quality,
      standby_time: item.standby_time,
      guarantee: item.guarantee,
      price: item.price,
      remarks_infor: item.remarks_infor
    }

    for(var i=0;i<this.obj.length;i++){
      if(item.id == this.obj[i].id){
        item.count ++;
      }
    }

    this.data.push({
      id: i,
      addlist: addList
    })
    this.obj.push(item)
    console.log(this.data)


    for(let i=0;i<this.data.length;i++){
      if(item.id != this.data[i].id){
        this.obj1 = this.data[i]
      }
    }
  }

  deleteQuote(item){
    console.log(item)
    // for(let i=0;i<this.data.length;i++){
    //   if(item.id == this.data[i].id){
    //     delete this.data[i]
    //     item.count --;
    //   }
    // }

  }





  saveQuote(){
  
     for(let i=0;i<this.list.length;i++){

        var lists = {
          fittings_id: (this.list[i].quote_id), 
          price: (this.list[i].price),
          qty: (this.list[i].quantity), 
          quality: (this.list[i].quality),
          standby_time: (this.list[i].standby_time),
          guarantee: (this.list[i].guarantee),
          remarks_infor: (this.list[i].remarks_infor) 
        }

        this.fitting(lists,i)



       

     }

     if(lists.price !=0 ){
        
      }
      // if(this.addConfir = true){
      // }
      this.editStatus()
      
  }

  fitting(json,i){

    setTimeout(()=>{
      this.orderApi.confirmquote(json).then((confirmquote:any)=>{
        
          // console.log(confirmquote)
      })
    },i*300)    
  }

  editStatus(){
    this.quoteinfo.quotestatus = "W"
    this.orderApi.editstatus({ id: this.quoteinfo.id, quotestatus: this.quoteinfo.quotestatus,status: this.quoteinfo.status }).then((editstatus:any)=>{
        console.log(editstatus)
        // if(editstatus.code == '0'){
        //   this.router.navigateByUrl('quotationCenter');
        // }else {
        //   console.error('csada');

        // }
       
    })
  }

}