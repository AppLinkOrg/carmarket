import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { ApiConfig } from '../api.config';
import { EnterpriseApi } from 'src/providers/enterprise.api';
declare let Chart: any;
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  providers: [InstApi, MemberApi,EnterpriseApi]
})
export class SettingComponent extends AppBase {
  loading=false;

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public enterpriseApi: EnterpriseApi,
  ) {
    super(router, activeRoute, instApi, memberApi,enterpriseApi);
  }

  onMyLoad() {
    this.params;
  }

  tabtype = 'companyinfo';

  targethuman = 0;
  targetorder = 0;
  targetclient = 0;
  targetamount = 0;
  zizhi=[];
  fileList1=[];
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("setting", "setting");
    }
    // this.targethuman = this.memberinfo.manpower.targethuman;
    // this.targetorder = this.memberinfo.manpower.targetorder;
    // this.targetclient = this.memberinfo.manpower.targetclient;
    // this.targetamount = this.memberinfo.manpower.targetamount;
    // this.memberApi.manpowerzizhi({manpower_id:this.memberinfo.manpower_id}).then((zizhi:any)=>{
    //   for(let item of zizhi){
    //     item.primary_id=item.id;
    //     item.uid=item.id;
    //     item.status='done';
    //     item.url=ApiConfig.getUploadPath()+'manpower/'+item.img;
    //     item.thumbUrl=ApiConfig.getUploadPath()+'manpower/'+item.img;
    //   }
    //   this.zizhi=zizhi;
    //   this.fileList1=zizhi;
    // })
  }
  submitTarget() {
    // this.memberApi.submittarget({
    //   targethuman: this.targethuman, targetorder: this.targetorder,
    //   targetclient: this.targetclient, targetamount: this.targetamount
    // }).then(()=>{
    //   Chart.toast("Updated");
    // });
  }
  copy(type){
    const oInput = document.createElement('input');
    // oInput.value = this.InstInfo.links+"?id="+this.memberinfo.manpower.id+"&type="+type;
    var url=this.base64encode("id="+(this.memberinfo.manpower.id)+"&type="+(type));
    // oInput.value=this.InstInfo.links+"?v="+url;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand('Copy');
  }
  oldpassword='';
  newpassword='';
  newpassword2='';
  resetpwd(){
    // if(this.oldpassword.trim()=="" || this.newpassword.trim()=="" || this.newpassword2.trim()==""){
    //   this.toast(this.lang.mimaweikongchongxinshuru);
    //   return
    // }
    // if(this.newpassword2!=this.newpassword){
    //   this.toast(this.lang.shezhimimabuyiyang);
    //   return
    // }
    // this.memberApi.resetpwd({
    //   oldpassword:this.oldpassword,
    //   newpassword:this.newpassword2
    // }).then((res:any)=>{
    //   console.log(res);
    //   if(res.code=='0'){
    //     this.saveing();
    //   }else {
    //     this.toast(res.result);
    //   }
    // })
  }
  watchimg(item){
    var url=ApiConfig.getUploadPath()+'manpower/'+item.img;
    window.open(url,'new','');
  }
  save(){
    console.log(this.memberinfo.manpower);
    // this.memberApi.editmanpower(this.memberinfo.manpower).then((res)=>{
    //   if(res){
    //     this.saveing();
    //   }
    // })
  }
  jiaziliao(){
    this.zizhi.push({
      seq:this.zizhi.length+1,
      name:'',
      img:'',
      uploadtime:'',
      status:'A',
    })
  }
  jianziliao(i){
    if (this.zizhi[i].status!="") {
      this.zizhi[i].status = 'D';
    } 
    console.log(this.zizhi)
  }
  afterupload(e){
    console.log(e);
   
    if (e.type == "success") {
      this.zizhi.push({
        img:e.file.response.result,
        name:e.file.name,
        status:'done'
      })
      for(var i=0;i<e.fileList.length;i++){
        if(e.fileList[i].uid==e.file.uid){
          e.fileList[i].thumbUrl=ApiConfig.getUploadPath()+'manpower/'+e.file.response.result;
          e.fileList[i].url=ApiConfig.getUploadPath()+'manpower/'+e.file.response.result;
        }
      }
      e.thumbUrl=ApiConfig.getUploadPath()+'manpower/'+e.file.response.result;
    } else if (e.type == 'removed') {
 
    }
  }
  
  watchfile(item) {
    console.log(item);
    var url = ApiConfig.getUploadPath() + 'manpower/' + item.img;
    console.log(url);
    window.open(url, 'new', '');
  }
  saveziliao(){
   
    var datajson=JSON.stringify(this.zizhi);
    // this.memberApi.manpowerziliao({datajson:datajson}).then((res)=>{
    //   console.log(res)
    //   if(res){
    //    this.saveing();
    //    this.onMyShow();
    //   }
    // })
  }
 
 
}
