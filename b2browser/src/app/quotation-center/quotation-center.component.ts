import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';


@Component({
  selector: 'app-quotation-center',
  templateUrl: './quotation-center.component.html',
  styleUrls: ['./quotation-center.component.scss'],
  providers:[InstApi]
})
export class QuotationCenterComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi
  ) { 
    super(router,activeRoute,instApi);
  }

  onMyShow(){
    this.toggleTitle();
    this.toggleBtn();
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
  
}




