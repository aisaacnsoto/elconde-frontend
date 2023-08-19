import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from './config';
import { RestService } from './rest-service.interface';
import { ProductoPresentacion } from '../models/producto-presentacion';

@Injectable()
export class ProductoPresentacionService implements RestService {
    public url: string;
    public headers: HttpHeaders;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Config.apiURL + 'productos-presentaciones';
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    }

    getAll(): Observable<any> {
        throw new Error("Method not implemented.");
    }

    getById(id: number): Observable<any> {
        throw new Error("Method not implemented.");
    }

    save(model: ProductoPresentacion): Observable<any> {
        let params = JSON.stringify(model);
        return this._http.post(this.url, params, { headers: this.headers });
    }

    update(model: ProductoPresentacion): Observable<any> {
        let params = JSON.stringify(model);
        return this._http.put(this.url+'/'+model.id, params, {headers: this.headers});
    }
    
    delete(id: number): Observable<any> {
        return this._http.delete(this.url+'/'+id, {headers: this.headers});
    }

    getByProducto(id: number): Observable<any> {
        return this._http.get(`${this.url}/${id}`, { headers: this.headers });
    }

    getProductosAsignaciones(): Observable<any> {
        return this._http.get(`${this.url}/asignaciones/medidas`, { headers: this.headers });
    }

}