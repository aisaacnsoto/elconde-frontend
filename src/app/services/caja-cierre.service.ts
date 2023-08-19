import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CajaCierre } from '../models/caja-cierre';
import { Config } from './config';

@Injectable()
export class CajaCierreService {
    public url: string;
    public headers: HttpHeaders;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Config.apiURL + 'caja-cierres';
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    }

    save(model: CajaCierre): Observable<any> {
        let params = JSON.stringify(model);
        return this._http.post(this.url, params, {headers: this.headers});
    }

    getByDate(date): Observable<any> {
        return this._http.get(this.url+'/'+date, {headers: this.headers});
    }
}