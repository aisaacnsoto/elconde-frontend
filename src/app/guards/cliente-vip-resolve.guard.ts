import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteVIPService } from '../services/cliente-vip.service';
import { ClienteService } from '../services/cliente.service';

@Injectable({
	providedIn: 'root'
})
export class ClienteVIPResolveGuard implements Resolve<any> {
	
	constructor(
		private _clienteVIPService: ClienteVIPService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this._clienteVIPService.getById(+route.paramMap.get('id'));
	}

}
