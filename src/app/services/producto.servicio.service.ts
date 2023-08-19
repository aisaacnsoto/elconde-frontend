import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from './config';

@Injectable()
export class ProductoServicioService {
    public url: string;
    public headers: HttpHeaders;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Config.apiURL + 'productos-servicios';
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    }

    getAll(): Observable<any> {
        return this._http.get(this.url, {headers: this.headers});
    }

}