import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { all } from 'q';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';

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
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
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
  temporder=null;

  onMyShow(){
    let oldtime = (new Date()).getTime() + 6*60*60*1000;
    window.localStorage.setItem('oldtime',oldtime.toString())
      this.getmsg();
      

      
  }

  getmsg(){
    console.log(this.operatorinfo.enterprise_id)
    this.enterpriseApi.allenterprise({enterprise_id:this.params.enterprise_id}).then((allenterprise:any)=>{
      console.log(allenterprise)
      this.allenterprise = allenterprise;
      // for(var i=0;i<allenterprise.length;i++){
        
        this.orderApi.mylist({  enterprise_id:this.params.enterprise_id,orderby:'r_main.orderno desc'}).then((order:any)=>{
          console.log(order,'order');

          
          this.pageList=[];
          this.order = order.filter((item,idx)=>{
            if(item.order_status=='N' || item.order_status == 'Y' || item.order_status=='R') {
              this.totalMoney += parseFloat(item.totalamount);
              item.index = idx;
              item.order_status_name = '已完成';
              return item
            }
           
          });
         
          this.temporder=order;
         
          console.log(this.order,'ooo');
          console.log(this.totalMoney);
          this.getreturnorder();
        })
      // }
     
    })
  }
  returnlist
  getreturnorder(){
    
      this.orderApi.returnlist({gongsi:this.params.enterprise_id}).then((returnlist:any)=>{
          console.log(returnlist)
          this.returnlist = returnlist.filter((item)=>{
            this.totalMoney -= parseFloat(item.return_money);
            if(item.orderstatus=='Y' || item.orderstatus=='R'){
              item.order_status_name = item.orderstatus_name;
              item.orderno=item.order_orderno;
              item.receiver=item.order_receiver;
              item.finish_time=item.return_time;
              item.totalamount=item.return_money;
              this.order.push(item)
            }
            return item
          })
          for(var i=0;i<this.order.length;i++){
            this.order[i].index=i;
          }
          this.length = this.order.length;
          this.pagination(this.order,this.length);
          console.log(this.totalMoney,'lll')
      })  
    
  }

  reset(){
    this.obj = {
      userName: '全部',
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
    // this.totalMoney = 0
    // this.order = []
    // this.pageList = []
    // this.length = 0
    // this.pagination(this.order,this.length)
    this.getmsg();
    
  }

  checkorderno(item,arr){
    for(let iitem of arr){
      if(item.orderno == iitem.order_orderno){
        this.totalMoney -= parseFloat(iitem.return_money);
      }
    }
  }
  checklist(item,arr){
    for(let iitem of arr){
      if(item.order_id==iitem.id){
        return true;
      }
    }
  }
  search(item){
    this.returnlist=[];
    this.order = []
    this.totalMoney = 0

    let toggleBtns = document.getElementsByClassName('toggleBtns')[0].children
    
    toggleBtns[0].classList.add('btn-active')
    for(let k=1;k<toggleBtns.length;k++){
      toggleBtns[k].classList.remove('btn-active')
    }

    console.log(toggleBtns);
    if(item.userName=='全部'){
      this.getmsg();
    }

    console.log(item)
    if(item.userName!='' || item.mobile != ''){

      this.pageList = []
      this.enterpriseApi.allenterprise({ name: item.userName, mobile: item.mobile }).then((allenterprise:any)=>{
        console.log(allenterprise,'ppp')
      
       
          for(let i=0;i<allenterprise.length;i++){
            console.log(allenterprise[i],'lll')
            
           

            this.orderApi.mylist({  enterprise_id:allenterprise[i].enterprise_id, employee_id: allenterprise[i].id, orderno: item.orderno}).then((order)=>{
              

              this.orderApi.returnlist({gognsi:allenterprise[i].enterprise_id,baojia:allenterprise[i].id}).then((returnlist:any)=>{
                 
              

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
                 
                  this.order.push(tOrder[j])
                }

                if(tOrder[j].order_status == 'R'){
                  tOrder[j].order_status_name = '待退款'
                  this.order.push(tOrder[j])
                }

                if(tOrder[j].order_status == 'Y'){
                 
                  tOrder[j].order_status_name = '已退款'
                  this.order.push(tOrder[j])
                }

              }


              for(let reitem of returnlist){
                if(this.checklist(reitem,this.order)){
                    
                    reitem.order_status_name = reitem.orderstatus_name;
                    reitem.orderno=reitem.order_orderno;
                    reitem.receiver=reitem.order_receiver;
                    reitem.finish_time=reitem.return_time;
                    reitem.totalamount=reitem.return_money;
                    this.returnlist.push(reitem);
                }
              }

              for(let k=0;k<this.order.length;k++){
                // this.order[k].index = k;
                this.totalMoney += parseFloat(this.order[k].totalamount);

                 this.checkorderno(this.order[k],this.returnlist)
                 
              }

              this.order = this.order.concat(this.returnlist);
              for(let k=0;k<this.order.length;k++){
                this.order[k].index = k;
              }

              this.length = this.order.length
              this.pagination(this.order,this.length)
              console.log(this.order,'ooo')
        
            })
          })
        }
  
      })

    }else {
      this.pageList = []

      this.orderApi.mylist({  orderno: item.orderno}).then((order)=>{
        this.orderApi.returnlist({}).then((returnlist:any)=>{
          console.log(returnlist,'return')
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
                 
                  this.order.push(tOrder[j])
                }

                if(tOrder[j].order_status == 'R'){
                  tOrder[j].order_status_name = '待退款'
                  this.order.push(tOrder[j])
                }

                if(tOrder[j].order_status == 'Y'){
                  
                  tOrder[j].order_status_name = '已退款'
                  this.order.push(tOrder[j])
                }


                for(let reitem of returnlist){
                  if(this.checklist(reitem,this.order)){
                      
                      reitem.order_status_name = reitem.orderstatus_name;
                      reitem.orderno=reitem.order_orderno;
                      reitem.receiver=reitem.order_receiver;
                      reitem.finish_time=reitem.return_time;
                      reitem.totalamount=reitem.return_money;
                      this.returnlist.push(reitem);
                  }
                }
              }

              for(let k=0;k<this.order.length;k++){
                // this.order[k].index = k;
                this.totalMoney += parseFloat(this.order[k].totalamount);

                this.checkorderno(this.order[k],this.returnlist)
              }

              this.order = this.order.concat(this.returnlist);
              for(let k=0;k<this.order.length;k++){
                this.order[k].index = k;
              }

              this.length = this.order.length
              this.pagination(this.order,this.length)
              console.log(this.order,'1111')

      })
    })

    }

   
  }

