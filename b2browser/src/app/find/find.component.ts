import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { CarApi } from 'src/providers/car.api'; 

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
  providers:[CarApi]
})
export class FindComponent  extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public enterpriseApi:EnterpriseApi,
    public orderApi:OrderApi,
    public carApi:CarApi
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }
  searchhistory=[];
  vin=null;
  neiron=null;
  onMyShow(){
    
    this.carApi.searchhistory({ }).then((searchhistory:any)=>{ 
      for(var i=0;i<searchhistory.length;i++){
        searchhistory[i].created_date = this.gettime(searchhistory[i].created_date)
      }
      console.log(searchhistory,'列表')
      this.searchhistory=searchhistory;
      
    });
    
  }
  gettime(date){
    date = date.replace(/-/g,'/');
    date = date.slice(5,16);
    return date
  }


  input(){
     console.log(this.neiron);
  }
  


  bindsearch(e) {
     
    console.log(this.neiron);
    //return;
    var vin = this.neiron;
    
    this.carApi.vin({
      vin: vin
    }).then((res:any) => {

      console.log(res,'嗷嗷嗷');

      if (res.code == '4001' || res.code == 4001 ){
           this.showAlert('无法识别该车架号,请用(无识别查找)')
        return;
      }
      if (res.code == 400) {
        this.showAlert('暂时无法识别,请用(无识别查找)')
         
        return;
      }
      var vin = res.data.vin,
        brandCode = res.data.brandCode,
        mcid = res.data.mcid,
        // biaoti = res.title[0] + res.title[1] + res.title[2] + res.title[3] + res.title[4]
        biaoti=res.data.model_name
      if (res.code == 0) {
        this.showAlert(res.msg) 
        return;
      }
      if (res.code == 1) {
        this.carApi.addhistory({
          vin: vin,
          carrecord: biaoti
        }).then((qwe:any) => { 
          this.navigate("findadd",{vin: vin,biaoti:biaoti,brandCode:brandCode,mcid:mcid}); 
        })
      }
    })

  }




  bindclear() {
   
          this.carApi.clearallsearch({ }).then((clearallsearch:any) => {
            console.log(clearallsearch);
             
          });
          
  }

  bindcheck(id) {
    var that = this;
    var vin = id;
    console.log(vin,"来了")
    //return;
     
    this.carApi.vin({vin:vin }).then((res:any)=>{

      console.log(vin,"来了")

      var vin = res.data.vin,
        brandCode = res.data.brandCode,
        mcid = res.data.mcid,
        biaoti = res.data.model_name
        // biaoti = res.title[0] + res.title[1] + res.title[2] + res.title[3] + res.title[4]
      if (res.code == 0) {
        this.showAlert(res.msg);
        return;
      }
      if (res.code == 400) {
        this.showAlert("暂时无法识别,请用(无识别查找)");
        
        return;
      }
      if (res.code == 1) { 
        this.navigate("findadd",{vin: vin,biaoti:biaoti,brandCode:brandCode,mcid:mcid});
        
      }
      
    })
 
  }

}
