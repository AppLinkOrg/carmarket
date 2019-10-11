import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../app/api.config'
@Injectable()
export class EnterpriseApi {

    constructor(public http: HttpClient) {

    }


    public employeeinfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'enterprise/employeeinfo';
        var headers = ApiConfig.GetHeader(url, data);
        let options = { headers: headers };
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
                return ApiConfig.ErrorHandle('enterprise/employeeinfo', data, err);
            });
    }


    public employeelogin(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'enterprise/employeelogin';
        var headers = ApiConfig.GetHeader(url, data);
        let options = { headers: headers };
        let body = ApiConfig.ParamUrlencoded(data);
        let loading = null;

        if (showLoadingModal) {
            loading = ApiConfig.GetLoadingModal();
        }

        return this.http.post(url, body, options).toPromise()
            .then((res) => {
                return res;
            })
            .catch(err => {
                console.error(err);
                return ApiConfig.ErrorHandle('enterprise/employeelogin', data, err);
            });
    }

}