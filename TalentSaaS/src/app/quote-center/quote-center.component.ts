import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { MainComponent } from '../main/main.component';


@Component({
  selector: 'app-quote-center',
  templateUrl: './quote-center.component.html',
  styleUrls: ['./quote-center.component.scss'],
  providers: [InstApi, MemberApi]
})
export class QuoteCenterComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public enterpriseApi: EnterpriseApi,
  ) {
    super(router, activeRoute, instApi, memberApi,enterpriseApi);

  }
  type='Q';
  onMyLoad() {
    this.params;
  }
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("quote", "quote");
    }
  }
  changtype(type){
    this.type=type;
  }
}
