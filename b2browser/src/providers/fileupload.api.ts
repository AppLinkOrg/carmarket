import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../app/api.config'
@Injectable()
export class FileuploadApi {

    constructor(public http: HttpClient) {

    }



    public upload(module,file) {


        var formData: FormData = new FormData();
        formData.append("img", file);


        var url = ApiConfig.getFileUploadAPI()+"?field=img&module="+module;
        var headers = ApiConfig.GetHeader(url, {});
        let options = { headers: headers };
        console.log(headers);
        let body = formData;



        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
            });
    }


}
