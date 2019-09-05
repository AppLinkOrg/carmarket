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
    // this.toggleEvent();
    
  }

  ngOnInit(){
    // this.toggleEvent(); 
  }

  toggleEvent(event) {
    
  //   const currentEvent = event.target.parentElement;
  //   console.log(event)
  //   if(currentEvent.className == 'active'){
  //     if(currentEvent.nextElementSibling === null || currentEvent.previousElementSibling === null){
  //       if(currentEvent.previousElementSibling.className == 'active' || currentEvent.nextElementSibling.className == 'active'){
  //         currentEvent.previousElementSibling.className = '';
  //         currentEvent.nextElementSibling.className = ''
  //       }
  //     }else {
  //         currentEvent.previousElementSibling.className = '';
  //         currentEvent.nextElementSibling.className = ''
  //     }
  //     currentEvent.className = ''
  //   }else {
  //     if(currentEvent.nextElementSibling === null || currentEvent.previousElementSibling === null){
  //       if(currentEvent.previousElementSibling.className == 'active' || currentEvent.nextElementSibling.className == 'active'){
  //         currentEvent.previousElementSibling.className = '';
  //         currentEvent.nextElementSibling.className = ''
  //       }
  //     }else {
  //         currentEvent.previousElementSibling.className = '';
  //         currentEvent.nextElementSibling.className = ''
  //     }
  //     currentEvent.className = 'active'
  //   }
  }
  
}




