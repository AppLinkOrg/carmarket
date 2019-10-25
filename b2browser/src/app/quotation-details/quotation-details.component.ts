import { Component, OnInit, Input,ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';

@Component({
  selector: 'app-quotation-details',
  templateUrl: './quotation-details.component.html',
  styleUrls: ['./quotation-details.component.scss'],
  providers:[InstApi,OrderApi,EnterpriseApi]
})
export class QuotationDetailsComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi,
    public enterpriseApi:EnterpriseApi,
    public el: ElementRef,
  ) { 
    super(router,activeRoute,instApi,enterpriseApi);
  }


  quoteinfo=null;
  id='';

  list=[];
  fittinglist=[];
 

  addConfir = false;
  employee_id=''
  employee_id_name = ''
  enterprise_id_name=''


  onMyShow(){

    var a = this.orderApi

    
    this.activeRoute.queryParams.subscribe(queryParams=>{
      console.log(queryParams)
      this.id = queryParams.id
    
      this.employee_id=queryParams.employee_id
      this.employee_id_name = queryParams.employee_id_name
      this.enterprise_id_name = queryParams.enterprise_id_name

      a.quotationdetail({ id: this.id,quote_id: queryParams.quote_id }).then((quoteinfo:any)=>{
      
        this.quoteinfo = quoteinfo;
        // this.quoteinfo.employee_id = this.employee_id
        // this.quoteinfo.employee_id_name = this.employee_id_name
        // this.quoteinfo.enterprise_id_name = this.enterprise_id_name

        this.fittinglist = quoteinfo.fittingsitem;
        for(let i=0;i<quoteinfo.fittingsitem.length;i++){
          if(quoteinfo.fittingsitem[i].quoteitems.length != 0){
       
            quoteinfo.fittingsitem[i].quoteitems = []

          }
          quoteinfo.fittingsitem[i].photoLen=0
          if(quoteinfo.fittingsitem[i].photo1!='' && quoteinfo.fittingsitem[i].photo1!="undefined"){
            quoteinfo.fittingsitem[i].photoLen ++
          }
          if(quoteinfo.fittingsitem[i].photo2!='' && quoteinfo.fittingsitem[i].photo2!="undefined"){
            quoteinfo.fittingsitem[i].photoLen ++
          }
          if(quoteinfo.fittingsitem[i].photo3!='' && quoteinfo.fittingsitem[i].photo3!="undefined"){
            quoteinfo.fittingsitem[i].photoLen ++
          }
          if(quoteinfo.fittingsitem[i].photo4!='' && quoteinfo.fittingsitem[i].photo4!="undefined"){
            quoteinfo.fittingsitem[i].photoLen ++
          }
          if(quoteinfo.fittingsitem[i].photo5!='' && quoteinfo.fittingsitem[i].photo5!="undefined"){
            quoteinfo.fittingsitem[i].photoLen ++
          }

        }

        for(let j=0;j<this.fittinglist.length;j++){
          this.fittinglist[j].price = ''
        }

        console.log(this.quoteinfo,'quoteinfo')
        console.log(this.fittinglist,'fittinglist')
       
      })

    })
    

    

  }


  tianxie = false
  addQuote(item){
    console.log(item)

    this.tianxie = false
    
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
      partnubmer:item.partnubmer,
      quantity: item.quantity,
      quality: item.quality,
      standby_time: item.standby_time,
      guarantee: item.guarantee,
      price: item.price,
      Sprice:item.Sprice,
      sendcar_time: item.sendcar_time,
      count: item.count
    }

  
    for(let key in addList){
      if(addList[key] == ''){
        this.tianxie = true
        return
      }
    }

      item.quality = ''
      item.standby_time = ''
      item.guarantee = ''
      item.price = ''
      item.sendcar_time = ''

   
    if(addList.price !=0 ){

      for(var j=0;j<this.fittinglist.length;j++){

          if(this.fittinglist[j].id==item.id){
              this.fittinglist[j].quoteitems.push(addList)
              this.fittinglist[j].count = addList.count
          }
      }

      this.list.push(addList)
      
    }
    console.log(this.list)

  }

  photoshow = false 
  imgs = []
  showPhoto(item){
    this.imgs = []
    this.photoshow = true 
    console.log(item)

    this.imgs.push(item)

    this.imgs = this.imgs.filter((item,index)=>{
      if(item.photo1=="" && item.photo2 !=""){
        item.photo1 = item.photo2
        item.photo2 = ""
      }
      if(item.photo1=="" && item.photo2 =="" && item.photo3!=""){
        item.photo1 = item.photo3
        item.photo3 = ""
      }
      if(item.photo1=="" && item.photo2 =="" && item.photo3=="" && item.photo4 !=""){
        item.photo1 = item.photo4
        item.photo4 = ""
      }
      if(item.photo1=="" && item.photo2 =="" && item.photo3=="" && item.photo4 =="" && item.photo5 !=""){
        item.photo1 = item.photo5
        item.photo5 = ""
      }
      return item
    })

    console.log(this.imgs)

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

     console.log(this.list,'444')

     for(let i=0;i<this.list.length;i++){

        var lists = {
          fittings_id: (this.list[i].fittings_id), 
          partnubmer: (this.list[i].partnubmer),
          name: (this.list[i].name),
          price: (this.list[i].price),
          Sprice: (this.list[i].Sprice),
          qty: (this.list[i].quantity), 
          quality: (this.list[i].quality),
          standby_time: (this.list[i].standby_time),
          guarantee: (this.list[i].guarantee),
          sendcar_time: (this.list[i].sendcar_time),
          enterprise_id: enterprise_id,
          employee_id: this.employee_id,
        }
        console.log(this.employee_id,'aaaa')

        this.fitting(lists,i)

     }

      if(this.list.length !=0 ){
      console.log(enterprise_id,"卡啦啦啦");

        setTimeout(()=>{
          this.editStatus(enterprise_id)
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

  editStatus(enterprise_id){

    // let date = new Date()
    // let year = date.getFullYear()
    // let month = date.getMonth() + 1
    // let day = date.getDay()
    

    // let nowtime = year + '-' + month + '-' + day 
    // let end_time = year + '-' + month + '-' + day +7

    // console.log(nowtime,end_time)

    var date1 = new Date();
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + 7);
    console.log(date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate());
    console.log(date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate());

    var a = this.orderApi
    this.quoteinfo.quotestatus = "W"
    this.quoteinfo.quoteemployee_id = this.employee_id
    this.quoteinfo.quoteenterprise_id = enterprise_id
    // this.quoteinfo.quote_id = this.id
    this.quoteinfo.yiquoted_time = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + (date1.getDate()) +" "+ (date1.getHours()) + ":" + (date1.getMinutes())
    this.quoteinfo.expired_time = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate() +" "+ (date2.getHours()) + ":" + (date2.getMinutes())
    console.log(this.quoteinfo)

    a.editquote({id:this.quoteinfo.quote_id,quotestatus:"W"}).then((editquote:any)=>{
      if(editquote.code=='0'){
        console.log(this.quoteinfo,'llllllll')
        a.addexpired(this.quoteinfo).then((addexpired:any)=>{
          console.log(addexpired)
          if(addexpired.code == '0'){
    
            a.deleteignore({ quote_id: this.quoteinfo.quote_id,quoteenterprise_id:enterprise_id,status:'D' }).then((deletData:any)=>{
                console.log(deletData,'deletData')
             })
    
              this.router.navigate(['detailsOfQuotedPrice'],{
                queryParams:{
                  quote_id: this.quoteinfo.quote_id
                }
              })
            }
        })
      }
     

    })

   


  }

}