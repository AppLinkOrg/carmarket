import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss'],
  providers:[InstApi,OrderApi,EnterpriseApi]
})
export class OrderManagementComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi: OrderApi,
    public enterpriseApi: EnterpriseApi,
  ) { 
    super(router,activeRoute,instApi);
  }



  list = [];
  operation='A'
  isshow = true;

  length = null;

  pageSize = null;
  pages = null;
  newPage = null;
  pageList = [];
  selPage = 1;
  data = [];
  setData = null;

  getstatus = null;
  order_time_dateformat = null
  month_time = null

  enterprise_id=''
  employee_id=''
 
  onMyShow(){

    var a = this.orderApi

    this.activeRoute.queryParams.subscribe(query=>{
     
      this.getstatus = query.stauts
      this.order_time_dateformat = query.order_time_dateformat
      this.month_time = query.month_time
      console.log(this.getstatus)
      console.log(this.order_time_dateformat)
      console.log(this.month_time)

      this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{
        console.log(employeeinfo,'000')
        this.enterprise_id = employeeinfo.enterprise_id

        // if(employeeinfo.power == 'Y'){
        //   console.log('aaa')
        //   this.employee_id = ''
        // }else{
        //   console.log('bb')
        //   this.employee_id = employeeinfo.id
        // }
       

        a.mylist({ enterprise_id: this.enterprise_id,employee_id: this.employee_id }).then((mylist:any)=>{
          console.log(mylist)
         
          this.list = []
          this.pageList = []
          for(let j=0;j<mylist.length;j++){
            if(mylist[j].order_status != 'R' && mylist[j].order_status != 'Y'){
  
              var lists = []
              lists.push(mylist[j])
  
              this.pageList = []
             
  
              if(this.getstatus != undefined || this.order_time_dateformat != undefined || this.month_time != undefined){
                this.pageList = []
                
                
                for(let i=0;i<lists.length;i++){
                  this.pageList = []
  
                  let index = lists[i].order_time.indexOf('-')
                  lists[i].order_time = lists[i].order_time.substring(0,index+3)
  
                  if(this.getstatus == lists[i].order_status || this.order_time_dateformat == lists[i].order_time_dateformat || this.month_time == lists[i].order_time){
                   
                    // this.pageList = []
                    // this.list = []
                    this.list.push(lists[i])
                  }
                 
                }
  
                for(let i=0;i<this.list.length;i++){
                  this.list[i].index = i
                }
      
                this.length = this.list.length
                this.pagination(this.list,this.length)
               
              }else {
              
      
                this.list.push(mylist[j])
                
                for(let i=0;i<this.list.length;i++){
                  this.list[i].index = i
                }
  
                this.length = this.list.length
                console.log(this.list)
             
                this.pagination(this.list,this.length)
              }
               
              
  
            }
          
          }
          
          
        })


      })

     
     

    })


  }

  


    // 全部
    allGoos(event){
     
      this.pageList = []
      this.length = null
      this.operation = 'A'
      this.isshow = true
      this.getstatus = null;
      this.order_time_dateformat = null
      this.month_time = null
      

      var others = event.target.parentElement.children
    
      for(let i=1;i<others.length;i++){
        others[i].classList.remove('btn-active')
      }
      event.target.classList.add('btn-active')

      this.list = this.list
      this.length = this.list.length
      this.pagination(this.list,this.length)

    }

    // 待发货
    returnGoods(event){
     
      this.pageList = []
      this.length = []
      this.operation = 'R'
      this.isshow = false

      event.target.classList.add('btn-active')
      var others = event.target.parentElement.children
      for(let i=2;i<others.length;i++){
        others[i].classList.remove('btn-active')
      }
      others[0].classList.remove('btn-active')
   
      if(this.list!=null){
        let reGoods = this.list.filter((itme)=>{
          return itme.order_status=='L'
        })

        for(let k=0;k<reGoods.length;k++){
          reGoods[k].index = k
        }
        this.length = reGoods.length
        this.pagination(reGoods,this.length)

      }
      


    }

    // 待收货
    receiveGoods(event){
     
      this.pageList = []
      this.operation = 'S'
      this.isshow = false

      event.target.classList.add('btn-active')
      var others = event.target.parentElement.children
      for(let i=3;i<others.length;i++){
        others[i].classList.remove('btn-active')
      }
      others[0].classList.remove('btn-active')
      others[1].classList.remove('btn-active')

  
      if(this.list!=null){
        let reGoods = this.list.filter((itme)=>{
          return itme.order_status=='M'
        })

        for(let k=0;k<reGoods.length;k++){
          reGoods[k].index = k
        }
        this.length = reGoods.length
        this.pagination(reGoods,this.length)

      }

    }

      //已完成
    finish(event){
     
      this.pageList = []
      this.operation = 'A'
      this.isshow = false

      event.target.classList.add('btn-active')
      var others = event.target.parentElement.children
      for(let i=4;i<others.length;i++){
        others[i].classList.remove('btn-active')
      }
      others[0].classList.remove('btn-active')
      others[1].classList.remove('btn-active')
      others[2].classList.remove('btn-active')


      if(this.list!=null){
        let reGoods = this.list.filter((itme)=>{
          return itme.order_status=='N'
        })

        for(let k=0;k<reGoods.length;k++){
          reGoods[k].index = k
        }
        this.length = reGoods.length
        this.pagination(reGoods,this.length)

      }

    }

      // 已取消
    cancel(event){
      this.pageList = []
      this.operation = 'A'
      this.isshow = false

      event.target.classList.add('btn-active')
      var others = event.target.parentElement.children
      for(let i=0;i<others.length-2;i++){
        others[i].classList.remove('btn-active')
      }
      others[others.length-1].classList.remove('btn-active')


      if(this.list!=null){
        let reGoods = this.list.filter((itme)=>{
          return itme.order_status=='E'
        })

        for(let k=0;k<reGoods.length;k++){
          reGoods[k].index = k
        }
        this.length = reGoods.length
        this.pagination(reGoods,this.length)

      }

    }

    waiting(event){
     
      this.pageList = []
      this.operation = 'W'
      this.isshow = false

      event.target.classList.add('btn-active')
      var others = event.target.parentElement.children
      for(let i=0;i<others.length-1;i++){
        others[i].classList.remove('btn-active')
      }

      

      if(this.list!=null){
        let reGoods = this.list.filter((itme)=>{
          return itme.order_status=='W'
        })

        for(let k=0;k<reGoods.length;k++){
          reGoods[k].index = k
        }
        this.length = reGoods.length
        this.pagination(reGoods,this.length)

      }

    }


  tiaozhuan(itemId){
    this.router.navigate(['sendGoodsDetail'],{
      queryParams: {
        id: itemId
      }
    })
  }

  tiaozhuan2(itemId){
    this.router.navigate(['receiveGoodsDetail'],{
      queryParams: {
        id: itemId
      }
    })
  }

  tiaozhuan3(itemId){
    this.router.navigate(['finishDetail'],{
      queryParams: {
        id: itemId
      }
    })
  }

  tiaozhuan4(itemId){
    this.router.navigate(['cancelDetail'],{
      queryParams: {
        id: itemId
      }
    })
  }

  tiaozhuan5(itemId){
    this.router.navigate(['waiting'],{
      queryParams: {
        id: itemId
      }
    })
  }


  detailStatus(item){
   
    if(item.order_status_name == '待发货'){

      this.tiaozhuan(item.id);

    }else if(item.order_status_name == '待收货'){

      this.tiaozhuan2(item.id)

    }else if(item.order_status_name == '已完成'){

      this.tiaozhuan3(item.id) 

    }else if(item.order_status_name == '已取消'){

      this.tiaozhuan4(item.id);

    }else if(item.order_status_name == '待付款'){

      this.tiaozhuan5(item.id);

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
  };

  Next () {
    this.selectPage(this.selPage + 1);
  };

  fristPage(){
    this.selectPage(this.selPage = 1)
  }

  lastPage(){
    this.selectPage(this.selPage = this.pages)
  }


}