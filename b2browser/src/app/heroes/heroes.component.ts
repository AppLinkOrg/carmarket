import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { FloorApi } from 'src/providers/floor.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  providers:[FloorApi,EnterpriseApi]
})
export class HeroesComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public floorApi:FloorApi,
    public EnterpriseApi:EnterpriseApi,
  ) { 
    super(router,activeRoute,instApi,EnterpriseApi);
  }
  floorlist=[];
  floor=null;
  onMyShow(){
    this.floorApi.list({}).then((list:any[])=>{
      this.floorlist=list;
    });
  }

  setFloor(floor){
    this.floorApi.seatmap({id:floor.id}).then((floor:any)=>{
      this.floor=floor;
    });
  }

}
