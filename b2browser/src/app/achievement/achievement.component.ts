import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { all } from 'q';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.scss'],
  providers:[InstApi,OrderApi,EnterpriseApi]
})
export class AchievementComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi,
    public enterpriseApi:EnterpriseApi,
  ) { 
    super(router,activeRoute,instApi,enterpriseApi);
  }

  id =''
 
  obj:any = {
    userName: '',
    mobile: '',
    orderno: '',
    start_time: '',
    end_time: ''
  }
  
  order = null

  tempOrder=null

  list = null

  allenterprise=null
  totalMoney = 0


  length = null;
  pageSize = null;
  pages = null;
  newPage = null;
  pageList = [];
  selPage = 1;
  data = null;
  setData = null;


  onMyShow(){

    
      this.enterpriseApi.allenterprise({}).then((allenterprise:any)=>{
        console.log(allenterprise)
        this.allenterprise = allenterprise
      })

    
  }

  reset(){
    this.obj = {
      userName: '',
      mobile: '',
      orderno: '',
      start_time: '',
      end_time: ''
    }

    let toggleBtns = document.getElementsByClassName('toggleBtns')[0].children
    
    toggleBtns[0].classList.add('btn-active')
    for(let k=1;k<toggleBtns.length;k++){
      toggleBtns[k].classList.remove('btn-active')
    }
    this.totalMoney = 0
    this.order = []
    this.pageList = []
    this.length = 0
    this.pagination(this.order,this.length)
    
  }


  search(item){
    this.order = []
    this.totalMoney = 0

    let toggleBtns = document.getElementsByClassName('toggleBtns')[0].children
    
    toggleBtns[0].classList.add('btn-active')
    for(let k=1;k<toggleBtns.length;k++){
      toggleBtns[k].classList.remove('btn-active')
    }

    console.log(toggleBtns)

    console.log(item)
    if(item.userName!='' || item.mobile != ''){

      this.pageList = []
      this.enterpriseApi.allenterprise({ name: item.userName, mobile: item.mobile }).then((allenterprise:any)=>{
        console.log(allenterprise)
      
       
          for(let i=0;i<allenterprise.length;i++){
            console.log(allenterprise[i])

            this.orderApi.mylist({  enterprise_id:allenterprise[i].enterprise_id, employee_id: allenterprise[i].id, orderno: item.orderno}).then((order)=>{
              
              this.tempOrder = order
              let tOrder = []
            
              for(let i=0;i<this.tempOrder.length;i++){
                let index = this.tempOrder[i].order_time.indexOf(' ')

                if(index != -1){
                  this.tempOrder[i].order_time = this.tempOrder[i].order_time.slice(0,index)
                }else {
                  this.tempOrder[i].order_time = this.tempOrder[i].order_time
                }
                console.log(this.tempOrder[i].order_time)
                if(item.start_time <= this.tempOrder[i].order_time){
                  if(item.end_time >= this.tempOrder[i].order_time){
                    tOrder.push(this.tempOrder[i])
                  }else if(item.end_time == ''){
                    tOrder.push(this.tempOrder[i])
                  }
                
                }else if(item.start_time == '' ){

                  if(item.end_time >= this.tempOrder[i].order_time){
                    tOrder.push(this.tempOrder[i])
                  }else if(item.end_time == ''){
                    tOrder.push(this.tempOrder[i])
                  }

                }
              }
              console.log(this.tempOrder)
              console.log(tOrder)
              
              for(let j=0;j<tOrder.length;j++){
                if(tOrder[j].order_status == 'N' ){
                  this.totalMoney +=  parseInt(tOrder[j].totalamount)
                  this.order.push(tOrder[j])
                }

                if(tOrder[j].order_status == 'R'){
                  tOrder[j].order_status_name = '待退款'
                  this.order.push(tOrder[j])
                }

                if(tOrder[j].order_status == 'Y'){
                  this.totalMoney -=  parseInt(tOrder[j].totalamount)
                  tOrder[j].order_status_name = '已退款'
                  this.order.push(tOrder[j])
                }

              }

              for(let k=0;k<this.order.length;k++){
                this.order[k].index = k
              }

              this.length = this.order.length
              this.pagination(this.order,this.length)
              console.log(this.order)
        
            })
  
        }
  
      })

    }else {
      this.pageList = []

      this.orderApi.mylist({  orderno: item.orderno}).then((order)=>{
        
              this.tempOrder = order
              console.log(order)
              let tOrder = []
            
              for(let i=0;i<this.tempOrder.length;i++){
                let index = this.tempOrder[i].order_time.indexOf(' ')

                if(index != -1){
                  this.tempOrder[i].order_time = this.tempOrder[i].order_time.slice(0,index)
                }else {
                  this.tempOrder[i].order_time = this.tempOrder[i].order_time
                }
                console.log(this.tempOrder[i].order_time)
                if(item.start_time <= this.tempOrder[i].order_time ){
                  if(item.end_time >= this.tempOrder[i].order_time){
                    tOrder.push(this.tempOrder[i])
                  }else if(item.end_time == ''){
                    tOrder.push(this.tempOrder[i])
                  }
                }else if(item.start_time == '' ){

                  if(item.end_time >= this.tempOrder[i].order_time){
                    tOrder.push(this.tempOrder[i])
                  }else if(item.end_time == ''){
                    tOrder.push(this.tempOrder[i])
                  }

                }
              }

              for(let j=0;j<tOrder.length;j++){
                if(tOrder[j].order_status == 'N' ){
                  this.totalMoney += tOrder[j].totalamount
                  this.order.push(tOrder[j])
                }

                if(tOrder[j].order_status == 'R'){
                  tOrder[j].order_status_name = '待退款'
                  this.order.push(tOrder[j])
                }

                if(tOrder[j].order_status == 'Y'){
                  this.totalMoney -= tOrder[j].totalamount
                  tOrder[j].order_status_name = '已退款'
                  this.order.push(tOrder[j])
                }

              }

              for(let k=0;k<this.order.length;k++){
                this.order[k].index = k
              }

              this.length = this.order.length
              this.pagination(this.order,this.length)
              console.log(this.order)

      })

    }

   
  }


  myAll(event){
    console.log(this.order)
    this.pageList = []

    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    for(let i=1;i<others.length;i++){
      others[i].classList.remove('btn-active')
    }

    if(this.order != null){

      this.order = this.order
      this.length = this.order.length
      this.pagination(this.order,this.length)
      console.log(this.order)

    }
   
  }

  myfinish(event){
    console.log(this.order)
    this.pageList = []

    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    for(let i=2;i<others.length;i++){
      others[i].classList.remove('btn-active')
    }
    others[0].classList.remove('btn-active')

    if(this.order != null){
      let finOrder = this.order.filter((item)=>{
        return item.order_status == 'N'
      })

      for(let k=0;k<finOrder.length;k++){
        finOrder[k].index = k
      }
  
      this.length = finOrder.length
      this.pagination(finOrder,this.length)
  
      console.log(finOrder)
  
    }

  
  }

  myreturn(event){
    this.pageList = []
    
    console.log(this.order)

    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    for(let i=0;i<others.length-2;i++){
      others[i].classList.remove('btn-active')
    }
    others[others.length-1].classList.remove('btn-active')

    if(this.order != null){
      let reOrder = this.order.filter((item)=>{
        return item.order_status == 'R'
      })

      for(let k=0;k<reOrder.length;k++){
        reOrder[k].index = k
      }
      
      this.length = reOrder.length
      this.pagination(reOrder,this.length)
      console.log(reOrder)
  
    }
 
   
  }

  myyitui(event){
    console.log(this.order)
    this.pageList = []

    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    for(let i=0;i<others.length-1;i++){
      others[i].classList.remove('btn-active')
    }


    if(this.order != null){
      let yiOrder = this.order.filter((item)=>{
        return item.order_status == 'Y'
      })

      
      for(let k=0;k<yiOrder.length;k++){
        yiOrder[k].index = k
      }
      

      this.length = yiOrder.length
      this.pagination(yiOrder,this.length)
      console.log(yiOrder)
    }

    

  }



  pagination(list,length){
    this.pageSize = 10;
    // if()
    this.pages = Math.ceil( length/this.pageSize )
    this.newPage = this.pages > 10 ? 10 : this.pages;
    this.selPage = 1;
    
    this.setData = function(){
      this.data = list.slice(this.pageSize*(this.selPage-1),this.pageSize*this.selPage);
    }
    this.data = list.slice(0, this.pageSize);


    for (var i = 0; i < this.newPage; i++) {
       this.pageList.push(i + 1);
     }

  }

  selectPage(page) {
      if (page < 1 || page > this.pages) return;
     
      if (page > 2) {
          var newpageList = [];
          for (var i = (page - 3) ; i < ((page + 2) > this.pages ? this.pages : (page + 2)) ; i++) {
              newpageList.push(i + 1);
          }
          this.pageList = newpageList;
      }
      this.selPage = page;
      this.setData();
      this.isActivePage(page);
  }

  isActivePage(page){
    return this.selPage == page;
  }


  Previous() {
    this.selectPage(this.selPage - 1);
  }

  Next () {
    this.selectPage(this.selPage + 1);
  }

  fristPage(){
    this.selectPage(this.selPage = 1)
  }

  lastPage(){
    this.selectPage(this.selPage = this.pages)
  }

}
