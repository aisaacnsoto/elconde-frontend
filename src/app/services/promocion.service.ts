import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promocion } from 'src/app/models/promocion';
import { Config } from './config';

@Injectable()
export class PromocionService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Config.apiURL + 'promociones';
    }

    save(model: Promocion): Observable<any> {
        let params = JSON.stringify(model);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url, params, {headers: headers});
    }

    update(model: Promocion): Observable<any> {
        let params = JSON.stringify(model);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'/'+model.id, params, {headers: headers});
    }

    updatePromoRecom(model): Observable<any> {
        let params = JSON.stringify(model);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'/tipo/recomendaciones', params, {headers: headers});
    }

    updatePromoVip(model): Observable<any> {
        let params = JSON.stringify(model);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'/tipo/cliente-vip', params, {headers: headers});
    }

    updateCumpleanios(model): Observable<any> {
        let params = JSON.stringify(model);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'/tipo/cumpleanios', params, {headers: headers});
    }

    updateTrabajadores(model): Observable<any> {
        let params = JSON.stringify(model);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'/tipo/trabajadores', params, {headers: headers});
    }

    delete(model: Promocion): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url+'/tipo/', {headers: headers});
    }

    getAll(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url, {headers: headers});
    }

    getById(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'/'+id, {headers: headers});
    }

    getEspecificos(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'/tipo/especificos', {headers: headers});
    }
}