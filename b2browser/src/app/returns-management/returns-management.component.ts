import { Component, OnInit } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { InstApi } from 'src/providers/inst.api';
import { OrderApi } from 'src/providers/order.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';

@Component({
  selector: 'app-returns-management',
  templateUrl: './returns-management.component.html',
  styleUrls: ['./returns-management.component.scss'],
  providers:[InstApi,OrderApi,EnterpriseApi]
})
export class ReturnsManagementComponent extends AppBase  {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public orderApi:OrderApi,
    public enterpriseApi:EnterpriseApi,
  ) { 
    super(router,activeRoute,instApi,orderApi,enterpriseApi);
  }

  returnlist = []

  length = null;

  pageSize = null;
  pages = null;
  newPage = null;
  pageList = [];
  selPage = 1;
  data = [];
  setData = null;

  isshow=true

  status = ''

  enterprise_id = ''
  employee_id=''
  em_id="";
  emm_id='';
  cc='';

  alllen=0;
  daituilen=0;
  yituilen=0;
  tuizhonglen=0;
  order_time_dateformat='';
  onMyLoad(){
    this.params;
    if(this.params.bb!=undefined){
      this.bb=this.params.bb;
    }
  }
  onMyShow(){
    let oldtime = (new Date()).getTime() +  6*60*60*1000;
    window.localStorage.setItem('oldtime',oldtime.toString())
    var a = this.orderApi


    this.activeRoute.queryParams.subscribe(query=>{
      console.log(query)
      this.emm_id = query.emm_id
      this.status = query.status;
      this.order_time_dateformat=query.order_time_dateformat;
      this.cc=query.bb;
      console.log(this.status)
      this.pageList = []
      this.returnlist = []

      this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{
        console.log(employeeinfo)
        this.enterprise_id = employeeinfo.enterprise_id
        this.em_id = employeeinfo.id
        
        if( employeeinfo.position=='B' || employeeinfo.power=='Y'){
          console.log('aaa')
          this.employee_id = ''
        }else{
          console.log('bb')
          this.employee_id = employeeinfo.id
        }
        this.alllen=0;
        this.daituilen=0;
        this.yituilen=0;
        this.tuizhonglen=0;
        if( this.order_time_dateformat != undefined){
          this.pageList = []
          this.returnlist = []

          a.returnlist({ gongsi: this.enterprise_id,baojia:this.employee_id }).then((returnlist:any)=>{
            
            this.pageList = []
            this.returnlist = []

            console.log(returnlist)
            // this.returnlist = returnlist
            // this.length = this.returnlist.length

            for(let i=0;i<returnlist.length;i++){
              if(this.order_time_dateformat==returnlist[i].return_time_dateformat){
                returnlist[i].index = i
               
                if(returnlist[i].orderstatus=='Y'){
                  this.yituilen++;
                }
                if(returnlist[i].orderstatus=='R'){
                  this.daituilen++;
                }
                if(returnlist[i].orderstatus=='I'){
                  this.tuizhonglen++;
                }
                this.returnlist.push(returnlist[i]);
              }
              
              
              
            }

            // for(let j=0;j<this.returnlist.length;j++){
            //   this.returnlist[j].index = j
            // }
            this.alllen=this.returnlist.length;
            this.length = this.returnlist.length
            this.pagination(this.returnlist,this.length)
            console.log(this.returnlist);
            if(this.cc!=undefined){
              this.bb = Number(this.cc);
              this.change(this.bb)
            }

          })

        }else {

          this.pageList = []
          this.returnlist = []


          a.returnlist({ gongsi: this.enterprise_id, baojia:this.employee_id,}).then((returnlist:any)=>{
            this.pageList = []
            this.returnlist = returnlist
            
            console.log(returnlist,'sss')

            // for(let i=0;i<returnlist.length;i++){
            //   if(returnlist[i].order_status == 'R' || returnlist[i].order_status=='Y'){
            //     this.returnlist.push(returnlist[i])
            //   }
            // }

            for(let j=0;j<this.returnlist.length;j++){
              this.alllen++;
              this.returnlist[j].index = j;
              if(this.returnlist[j].orderstatus=='Y'){
                this.yituilen++;
              }
              if(this.returnlist[j].orderstatus=='R'){
                this.daituilen++;
              }
              if(this.returnlist[j].orderstatus=='I'){
                this.tuizhonglen++;
              }
            }
      
            this.length = this.returnlist.length
            this.pagination(this.returnlist,this.length)
            console.log(this.returnlist)
          })
    
        }
      
     })
      
    })

    
    
    
  }

