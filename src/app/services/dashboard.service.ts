import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asignacion } from 'src/app/models/asignacion';
import { Config } from './config';

@Injectable()
export class DashboardService {

    public url: string;
    public headers: HttpHeaders;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Config.apiURL + 'dashboard';
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    }

    admin(fecha): Observable<any> {
        return this._http.get(`${this.url}/${fecha}`, {headers: this.headers});
    }
    
}