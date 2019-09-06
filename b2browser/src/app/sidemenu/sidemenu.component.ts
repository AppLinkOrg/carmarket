import { Component, OnInit } from '@angular/core';
import { InstApi } from 'src/providers/inst.api';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  providers:[InstApi]
})
export class SidemenuComponent implements OnInit {

  ngOnInit() {
  }
  toggle=false;
  instinfo=null;

  constructor(public instApi:InstApi){
    this.instinfo={};
    this.instApi.info({unicode:"gh"}).then((instinfo)=>{
      this.instinfo=instinfo;
    });
  }
  toggleSidebar(){
    this.toggle=!this.toggle;
  }
}