bb=1;
  change(e){
    this.bb=e;
    if(e==1){
      this.allGoods();
    }else if(e==2){
      this.returnGoods();
    }else if(e==3){
      this.reingGoods();
    }else if(e==4){
      this.yiGoods();
    }
  }

  allGoods(){
    this.pageList = []
    this.length = null
    this.isshow = true
    
    // event.target.classList.add('btn-active')
    
    // var others =  event.target.parentElement.childNodes
    // for(let j=0;j<others.length;j++){
    //   if(others[j] != event.target){
    //     others[j].classList.remove('btn-active')
    //   }
    // }

    // this.onMyShow()

    this.returnlist = this.returnlist
    this.length = this.returnlist.length
    this.pagination(this.returnlist,this.length)

  }

  returnGoods(){
    this.pageList = []
    this.length = null
    this.isshow = false
   
    // event.target.classList.add('btn-active')
    // var others =  event.target.parentElement.childNodes
    // for(let j=0;j<others.length;j++){
    //   if(others[j] != event.target){
    //     others[j].classList.remove('btn-active')
    //   }
    // }
    
    if(this.returnlist !=null ){
      let relist = this.returnlist.filter(item=>{
        return item.orderstatus == 'R'
      })

      for(let k=0;k<relist.length;k++){
        relist[k].index = k
      }
      this.length = relist.length
      this.pagination(relist,this.length)

    }
   
  }

  reingGoods(){
    this.pageList = []
    this.length = null

    this.isshow = false

    // e.target.classList.add('btn-active')
    // var others =  e.target.parentElement.childNodes
    // for(let j=0;j<others.length;j++){
    //   if(others[j] != e.target){
    //     others[j].classList.remove('btn-active')
    //   }
    // }

    if(this.returnlist !=null ){
      let relist = this.returnlist.filter(item=>{
        return item.orderstatus == 'I'
      })

      for(let k=0;k<relist.length;k++){
        relist[k].index = k
      }
      this.length = relist.length
      this.pagination(relist,this.length)

    }


  }

  yiGoods(){
    this.pageList = []
    this.length = null

    this.isshow = false
 
    // event.target.classList.add('btn-active')
    // var others =  event.target.parentElement.childNodes
    // for(let j=0;j<others.length;j++){
    //   if(others[j] != event.target){
    //     others[j].classList.remove('btn-active')
    //   }
    // }


    if(this.returnlist !=null ){
      let relist = this.returnlist.filter(item=>{
        return item.orderstatus == 'Y'
      })

      for(let k=0;k<relist.length;k++){
        relist[k].index = k
      }
      this.length = relist.length
      this.pagination(relist,this.length)

    }

  }

  tiaozhuan(item){
    // if(this.em_id==item.baojia){
    this.orderApi.editisread({return_id:item.id,enterprise_id:this.enterprise_id,employee_id:this.em_id }).then((ret)=>{
      console.log(ret,'改改了')
      if(ret){
        this.router.navigate(['returnsDetail'],{
          queryParams: {
            id:item.id,
            bb:this.bb
          }
        })
      }
    })
  }
  // }

  
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
  }

  Next () {
    this.selectPage(this.selPage + 1);
  }

  fristPage(){
    this.selectPage(this.selPage = 1)
  }

  lastPage(){
    this.selectPage(this.selPage = this.pages)
  }

}
