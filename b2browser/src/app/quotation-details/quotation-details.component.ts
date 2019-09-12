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
  fittinglist=[];
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
      this.fittinglist = quoteinfo.quoteitems;
     
      console.log(this.fittinglist)
    })

    

  }


  addQuote(item){

 
    item.count = 2   
   
    var addList = {
      type_id: item.id,
      name: item.name,
      quantity: item.quantity,
      quality: item.quality,
      standby_time: item.standby_time,
      guarantee: item.guarantee,
      price: item.price,
      remarks_infor: item.remarks_infor,
      count: item.count
    }
    console.log(this.fittinglist)



    var arr = []
  
     for(var j=0;j<this.fittinglist.length;j++){

          console.log(addList)


                if(this.fittinglist[j].id!=item.id){


                  arr.push([this.fittinglist[i]]);

                  // this.fittinglist[j].push(
                  //   addList
                  // )

                }
                
          console.log(this.fittinglist)

              }

    // this.fittinglist[item.id].push(
    //   addList
    // )
     console.log(arr,"上看看扩扩");

    for(var i=0;i<this.list.length;i++){
      if(item.id == this.list[i].id){
        item.count ++;
      }
    }

    if(addList.price !=0 ){

      this.data.push({
        addlist: addList
      })

      this.list.push(addList)

    }

    console.log(this.data)
   
    // console.log(this.list)

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
          fittings_id: (this.list[i].id), 
          name: (this.list[i].name),
          price: (this.list[i].price),
          qty: (this.list[i].quantity), 
          quality: (this.list[i].quality),
          standby_time: (this.list[i].standby_time),
          guarantee: (this.list[i].guarantee),
          remarks_infor: (this.list[i].remarks_infor) 
        }

        this.fitting(lists,i)

     }

      if(this.list.length !=0 ){
      
        setTimeout(()=>{
          this.editStatus()
        },this.list.length*300)
        
      }
      
  }

  fitting(json,i){

    setTimeout(()=>{
      this.orderApi.confirmquote(json).then((confirmquote:any)=>{
        
      })
    },i*300)    
  }

  editStatus(){
    var a = this.orderApi
    this.quoteinfo.quotestatus = "W"
    a.editstatus({ id: this.quoteinfo.id, quotestatus: this.quoteinfo.quotestatus,status: this.quoteinfo.status }).then((editstatus:any)=>{
      if(editstatus.code == '0'){

        a.deleteignore({ id: this.quoteinfo.id }).then((deletData:any)=>{
          console.log(deletData)
         })

        
          console.log('bfaj')
          this.router.navigateByUrl('quotationCenter');
        }
    })


    

  }

}