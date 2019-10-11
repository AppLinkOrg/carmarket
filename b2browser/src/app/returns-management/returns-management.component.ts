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
    super(router,activeRoute,instApi);
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

  onMyShow(){

    var a = this.orderApi


    this.activeRoute.queryParams.subscribe(query=>{
      console.log(query)
     
      this.status = query.status
      console.log(this.status)
      this.pageList = []
      this.returnlist = []

      this.enterpriseApi.employeeinfo({ }).then((employeeinfo:any)=>{
        console.log(employeeinfo)
        this.enterprise_id = employeeinfo.enterprise_id
        
        // if(employeeinfo.power == 'Y'){
        //   console.log('aaa')
        //   this.employee_id = ''
        // }else{
        //   console.log('bb')
        //   this.employee_id = employeeinfo.id
        // }

        if(this.status != undefined){
          this.pageList = []
          this.returnlist = []

          a.mylist({ enterprise_id: this.enterprise_id,employee_id:this.employee_id, order_status: this.status }).then((returnlist:any)=>{

            this.pageList = []
            this.returnlist = []
      
            console.log(returnlist)
            this.returnlist = returnlist
            this.length = this.returnlist.length

            for(let i=0;i<this.returnlist.length;i++){
              this.returnlist[i].index = i
            }

            for(let j=0;j<this.returnlist.length;j++){
              this.returnlist[j].index = j
            }

            this.pagination(this.returnlist,this.length)
            console.log(this.returnlist)
          })

        }else {

          this.pageList = []
          this.returnlist = []


          a.mylist({ enterprise_id: this.enterprise_id, employee_id:this.employee_id,}).then((returnlist:any)=>{
            this.pageList = []
            this.returnlist = []

            console.log(returnlist,'sss')

            for(let i=0;i<returnlist.length;i++){
              if(returnlist[i].order_status == 'R' || returnlist[i].order_status=='Y'){
                this.returnlist.push(returnlist[i])
              }
            }

            for(let j=0;j<this.returnlist.length;j++){
              this.returnlist[j].index = j
            }
      
            this.length = this.returnlist.length
            this.pagination(this.returnlist,this.length)
            console.log(this.returnlist)
          })
    
        }
      
     })
      
    })

    
    
    
  }

  allGoods(event){
    this.pageList = []
    this.length = null
    this.isshow = true
    
    event.target.classList.add('btn-active')
    event.target.parentElement.childNodes[1].classList.remove('btn-active')
    event.target.parentElement.childNodes[2].classList.remove('btn-active')
    this.onMyShow()

    this.returnlist = this.returnlist
    this.length = this.returnlist.length
    this.pagination(this.returnlist,this.length)

  }

  returnGoods(event){
    this.pageList = []
    this.length = null
    this.isshow = false
   
    event.target.classList.add('btn-active')
    event.target.parentElement.childNodes[0].classList.remove('btn-active')
    event.target.parentElement.childNodes[2].classList.remove('btn-active')
    
    if(this.returnlist !=null ){
      let relist = this.returnlist.filter(item=>{
        return item.order_status == 'R'
      })

      for(let k=0;k<relist.length;k++){
        relist[k].index = k
      }
      this.length = relist.length
      this.pagination(relist,this.length)

    }
   
  }

  yiGoods(event){
    this.pageList = []
    this.length = null

    this.isshow = false
 
    event.target.classList.add('btn-active')
    event.target.parentElement.childNodes[0].classList.remove('btn-active')
    event.target.parentElement.childNodes[1].classList.remove('btn-active')


    if(this.returnlist !=null ){
      let relist = this.returnlist.filter(item=>{
        return item.order_status == 'Y'
      })

      for(let k=0;k<relist.length;k++){
        relist[k].index = k
      }
      this.length = relist.length
      this.pagination(relist,this.length)

    }

  }

  tiaozhuan(item){
    this.router.navigate(['returnsDetail'],{
      queryParams: {
        id: item.orderno
      }
    })
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
