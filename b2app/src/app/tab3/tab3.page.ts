import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides, IonInfiniteScroll, IonMenu } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { TabsPage } from '../tabs/tabs.page';
import {EnterpriseApi} from 'src/providers/enterprise.api';
import { OrderApi } from 'src/providers/order.api';
import { MemberApi } from 'src/providers/member.api';
import * as echarts from 'echarts';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
    providers:[EnterpriseApi,OrderApi,MemberApi]
})
export class Tab3Page extends AppBase {

    constructor(public router: Router,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public activeRoute: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private elementRef: ElementRef,
        public enterpriseApi: EnterpriseApi,
        public orderApi: OrderApi,
        public memberApi: MemberApi,
    ) {
        super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute,enterpriseApi,orderApi);
        this.headerscroptshow = 480;
        this.currentpage = "tab3";

        // AppBase.TABName = "tab3";
        // AppBase.LASTTAB = this;
    }
    list = [];
    operation='A'
    isshow = true;
  
    length = null;
  
    pageSize = null;
    pages = null;
    newPage = null;
    pageList = [];
    selPage = 1;
    data = [];
    setData = null;
  
    getstatus = null;
    order_time_dateformat = null
    month_time = null
  
    enterprise_id=''
    employee_id=''
    em_id=""
    emm_id='';
    cc='';
  
    alllen=0;
    falen=0;
    shoulen=0;
    wanlen=0;
    qulen=0;
    fulen=0;
    onMyLoad(){
        this.params;
        console.log(11)
    }
    onMyShow() {
        AppBase.TABName = "tab3";
        AppBase.LASTTAB = this;
        this.getinfo();
    }
    getinfo(){
        var a = this.orderApi

    this.activeRoute.queryParams.subscribe(query=>{
        console.log(query);
        this.emm_id=query.emm_id
      this.getstatus = query.stauts;
      this.cc=query.bb;
      this.order_time_dateformat = query.order_time_dateformat
      this.month_time = query.month_time
      console.log(this.getstatus)
      console.log(this.order_time_dateformat)
      console.log(this.month_time)

      this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{
        console.log(employeeinfo,'000')
        this.enterprise_id = employeeinfo.enterprise_id
        this.em_id = employeeinfo.id

        if( employeeinfo.position=='B' || employeeinfo.power=='Y'){
          console.log('aaa')
          this.employee_id = '';
        }else{
          console.log('bb')
          this.employee_id = employeeinfo.id;
        }
       
       
        a.mylist({ enterprise_id: this.enterprise_id,employee_id: this.employee_id }).then((mylist:any)=>{
          // console.log(mylist)
        //   this.alllen=0;
        // this.falen=0;
        // this.shoulen=0;
        // this.wanlen=0;
        // this.qulen=0;
        // this.falen=0;
          this.list = []
          this.pageList = []
          for(let j=0;j<mylist.length;j++){
            // this.alllen++;
            if(mylist[j].order_status != 'R' && mylist[j].order_status != 'Y' && mylist[j].order_status != 'I'){
              // if(mylist[j].order_status == 'R' || mylist[j].order_status == 'Y' || mylist[j].order_status == 'I'){
              //   mylist[j].order_status_name = '已完成';
                
              // }
              // if(mylist[j].order_status=='L'){
              //   this.falen++;
              // }
              // if(mylist[j].order_status=='M'){
              //   this.shoulen++;
              // }
              // if(mylist[j].order_status=='E'){
              //   this.qulen++;
              // }
              // if(mylist[j].order_status=='N'){
              //   this.wanlen++;
              // }
              // if(mylist[j].order_status=='W'){
              //   this.fulen++;
              // }
              this.enterpriseApi.getemployeeinfo({id:mylist[j].baojia}).then((getemployeeinfo:any)=>{
                // console.log(getemployeeinfo,'嘻嘻嘻嘻嘻')
                mylist[j].baojiaperson = getemployeeinfo.name
                mylist[j].baojiacom = getemployeeinfo.enterprise_name
              })
              var lists = []
              lists.push(mylist[j])
  
              this.pageList = []
             
  
              if(this.order_time_dateformat != undefined){
                this.pageList = []
                
                // console.log(this.order_time_dateformat,'是你了')
                for(let i=0;i<lists.length;i++){
                  this.pageList = []
  
                  let index = lists[i].order_time.indexOf('-')
                  lists[i].order_time = lists[i].order_time.substring(0,index+3)
  
                  if(this.order_time_dateformat == lists[i].order_time_dateformat){
                   
                    // this.pageList = []
                    // this.list = []
                    this.list.push(lists[i]);
                    if(lists[i].order_status=='L'){
                      this.falen++;
                    }
                    if(lists[i].order_status=='M'){
                      this.shoulen++;
                    }
                    if(lists[i].order_status=='E'){
                      this.qulen++;
                    }
                    if(lists[i].order_status=='N'){
                      this.wanlen++;
                    }
                    if(lists[i].order_status=='W'){
                      this.fulen++;
                    }
                    
                  }
                 
                }

                for(let a=0;a<this.list.length-1;a++){
                  for(let b=a+1; b<this.list.length;b++){
                    if(this.list[a].orderno<this.list[b].orderno){
                      let temp = this.list[a]
                      this.list[a] = this.list[b]
                      this.list[b]  = temp
                    }
                  }
                }
               console.log('kkkk')

                for(let i=0;i<this.list.length;i++){
                  
                  this.list[i].index = i;
                 
                }
                
                this.alllen = this.list.length;
                this.length = this.list.length
                // this.pagination(this.list,this.length)
                this.change(this.bb);
              }else {
                console.log(this.order_time_dateformat,'不是你了')
                console.log('oooo')
                this.list.push(mylist[j])
                if(mylist[j].order_status=='L'){
                  this.falen++;
                }
                if(mylist[j].order_status=='M'){
                  this.shoulen++;
                }
                if(mylist[j].order_status=='E'){
                  this.qulen++;
                }
                if(mylist[j].order_status=='N'){
                  this.wanlen++;
                }
                if(mylist[j].order_status=='W'){
                  this.fulen++;
                }
                for(let a=0;a<this.list.length-1;a++){
                  for(let b=a+1; b<this.list.length;b++){
                    if(this.list[a].orderno<this.list[b].orderno){
                      let temp = this.list[a]
                      this.list[a] = this.list[b]
                      this.list[b]  = temp
                    }
                  }
                }
               
                for(let k=0;k<this.list.length;k++){
                  this.list[k].index = k;
                  
                  
                }
                this.alllen = this.list.length
                this.length = this.list.length
                console.log(this.list)
                this.change(this.bb);
                // this.pagination(this.list,this.length)
              }
               
              
  
            }
          
          }

          if(this.cc!=undefined){
            this.bb=Number(this.cc);
            
          }
          
          
        })


      })

     
     

    })
    }
    bb=1
  change(e){
    this.bb=e;
    if(e==1){
      this.allGoos();
    }else if(e==2){
      this.returnGoods();
    }else if(e==3){
      this.receiveGoods();
    }else if(e==4){
      this.finish();
    }else if(e==5){
      this.cancel();
    }else if(e==6){
      this.waiting();
    }
  }
  // 全部
  allGoos(){
     
    this.pageList = []
    this.length = null
    this.operation = 'A'
    this.isshow = true
    this.getstatus = null;
    this.order_time_dateformat = null
    this.month_time = null
    

    // var others = event.target.parentElement.children
  
    // for(let i=1;i<others.length;i++){
    //   others[i].classList.remove('btn-active')
    // }
    // event.target.classList.add('btn-active')

    this.list = this.list
    this.length = this.list.length
    this.pagination(this.list,this.length)

  }

  // 待发货
  returnGoods(){
   
    this.pageList = []
    this.length = []
    this.operation = 'R'
    this.isshow = false

    // event.target.classList.add('btn-active')
    // var others = event.target.parentElement.children
    // for(let i=2;i<others.length;i++){
    //   others[i].classList.remove('btn-active')
    // }
    // others[0].classList.remove('btn-active')
 
    if(this.list!=null){
      let reGoods = this.list.filter((itme)=>{
        return itme.order_status=='L'
      })

      for(let k=0;k<reGoods.length;k++){
        reGoods[k].index = k
      }
      this.length = reGoods.length
      this.pagination(reGoods,this.length)

    }
    


  }

  // 待收货
  receiveGoods(){
   
    this.pageList = []
    this.operation = 'S'
    this.isshow = false

    // event.target.classList.add('btn-active')
    // var others = event.target.parentElement.children
    // for(let i=3;i<others.length;i++){
    //   others[i].classList.remove('btn-active')
    // }
    // others[0].classList.remove('btn-active')
    // others[1].classList.remove('btn-active')


    if(this.list!=null){
      let reGoods = this.list.filter((itme)=>{
        return itme.order_status=='M'
      })

      for(let k=0;k<reGoods.length;k++){
        reGoods[k].index = k
      }
      this.length = reGoods.length
      this.pagination(reGoods,this.length)

    }

  }

    //已完成
  finish(){
   
    this.pageList = []
    this.operation = 'A'
    this.isshow = false

    // event.target.classList.add('btn-active')
    // var others = event.target.parentElement.children
    // for(let i=4;i<others.length;i++){
    //   others[i].classList.remove('btn-active')
    // }
    // others[0].classList.remove('btn-active')
    // others[1].classList.remove('btn-active')
    // others[2].classList.remove('btn-active')


    if(this.list!=null){
      let reGoods = this.list.filter((itme)=>{
        return itme.order_status=='N'
      })

      for(let k=0;k<reGoods.length;k++){
        reGoods[k].index = k
      }
      this.length = reGoods.length
      this.pagination(reGoods,this.length)

    }

  }

    // 已取消
  cancel(){
    this.pageList = []
    this.operation = 'A'
    this.isshow = false

    // event.target.classList.add('btn-active')
    // var others = event.target.parentElement.children
    // for(let i=0;i<others.length-2;i++){
    //   others[i].classList.remove('btn-active')
    // }
    // others[others.length-1].classList.remove('btn-active')


    if(this.list!=null){
      let reGoods = this.list.filter((itme)=>{
        return itme.order_status=='E'
      })

      for(let k=0;k<reGoods.length;k++){
        reGoods[k].index = k
      }
      this.length = reGoods.length
      this.pagination(reGoods,this.length)

    }

  }

  waiting(){
   
    this.pageList = []
    this.operation = 'W'
    this.isshow = false

    // event.target.classList.add('btn-active')
    // var others = event.target.parentElement.children
    // for(let i=0;i<others.length-1;i++){
    //   others[i].classList.remove('btn-active')
    // }

    

    if(this.list!=null){
      let reGoods = this.list.filter((itme)=>{
        return itme.order_status=='W'
      })

      for(let k=0;k<reGoods.length;k++){
        reGoods[k].index = k
      }
      this.length = reGoods.length
      this.pagination(reGoods,this.length)

    }

  }
  detail(item){
    this.orderApi.editisread({order_id:item.id,enterprise_id:this.enterprise_id,employee_id:this.em_id }).then((ret)=>{
      if(ret){
    this.router.navigate(['order-detail'],{
        queryParams: {
          id: item.id
        }
      })
    }
  })
  }

