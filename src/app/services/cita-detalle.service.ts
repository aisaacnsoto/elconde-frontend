import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CitaDetalle } from '../models/cita-detalle';
import { Config } from './config';

@Injectable()
export class CitaDetalleService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Config.apiURL + 'citas-detalle';
    }

    save(model: CitaDetalle): Observable<any> {
        let params = JSON.stringify(model);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url, params, {headers: headers});
    }

    update(model: CitaDetalle): Observable<any> {
        let params = JSON.stringify(model);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'/'+model.id, params, {headers: headers});
    }

    delete(model: CitaDetalle): Observable<any> {
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
}