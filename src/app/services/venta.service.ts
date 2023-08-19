import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from 'src/app/models/venta';
import { Config } from './config';

@Injectable()
export class VentaService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Config.apiURL + 'ventas';
    }

    save(model: Venta): Observable<any> {
        let params = JSON.stringify(model);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url, params, {headers: headers});
    }

    update(model: Venta): Observable<any> {
        let params = JSON.stringify(model);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'/'+model.id, params, {headers: headers});
    }

    delete(model: Venta): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'/'+model.id, {headers: headers});
    }

    getAll(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url, {headers: headers});
    }

    getById(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        console.log(this.url+'/'+id);
        return this._http.get(this.url+'/'+id, {headers: headers});
    }

    getByDateInterval(from, to): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(`${this.url}/archivo/${from}/${to}`, {headers: headers});
    }
}