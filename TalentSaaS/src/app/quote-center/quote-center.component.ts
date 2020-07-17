import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { MainComponent } from '../main/main.component';
import { ApiConfig } from '../api.config';
import { UploadFile } from 'ng-zorro-antd/upload';
function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-quote-center',
  templateUrl: './quote-center.component.html',
  styleUrls: ['./quote-center.component.scss'],
  providers: [InstApi, MemberApi,OrderApi]
})
export class QuoteCenterComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public enterpriseApi: EnterpriseApi,
    public orderApi: OrderApi,
  ) {
    super(router, activeRoute, instApi, memberApi,enterpriseApi);

  }
  type='Q';
  onMyLoad() {
    this.params;
    if(this.params.type!=undefined){
      this.type=this.params.type;
    }
  }
  distinctlist=null;
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("quote", "quote");
    }
   
    this.orderApi.distinctlist({}).then((distinctlist: any) => {
      distinctlist.unshift({
        id:-1,
        name:'全部'
      })
      for(let item of distinctlist){
        item.check=false;
      }
      this.distinctlist = distinctlist
    })
    this.inloop=true;
    this.changtype(this.type);
    this.comlen();

  }
  inloop=false;

  ngOnDestroy() {
    // alert('看看')
    this.inloop=false;
  }
  changtype(type){
    this.type=type;
    this.getlist();
  }
  daibaolen = 0;
  yibaolen = 0;
  yihulen = 0;
  yishilen = 0;
  alllen = 0;

  comlen(){
    this.orderApi.qoutenum({}).then((qoutenum:any)=>{
      if(qoutenum){
        this.alllen=qoutenum.allquote;
        this.yibaolen=qoutenum.yibaojia;
        this.daibaolen=qoutenum.daibaojia;
        this.yihulen=qoutenum.yihuilu;
        this.yishilen=qoutenum.yishixiao;
      }
      if(this.inloop==true){

        setTimeout(()=>{
          this.comlen();
        },3*1000);
      }
    })
   
  }
  imgs=[];
  list=[];
  json1={};
  getlist(){
    // this.pageList=[];

    var json=null;
    json=this.json1;
    json.quotecompan_id=this.memberinfo.enterprise.id;
    json.quotestatus=this.type;
    json.quoteper=this.memberinfo.id;
    // json.disarr=this.disarr;
    

    this.orderApi.quotationlist(json).then((quotationlist:any)=>{
      var imgs=[];
      var arr=[];
      for(var i=0;i<quotationlist.length;i++){
        
        quotationlist[i].index=i;
        quotationlist[i].imgs=[];
        if(quotationlist[i].quotestatus=='Q'){
          quotationlist[i].quotestatus_name='待报价';
        }else  if(quotationlist[i].quotestatus=='W'){
          quotationlist[i].quotestatus_name='已报价';
        }else  if(quotationlist[i].quotestatus=='H'){
          quotationlist[i].quotestatus_name='已忽略';
        }else  if(quotationlist[i].quotestatus=='S'){
          quotationlist[i].quotestatus_name='已失效';
        }else{}

        if( quotationlist[i].carmodel=='undefined' || quotationlist[i].carmodel==''  ){
          if(quotationlist[i].frontofcar!='undefined' || quotationlist[i].frontofcar!=''){
            var url=ApiConfig.getUploadPath()+'quote/'+quotationlist[i].frontofcar;
            imgs.push({
              url:url,
              status:'done',
              uid:i,
              name:i
            });
          }

          if(quotationlist[i].namesplate!='undefined' || quotationlist[i].namesplate!=''){
            var url=ApiConfig.getUploadPath()+'quote/'+quotationlist[i].namesplate;
            imgs.push({
              url:url,
              status:'done',
              uid:i,
              name:i
            });
          }
          if(quotationlist[i].rearofcar!='undefined' || quotationlist[i].rearofcar!=''){
            var url=ApiConfig.getUploadPath()+'quote/'+quotationlist[i].rearofcar;
            imgs.push({
              url:url,
              status:'done',
              uid:i,
              name:i
            });
          }
          if(quotationlist[i].photo1!='undefined' || quotationlist[i].photo1!=''){
            var url=ApiConfig.getUploadPath()+'quote/'+quotationlist[i].photo1;
            imgs.push({
              url:url,
              status:'done',
              uid:i,
              name:i
            });
          }
          
          quotationlist[i].imgs=imgs;
        }
        if(this.disarr.length>0){
            for(let json of this.disarr){
              if(quotationlist[i].enterprise_district_id==json){
                arr.push(quotationlist[i]);
              }
            }
        }
      }
      if(this.disarr.length>0 && this.disarr[0]!=''){
        this.list=arr;
      }else {
        this.list=quotationlist;
      }
     
      this.pagination(this.list,this.list.length);
      if(this.inloop){

        setTimeout(()=>{
          this.changtype(this.type);
        },4*1000);
      }
    })
  }
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    
        this.previewImage = file.url || file.preview;
        this.previewVisible = true;
  }
  baojia(quote_id,id){
    this.orderApi.editisread({ quote_id: id, enterprise_id: this.memberinfo.enterprise.id, employee_id: this.memberinfo.id }).then((ret) => {
       this.navigate('/quotedetail',{id:id,quote_id:quote_id,type:this.type})
    })
  }
  photoshow=false;
  showPhoto(item) {
    console.log(item)
    this.imgs = []
    this.photoshow = true
    console.log(item)

    this.imgs.push(item)
    var arr = []
    this.imgs = this.imgs.filter((item, index) => {

      console.log(item.photo1, 'lllll')
      if (item.photo1.indexOf(',') > -1) {
        arr = item.photo1.split(',')
      } else {
        arr.push(item.photo1)
      }

      console.log(arr, '急急急')

      item.arr = arr

      if (item.frontofcar == "" && item.namesplate != "") {
        item.frontofcar = item.namesplate
        item.namesplate = ""
      }
      if (item.frontofcar == "" && item.namesplate == "" && item.rearofcar != "") {
        item.frontofcar = item.rearofcar
        item.rearofcar = ""
      }
      if (item.frontofcar == "" && item.namesplate == "" && item.rearofcar == "" && item.photo1 != "") {

        item.frontofcar = item.photo1
        item.photo1 = ""
      }

      return item
    })
    console.log(this.imgs, 'llll')

  }
  yibao(id){
    this.navigate('/quoteprice',{quote_id:id,type:this.type})
  }
  ignoreHandle(item){
    this.list = [];
    console.log(item, '已忽略')
    this.pageList = [];
    // item.quote_id = item.id
    item.ignorestatus = 'Y'
    item.quoteemployee_id = this.memberinfo.id;
    item.quoteenterprise_id = this.memberinfo.enterprise.id;
    console.log(item)
    this.orderApi.editisread({ quote_id: item.id, enterprise_id: this.memberinfo.enterprise.id, employee_id: this.memberinfo.id }).then((ret) => {
      console.log(ret, '改改了')
      if (ret) {
        this.orderApi.addignore({ id: item.id }).then((searchignore: any) => {

          this.changtype('H');
          this.comlen();
        })
      }
    })
  }
  choose(i,item){
    console.log(item,i);
    item.check = item.check==true?false:true;
    
      for(var j=0;j<this.distinctlist.length;j++){
        if(i==0){
          if(item.id!=this.distinctlist[j].id){
            this.distinctlist[j].check = false;
          }
          
        }else {
          this.distinctlist[0].check=false; 
        } 
      }
  }
  reset(){
    for(let item of this.distinctlist){
      item.check=false;
    }
    this.disarr=[];
    this.getlist();
  }
  disarr=[];
  save(){
    var arr=[];
    for(let item of this.distinctlist){
      if(item.check==true){
         item.id = item.id==-1?'':item.id;
        arr.push(item.id);
      }
    }
    // if(arr.length>0){
    //   this.disarr=arr.join(',');
    // }
    this.disarr=arr;
    this.getlist();
    console.log(this.disarr);
  }
}
