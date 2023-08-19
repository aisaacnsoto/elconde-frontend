import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Config } from './config';
import { RestService } from './rest-service.interface';

@Injectable()
export class UsuarioService implements RestService {

	public url: string;
	public headers: HttpHeaders;
	public keyStorage: string;

	constructor(
		private _http: HttpClient
	) {
		this.url = Config.apiURL + 'usuarios';
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
		this.keyStorage = 'identity';
	}

    save(model: Usuario): Observable<any> {
        let params = JSON.stringify(model);
        return this._http.post(this.url, params, {headers: this.headers});
    }

    update(model: Usuario): Observable<any> {
        let params = JSON.stringify(model);
        return this._http.put(this.url+'/'+model.id, params, {headers: this.headers});
    }

    updateAdmin(model: Usuario): Observable<any> {
        let params = JSON.stringify(model);
        return this._http.put(this.url+'/admin/update', params, {headers: this.headers});
    }

    delete(id: number): Observable<any> {
        return this._http.delete(this.url+'/'+id, {headers: this.headers});
    }

    getAll(): Observable<any> {
        return this._http.get(this.url, {headers: this.headers});
    }

    getCajeros(): Observable<any> {
        return this._http.get(`${this.url}/cajeros/activos`, {headers: this.headers});
    }

    getById(id): Observable<any> {
        return this._http.get(this.url+'/'+id, {headers: this.headers});
    }

    login(user): Observable<any> {
		let params = JSON.stringify(user);
        return this._http.post(Config.apiURL + 'login', params, {headers: this.headers});
	}
	
	saveStorage(user: object): void {
		localStorage.setItem(this.keyStorage, JSON.stringify(user));
	}
	
	getStorage(): object {
		let user = localStorage.getItem(this.keyStorage);
		return user != null && user != 'undefined' ? JSON.parse(user) : null;
	}
	
	removeStorage(): void {
		localStorage.removeItem(this.keyStorage);
	}
}
