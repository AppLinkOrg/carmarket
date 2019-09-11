import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { ConsoleReporter } from 'jasmine';
import { ConstantPool } from '@angular/compiler';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

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

    a.ignore({ }).then((ignore:any)=>{
      this.ignore = ignore
        // for(let i=0;i<ignore.length;i++){
        //   for(let j=0;j<this.ignore.length;j++){
        //     if(ignore[i].quote_id != this.ignore[j].quote_id){
        //       this.ignore.push(ignore[i])
        //     }
        //   }
        // }
    })
      
    console.log(this.ignore)
    
    a.quotelist({ }).then((list:any)=>{

        this.list = list.filter((item, idx) => {
            if(this.ignore !== null){
              for(let i=0;i<this.ignore.length; i++){
                return item.id != this.ignore[i].quote_id && item.quotestatus=="Q"
              }
            }
            this.list.push(item)
            
        })
       
    });

    // this.pagination(this.list,this.length);
   
  }



  ignoreHandle(item){
    item.quote_id = item.id
    
    console.log(item)
      this.orderApi.searchignore(item).then((searchignore:any)=>{
        console.log(searchignore)
        if(searchignore.code == "0"){
          // window.location.reload()
          this.onMyShow()
        }
        

      })
    
  }


  quoteCenter(event){
    this.list = [];
    event.target.parentElement.classList.add('active');
    event.target.parentElement.nextElementSibling.classList.remove('active')

    let toggleTitleContent = document.getElementsByClassName('toggleTitleContent')[0].children;
    
    toggleTitleContent[0].classList.remove('box-hide')
    toggleTitleContent[1].classList.add('box-hide')

    this.onMyShow();
  }

  quoteRecord(event){
    event.target.parentElement.classList.add('active');
    event.target.parentElement.previousElementSibling.classList.remove('active')

    let toggleTitleContent = document.getElementsByClassName('toggleTitleContent')[0].children;
    toggleTitleContent[0].classList.add('box-hide')
    toggleTitleContent[1].classList.remove('box-hide')

    this.list = [];

    this.orderApi.quotelist({ }).then((list:any)=>{

      for(let i=0;i<list.length;i++){
        if(list[i].quotestatus === "W"){
          this.list.push(list[i])
        }
      }
     
    });
    
  }

  // 待报价
  quoteHandle(event){
    this.list = [];
    this.isquote = true;

    event.target.parentElement.classList.add('btn-active');
    event.target.parentElement.nextElementSibling.classList.remove('btn-active')
   

    this.onMyShow();

  }
  

  // 已忽略
  neglected(event){
    this.list = []
    this.isquote = false;

    event.target.parentElement.classList.add('btn-active');
    event.target.parentElement.previousElementSibling.classList.remove('btn-active')
    if(event.target.parentElement.nextElementSibling !==null){
      event.target.parentElement.nextElementSibling.classList.remove('btn-active')
    }

    this.orderApi.ignore({}).then((ignore:any)=>{
      this.list = ignore;
      this.ignoreLength = ignore.length;
    })
    // this.pagination(this.ignore,this.ignoreLength);
    
  }

  // 已报价
  quotedPrice(event){
    this.list = [];
    this.isquote = true
    event.target.parentElement.classList.add('btn-active');
    event.target.parentElement.nextElementSibling.classList.remove('btn-active')
    event.target.parentElement.nextElementSibling.nextElementSibling.classList.remove('btn-active')

    this.orderApi.quotelist({ }).then((list:any)=>{

      for(let i=0;i<list.length;i++){
        if(list[i].quotestatus === "W"){
          this.list.push(list[i])
        }
      }
     
    });

  }

  // 全部
  allQuote(event){
    this.list = [];
    event.target.parentElement.classList.add('btn-active');
    event.target.parentElement.previousElementSibling.classList.remove('btn-active')
    event.target.parentElement.previousElementSibling.previousElementSibling.classList.remove('btn-active')

    
    this.orderApi.quotelist({ }).then((list:any)=>{
      for(let i=0;i<list.length;i++){
        if(list[i].quotestatus === "W"){
          this.list.push(list[i])
        }
      }
     
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





