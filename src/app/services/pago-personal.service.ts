import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from './config';

@Injectable()
export class PagoPersonalService {
    public url: string;
    public headers: HttpHeaders;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Config.apiURL + 'pago-personal';
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    }

    update(model): Observable<any> {
        let params = JSON.stringify(model);
        return this._http.put(`${this.url}/actualizar`, params, {headers: this.headers});
    }

}