import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita';
import { Config } from './config';
import { RestService } from './rest-service.interface';

@Injectable()
export class CitaService implements RestService {
    public url: string;
    public headers: HttpHeaders;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Config.apiURL + 'citas';
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    }

    save(model: Cita): Observable<any> {
        let params = JSON.stringify(model);
        return this._http.post(this.url, params, { headers: this.headers });
    }

    update(model: Cita): Observable<any> {
        let params = JSON.stringify(model);
        return this._http.put(this.url+'/'+model.id, params, { headers: this.headers });
    }

    updateEstado(model: Cita): Observable<any> {
        let params = JSON.stringify(model);
        return this._http.put(this.url+'/update-estado/'+model.id, params, { headers: this.headers });
    }

    delete(id: number): Observable<any> {
        return this._http.delete(this.url+'/'+id, { headers: this.headers });
    }

    getAll(): Observable<any> {
        return this._http.get(this.url, { headers: this.headers });
    }

    getById(id): Observable<any> {
        return this._http.get(this.url+'/'+id, { headers: this.headers });
    }

    reprogram(id, from, to): Observable<any> {
        return this._http.get(`${this.url}/repro/${id}/${from}/${to}`, { headers: this.headers });
    }
}