tiaozhuan(item){
  console.log(item)
  // if(this.em_id==item.employee_id){
    this.orderApi.editisread({order_id:item.id,enterprise_id:this.enterprise_id,employee_id:this.em_id }).then((ret)=>{
      console.log(ret,'改改了')
      if(ret){
        this.router.navigate(['sendGoodsDetail'],{
          queryParams: {
            id: item.id
          }
        })
      }
    })
  // }
  
    
    

  
}

tiaozhuan2(item){
  console.log(item)
  // if(this.em_id==item.employee_id){
  this.orderApi.editisread({order_id:item.id,enterprise_id:this.enterprise_id,employee_id:this.em_id }).then((ret)=>{
    console.log(ret,'改改了')
    if(ret){
      this.router.navigate(['receiveGoodsDetail'],{
        queryParams: {
          id: item.id
        }
      })
    }
  })
// }
 
}

tiaozhuan3(item){
  console.log(item)
  // if(this.em_id==item.employee_id){
  this.orderApi.editisread({order_id:item.id,enterprise_id:this.enterprise_id,employee_id:this.em_id }).then((ret)=>{
    console.log(ret,'改改了')
    if(ret){
      this.router.navigate(['finishDetail'],{
        queryParams: {
          id: item.id
        }
      })
    }
  })
// }
}

