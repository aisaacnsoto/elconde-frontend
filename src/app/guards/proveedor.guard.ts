import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteService } from '../services/cliente.service';
import { ProveedorService } from '../services/proveedor.service';

@Injectable({
	providedIn: 'root'
})
export class ProveedorResolveGuard implements Resolve<any> {
	
	constructor(
		private _proveedor: ProveedorService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this._proveedor.getById(+route.paramMap.get('id'));
	}

}
