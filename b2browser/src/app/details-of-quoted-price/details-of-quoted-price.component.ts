import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';


@Component({
  selector: 'app-details-of-quoted-price',
  templateUrl: './details-of-quoted-price.component.html',
  styleUrls: ['./details-of-quoted-price.component.scss'],
  providers:[InstApi]
})
export class DetailsOfQuotedPriceComponent  extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi
  ) { 
    super(router,activeRoute,instApi);
  }
  onMyShow(){
    
  }

}
