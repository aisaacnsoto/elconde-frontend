import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from './config';

@Injectable()
export class GlobalService {
    public url: string;
    public headers: HttpHeaders;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Config.apiURL + 'global';
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    }

    getComision(): Observable<any> {
        return this._http.get(`${this.url}/comision`, {headers: this.headers});
    }

    updateComision(comision): Observable<any> {
        let model = {comision: +comision};
        let params = JSON.stringify(model);
        return this._http.put(`${this.url}/comision`, params, {headers: this.headers});
    }

}