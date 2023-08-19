import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kardex } from 'src/app/models/kardex';
import { Config } from './config';

@Injectable()
export class KardexService {

    public url: string;
    private headers: HttpHeaders;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Config.apiURL + 'kardex';
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    }

    save(model: Kardex): Observable<any> {
        let params = JSON.stringify(model);
        return this._http.post(this.url, params, { headers: this.headers });
    }

    update(model: Kardex): Observable<any> {
        let params = JSON.stringify(model);
        return this._http.put(this.url+'/'+model.id, params, { headers: this.headers });
    }

    delete(model: Kardex): Observable<any> {
        return this._http.delete(this.url+'/'+model.id, { headers: this.headers });
    }

    getAll(): Observable<any> {
        return this._http.get(this.url, { headers: this.headers });
    }

    getByProducto(producto): Observable<any> {
        return this._http.get( `${this.url}/${producto}`, { headers: this.headers } );
    }
}