tiaozhuan4(item){
  // if(this.em_id==item.employee_id){
  this.orderApi.editisread({order_id:item.id,enterprise_id:this.enterprise_id,employee_id:this.em_id }).then((ret)=>{
    console.log(ret,'改改了')
    if(ret){
      this.router.navigate(['cancelDetail'],{
        queryParams: {
          id: item.id
        }
      })
    }
  })
// }
}

tiaozhuan5(item){
  // if(this.em_id==item.employee_id){
    this.orderApi.editisread({order_id:item.id,enterprise_id:this.enterprise_id,employee_id:this.em_id }).then((ret)=>{
      console.log(ret,'改改了')
      if(ret){
        this.router.navigate(['waiting'],{
          queryParams: {
            id: item.id
          }
        })
      }
    })
  // }
 
  
}


detailStatus(item){
    console.log(item,this.em_id)
  // if(this.em_id==item.employee_id){
    if(item.order_status_name == '待发货'){

      this.tiaozhuan(item);

    }else if(item.order_status_name == '待收货'){

      this.tiaozhuan2(item)

    }else if(item.order_status_name == '已完成'){

      this.tiaozhuan3(item) 

    }else if(item.order_status_name == '已取消'){

      this.tiaozhuan4(item);

    }else if(item.order_status_name == '待付款'){

      this.tiaozhuan5(item);

    }
  // }
 
  

}



pagination(list,length){
  this.pageSize = 10;
  // if()
  this.pages = Math.ceil( length/this.pageSize )
  this.newPage = this.pages > 10 ? 10 : this.pages;
  this.selPage = 1;
  
  this.setData = function(){
    this.data = list.slice(this.pageSize*(this.selPage-1),this.pageSize*this.selPage);
  }
  this.data = list.slice(0, this.pageSize);

  for (var i = 0; i < this.newPage; i++) {
     this.pageList.push(i + 1);
   }

}

selectPage(page) {
    if (page < 1 || page > this.pages) return;
   
    if (page > 2) {
        var newpageList = [];
        for (var i = (page - 3) ; i < ((page + 2) > this.pages ? this.pages : (page + 2)) ; i++) {
            newpageList.push(i + 1);
        }
        this.pageList = newpageList;
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


}
