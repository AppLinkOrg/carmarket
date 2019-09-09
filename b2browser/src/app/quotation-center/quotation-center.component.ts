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

    list: void | Object=null;
    length = null;
    pageSize = null;
    pages = null;
    newPage = null;
    pageList = [];
    selPage = 1;
    data = null;
    setData = null;
    
    
  onMyShow(){
    this.toggleTitle();
    this.toggleBtn();
    
   var a=this.orderApi;

    a.quotelist({}).then((list)=>{
       this.list=list;

       this.length = this.list.length;
       this.pagination()
    });
    
  }


  pagination(){
    this.pageSize = 5;
    this.pages = Math.ceil( this.length/this.pageSize )
    this.newPage = this.pages > 5 ? 5 : this.pages;
    this.selPage = 1;
    
    this.setData = function(){
      this.data = this.list.slice(this.pageSize*(this.selPage-1),this.pageSize*this.selPage);
    }
    this.data = this.list.slice(0, this.pageSize);

    for (var i = 0; i < this.newPage; i++) {
       this.pageList.push(i + 1);
     }

    // console.log(this.data)
  }
  
  selectPage(page) {
      if (page < 1 || page > this.pages) return;
     
      if (page > 2) {
          var newpageList = [];
          for (var i = (page - 3) ; i < ((page + 2) > this.pages ? this.pages : (page + 2)) ; i++) {
              newpageList.push(i + 1);
          }
          this.pageList = newpageList;
          // console.log(newpageList)
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



  toggleTitle(){
    let toggleTitle = document.getElementsByClassName('toggleTitle')[0].children;
    let toggleTitleContent = document.getElementsByClassName('toggleTitleContent')[0].children;

    for(let i=0; i<toggleTitle.length; i++){

      toggleTitle[i].index = i;
      
      toggleTitle[i].onclick = function(){
        // console.log(toggleBtns[i])
        for(let i=0; i<toggleTitle.length; i++){
          toggleTitle[i].classList.remove('active')
          
        }
        for(let j=0; j<toggleTitleContent.length; j++){
          toggleTitleContent[j].classList.add('box-hide');
        } 
        this.classList.add('active')
        toggleTitleContent[this.index].classList.remove('box-hide')

      
      }
    }
  }

  toggleBtn(){
    let toggleBtns = document.getElementsByClassName('toggleBtns')[0].children;
    let btnContents = document.getElementsByClassName('btnContents')[0].children;
 

    for(let i=0; i<toggleBtns.length; i++){

      toggleBtns[i].index = i;
      
      toggleBtns[i].onclick = function(){
        
        for(let i=0; i<toggleBtns.length; i++){
          toggleBtns[i].classList.remove('btn-active')
        }
        for(let j=0; j<btnContents.length; j++){
          btnContents[j].classList.add('box-hide')
        }
        this.classList.add('btn-active')
        btnContents[this.index].classList.remove('box-hide')
      
      }
    }
  }
  
  tiaozhuan(itemId){
    this.router.navigate(['quotationDetails'],{
      queryParams: {
        id: itemId
      }
    })
  }
}




