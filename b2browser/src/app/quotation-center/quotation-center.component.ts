import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';

@Component({
  selector: 'app-quotation-center',
  templateUrl: './quotation-center.component.html',
  styleUrls: ['./quotation-center.component.scss'],
  providers:[InstApi,OrderApi,EnterpriseApi]
})
export class QuotationCenterComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi,
    public enterpriseApi:EnterpriseApi,
  ) { 
    super(router,activeRoute,instApi);
  }

    list=[];
    list2=[];
    ignore=null;

    length = null;

    pageSize = null;
    pages = null;
    newPage = null;
    pageList = [];
    selPage = 1;
    data = null;
    setData = null;

    isquote = false;
    isshow = true

    enterprise_id = ''
    employee_id = ''

  onMyShow(){


    var a=this.orderApi;

    this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{
      console.log(employeeinfo)
      this.enterprise_id = employeeinfo.enterprise_id
      this.employee_id = employeeinfo.id
    })

    a.quotelist({ }).then((list:any)=>{
      this.list = list

      for(let i=0;i<this.list.length;i++){
        this.list[i].index = i
      }

      this.length = this.list.length;
      this.pagination(this.list,this.length);

    
      console.log(this.list,this.length)
    });

      
     
  }

  


  ignoreHandle(item){
    this.list = [];
    this.pageList = [];
    item.quote_id = item.id
    item.ignorestatus = 'Y'
    item.employee_id = this.employee_id
  
    
      this.orderApi.searchignore(item).then((searchignore:any)=>{
   
        if(searchignore.code == "0"){

          var a=this.orderApi;

          a.ignore({ employee_id: this.employee_id }).then((ignore:any)=>{
            // this.ignore = ignore
          
            
              if(ignore.length == 0){

                a.quotelist({ }).then((list:any)=>{
                  for(let item of list){
                    if(item.quotestatus == 'Q'){
                      this.list.push(item)
                    }
                  
                  }

                  for(let i=0;i<this.list.length;i++){
                    this.list[i].index = i
                  }

                  this.length = this.list.length;
                  this.pagination(this.list,this.length);
              
              });

              }else {

                a.quotelist({ }).then((list:any)=>{

                  var result=[];
                  for(let item of list){
                    if(item.quotestatus === 'Q'){
                      if(this.notinignore(item,ignore)){
                        result.push(item);
                      }
                    }
                    
                  }

                  this.list=result;

                  for(let i=0;i<this.list.length;i++){
                    this.list[i].index = i
                  }

                  this.length = this.list.length;
                  this.pagination(this.list,this.length);

              });
              }
              
          })
          
        }
      })
    
  }



  // 待报价
  quoteHandle(event){
    this.list = [];
    this.pageList = [];
    this.isquote = true;
    this.isshow = false
    
    
    event.target.classList.add('btn-active')
    let others = event.target.parentElement.childNodes

    for(let i=2;i<others.length;i++){
      others[i].classList.remove('btn-active')
    }
    others[0].classList.remove('btn-active')

    var a=this.orderApi;

    a.ignore({ employee_id: this.employee_id }).then((ignore:any)=>{
      // this.ignore = ignore
      console.log(ignore,'llll')
      console.log(ignore)


        if(ignore.length == 0){

          a.quotelist({ }).then((list:any)=>{
            for(let item of list){
              if(item.quotestatus == 'Q'){
                this.list.push(item)
              }
            }

            for(let i=0;i<this.list.length;i++){
              this.list[i].index = i
            }

            this.length = this.list.length;
            this.pagination(this.list,this.length);
         
         });

        }else {

          a.quotelist({ }).then((list:any)=>{

            var result=[];
            for(let item of list){
              if(item.quotestatus === 'Q'){
                if(this.notinignore(item,ignore)){
                  result.push(item);
                 }
              }
              
            }



            this.list=result;

            for(let i=0;i<this.list.length;i++){
              this.list[i].index = i
            }

            this.length = this.list.length;
            this.pagination(this.list,this.length);

         });
        }
        
    })


  }

  notinignore(item,ignore){
    for(let igitem of ignore){
      if(item.id==igitem.quote_id){
        return false;
      }
    }
    return true;
  }
  

  // 已忽略
  neglected(event){
    this.list = [];
    this.pageList = [];
    this.isshow = false
    this.isquote = false;

    event.target.classList.add('btn-active')
    let others = event.target.parentElement.childNodes

    for(let i=0;i<others.length-2;i++){
      others[i].classList.remove('btn-active')
    }
    others[others.length-1].classList.remove('btn-active')

    this.orderApi.ignore({}).then((ignore:any)=>{
      this.list = ignore;
      this.length = ignore.length;
      

      for(let i=0;i<this.list.length;i++){
        this.list[i].index = i
      }

      this.pagination(this.list,this.length);
    
    })
    
  }

  // 已报价
  quotedPrice(event){
    this.list = [];
    this.pageList = [];
    this.isquote = false;
    this.isshow = false
    event.target.classList.add('btn-active')
    let others = event.target.parentElement.childNodes

    for(let i=0;i<others.length-1;i++){
      others[i].classList.remove('btn-active')
    }

    this.orderApi.quotelist({ }).then((list:any)=>{

      for(let i=0;i<list.length;i++){
        if(list[i].quotestatus === "W"){
          this.list.push(list[i])
        }
      }

      for(let i=0;i<this.list.length;i++){
        this.list[i].index = i
      }

      this.length = this.list.length
      this.pagination(this.list,this.length);
    });

  }

  // 全部
  allQuote(event){
    console.log(event)
    this.list = [];
    this.pageList = [];
    this.isquote = false;
    this.isshow = true
    event.target.classList.add('btn-active')
    let others = event.target.parentElement.childNodes

    for(let i=1;i<others.length;i++){
      others[i].classList.remove('btn-active')
    }
   
    this.onMyShow()
    
  }



  tiaozhuan(itemId){
    this.router.navigate(['quotationDetails'],{
      queryParams: {
        id: itemId
      }
    })
  }

  tiaozhuan2(itemId){
    this.router.navigate(['detailsOfQuotedPrice'],{
      queryParams: {
        id: itemId
      }
    })
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





