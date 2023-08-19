import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { RestService } from './rest-service.interface';
import { Config } from './config';

@Injectable()
export class ProductoService implements RestService {
    public url: string;
    public headers: HttpHeaders;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Config.apiURL + 'productos';
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    }

    save(model: Producto): Observable<any> {
        let params = JSON.stringify(model);
        return this._http.post(this.url, params, {headers: this.headers});
    }

    update(model: Producto): Observable<any> {
        let params = JSON.stringify(model);
        return this._http.put(this.url+'/'+model.id, params, {headers: this.headers});
    }

    delete(id: number): Observable<any> {
        return this._http.delete(this.url+'/'+id, {headers: this.headers});
    }

    getAll(): Observable<any> {
        return this._http.get(this.url, {headers: this.headers});
    }

    getActivos(): Observable<any> {
        return this._http.get(this.url+'/activos/1', {headers: this.headers});
    }

    getById(id): Observable<any> {
        return this._http.get(this.url+'/id/'+id, {headers: this.headers});
    }

    getByCodBar(cod): Observable<any> {
        return this._http.get(this.url+'/'+cod, {headers: this.headers});
    }
}