import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';

@Component({
  selector: 'app-quotation-center',
  templateUrl: './quotation-center.component.html',
  styleUrls: ['./quotation-center.component.scss'],
  providers:[InstApi,OrderApi]
})
export class QuotationCenterComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi
  ) { 
    super(router,activeRoute,instApi);
  }

    list=[];
    list2=[];
    ignore=null;

    length = null;
    length2 = null;
    ignoreLength = null;

    pageSize = null;
    pages = null;
    newPage = null;
    pageList = [];
    selPage = 1;
    data = [];
    data2 = [];
    setData = null;

    isquote = true;
    
  onMyShow(){


    var a=this.orderApi;




    a.ignore({ employee_id: 7 }).then((ignore:any)=>{
      this.ignore = ignore
    

        if(ignore.length == 0){

          a.quotelist({ }).then((list:any)=>{
            for(let item of list){
              if(item.quotestatus == 'Q'){
                this.list.push(item)
              }
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


  ignoreHandle(item){
    this.list = [];
    this.pageList = [];
    item.quote_id = item.id
    item.ignorestatus = 'Y'
    item.employee_id = 7

      this.orderApi.searchignore(item).then((searchignore:any)=>{
   
        if(searchignore.code == "0"){

          this.onMyShow()
          
        }
        

      })
    
  }


  quoteCenter(event){
    this.list = [];
    this.pageList = [];
    event.target.parentElement.classList.add('active');
    event.target.parentElement.nextElementSibling.classList.remove('active')

    let toggleTitleContent = document.getElementsByClassName('toggleTitleContent')[0].children;
    
    toggleTitleContent[0].classList.remove('box-hide')
    toggleTitleContent[1].classList.add('box-hide')


    this.isquote = true;

    event.target.offsetParent.lastElementChild.childNodes[0].childNodes[0].childNodes[0].classList.add('btn-active')
    event.target.offsetParent.lastElementChild.childNodes[0].childNodes[0].childNodes[1].classList.remove('btn-active')

    this.onMyShow();
  }

  quoteRecord(event){
    event.target.parentElement.classList.add('active');
    event.target.parentElement.previousElementSibling.classList.remove('active')

    let toggleTitleContent = document.getElementsByClassName('toggleTitleContent')[0].children;
    toggleTitleContent[0].classList.add('box-hide')
    toggleTitleContent[1].classList.remove('box-hide')

    this.list = [];
    this.pageList = [];
    this.isquote = true;



    event.target.offsetParent.childNodes[1].lastElementChild.firstElementChild.childNodes[0].classList.add('btn-active')
    event.target.offsetParent.childNodes[1].lastElementChild.firstElementChild.childNodes[1].classList.remove('btn-active')
    event.target.offsetParent.childNodes[1].lastElementChild.firstElementChild.childNodes[2].classList.remove('btn-active')

    this.orderApi.quotelist({ }).then((list:any)=>{

      for(let i=0;i<list.length;i++){
        if(list[i].quotestatus === "W"){
          this.list.push(list[i])
        }
      }
      this.length = this.list.length;
      this.pagination(this.list,this.length);
    });

    
  }

  // 待报价
  quoteHandle(event){
    this.list = [];
    this.pageList = [];
    this.isquote = true;
    

    event.target.parentElement.classList.add('btn-active');
    event.target.parentElement.nextElementSibling.classList.remove('btn-active')
   

    this.onMyShow();

  }
  

  // 已忽略
  neglected(event){
    this.list = [];
    this.pageList = [];
    
    this.isquote = false;

    event.target.parentElement.classList.add('btn-active');
    event.target.parentElement.previousElementSibling.classList.remove('btn-active')
    if(event.target.parentElement.nextElementSibling !==null){
      event.target.parentElement.nextElementSibling.classList.remove('btn-active')
    }

    this.orderApi.ignore({}).then((ignore:any)=>{
      this.list = ignore;
      this.length = ignore.length;
    
      this.pagination(this.list,this.length);
    
    })
    
  }

  // 已报价
  quotedPrice(event){
    this.list = [];
    this.pageList = [];
    this.isquote = true;

    event.target.parentElement.classList.add('btn-active');
    event.target.parentElement.nextElementSibling.classList.remove('btn-active')
    event.target.parentElement.nextElementSibling.nextElementSibling.classList.remove('btn-active')

    this.orderApi.quotelist({ }).then((list:any)=>{

      for(let i=0;i<list.length;i++){
        if(list[i].quotestatus === "W"){
          this.list.push(list[i])
        }
      }
      this.length = this.list.length
      this.pagination(this.list,this.length);
    });

  }

  // 全部
  allQuote(event){
    this.list = [];
    this.pageList = [];
    this.isquote = true;

    event.target.parentElement.classList.add('btn-active');
    event.target.parentElement.previousElementSibling.classList.remove('btn-active')
    event.target.parentElement.previousElementSibling.previousElementSibling.classList.remove('btn-active')

    
    this.orderApi.quotelist({ }).then((list:any)=>{
      for(let i=0;i<list.length;i++){
        if(list[i].quotestatus === "W"){
          this.list.push(list[i])
        }
      }
      this.length = this.list.length

     this.pagination(this.list,this.length);

      
    });
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
    this.pageSize = 5;
    // if()
    this.pages = Math.ceil( length/this.pageSize )
    this.newPage = this.pages > 5 ? 5 : this.pages;
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





