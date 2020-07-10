import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConfig } from '../app/api.config'
@Injectable()
export class EnterpriseApi {

    constructor(public http: HttpClient) {

    }


    public addtixian(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'enterprise/addtixian';
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
                return ApiConfig.ErrorHandle('enterprise/addtixian', data, err);
            });
    }


    public allenterprise(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'enterprise/allenterprise';
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
                return ApiConfig.ErrorHandle('enterprise/allenterprise', data, err);
            });
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


    public enterpriseinfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'enterprise/enterpriseinfo';
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
                return ApiConfig.ErrorHandle('enterprise/enterpriseinfo', data, err);
            });
    }


    public getemployeeinfo(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'enterprise/getemployeeinfo';
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
                return ApiConfig.ErrorHandle('enterprise/getemployeeinfo', data, err);
            });
    }


    public updatepower(data, showLoadingModal: boolean = true) {
        var url = ApiConfig.getApiUrl() + 'enterprise/updatepower';
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
                return ApiConfig.ErrorHandle('enterprise/updatepower', data, err);
            });
    }

}
