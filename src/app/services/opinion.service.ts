import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Opinion } from 'src/app/models/opinion';
import { Config } from './config';

@Injectable()
export class OpinionService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Config.apiURL + 'opiniones';
    }

    save(model: Opinion): Observable<any> {
        let params = JSON.stringify(model);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url, params, {headers: headers});
    }

    update(model: Opinion): Observable<any> {
        let params = JSON.stringify(model);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url+'/'+model.id, params, {headers: headers});
    }

    delete(model: Opinion): Observable<any> {
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