bb=false
  myAll(event){
    console.log(this.order)
    this.pageList = []
    this.bb=false
    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    for(let i=1;i<others.length;i++){
      others[i].classList.remove('btn-active')
    }

    if(this.order != null){
      let finOrder = this.order.filter((item)=>{
        if(item.order_status == 'N' || item.order_status == 'Y' || item.order_status == 'R'){
          item.order_status_name='已完成';
          return item
        }
         
      })

      this.returnlist.filter((item)=>{
        if(item.orderstatus == 'Y' || item.orderstatus == 'R'){
          item.order_status_name=item.orderstatus_name;
          finOrder.push(item);
        }
        
      })

      for(let k=0;k<finOrder.length;k++){
        finOrder[k].index = k;
      }

      this.order = finOrder
      this.length = this.order.length
      this.pagination(this.order,this.length)
      console.log(this.order)

    }
   
  }

  myfinish(event){
    console.log(this.order)
    this.pageList = []
    this.bb=false
    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    for(let i=2;i<others.length;i++){
      others[i].classList.remove('btn-active')
    }
    others[0].classList.remove('btn-active')

    if(this.order != null){
      let finOrder = this.order.filter((item)=>{
        return item.order_status == 'N' || item.order_status == 'Y' || item.order_status == 'R'
      })

      for(let k=0;k<finOrder.length;k++){
        finOrder[k].index = k;
        finOrder[k].order_status_name = '已完成';
      }
  
      this.length = finOrder.length
      this.pagination(finOrder,this.length)
  
      console.log(finOrder)
  
    }

  
  }

  myreturn(event){
    this.pageList = []
    this.bb=true
    console.log(this.order)

    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    for(let i=0;i<others.length-2;i++){
      others[i].classList.remove('btn-active')
    }
    others[others.length-1].classList.remove('btn-active')

    if(this.order != null){
      let reOrder = this.returnlist.filter((item)=>{
        return item.orderstatus == 'R'
      })

      for(let k=0;k<reOrder.length;k++){
        reOrder[k].index = k;
        reOrder[k].orderno=reOrder[k].order_orderno;
        reOrder[k].receiver=reOrder[k].order_receiver;
        reOrder[k].finish_time=reOrder[k].return_time;
        reOrder[k].totalamount=reOrder[k].return_money;
        reOrder[k].order_status_name='待退款';
      }
      
      this.length = reOrder.length
      this.pagination(reOrder,this.length)
      console.log(reOrder)
  
    }
 
   
  }

  myyitui(event){
    console.log(this.order)
    this.pageList = []
    this.bb=true;
    event.target.classList.add('btn-active')
    var others = event.target.parentElement.children
    for(let i=0;i<others.length-1;i++){
      others[i].classList.remove('btn-active')
    }


    if(this.order != null){
      let yiOrder = this.returnlist.filter((item)=>{
        return item.orderstatus == 'Y'
      })

      
      for(let k=0;k<yiOrder.length;k++){
        yiOrder[k].index = k;
        yiOrder[k].orderno=yiOrder[k].order_orderno;
        yiOrder[k].receiver=yiOrder[k].order_receiver;
        yiOrder[k].finish_time=yiOrder[k].return_time;
        yiOrder[k].totalamount=yiOrder[k].return_money;
        yiOrder[k].order_status_name='已退货';
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
