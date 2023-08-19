import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteService } from '../services/cliente.service';

@Injectable({
	providedIn: 'root'
})
export class ClienteResolveGuard implements Resolve<any> {
	
	constructor(
		private _clienteService: ClienteService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this._clienteService.getById(+route.paramMap.get('id'));
	}

}
