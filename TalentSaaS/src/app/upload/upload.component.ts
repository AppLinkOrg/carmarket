import { Component, OnInit,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { EnterpriseApi } from 'src/providers/enterprise.api';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { UploadFile } from 'ng-zorro-antd/upload';
import { ApiConfig } from '../api.config';
function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent extends AppBase {
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
  onMyShow() {
    
  }
  filelist=[];
  afterupload(e){
    //https://ng.ant.design/docs/getting-started/zh
    if(e.type=="success"){
      this.filelist.push(e.file.response.result);
    }
  }
  fileList = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error'
    }
  ];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    if(!file.id){
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        var url=ApiConfig.getUploadPath()+'order/'+file.response.result;
         window.open(url,'new','')
        return;
      }else {
        this.previewImage = file.url || file.preview;
        this.previewVisible = true;
      }
    }else {
      if(file.img.indexOf('jpeg')>-1 || file.img.indexOf('png')>-1 || file.img.indexOf('jpg')>-1){
        this.previewImage = file.url || file.preview;
        this.previewVisible = true;
      }else {
        var url=ApiConfig.getUploadPath()+'order/'+file.img;
        window.open(url,'new','')
      }
    
    }
    
  };
}
