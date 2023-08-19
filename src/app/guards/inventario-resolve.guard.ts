import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { InventarioService } from '../services/inventario.service';

@Injectable({
	providedIn: 'root'
})
export class InventarioResolveGuard implements Resolve<any> {

	constructor(
		private _inventarioService: InventarioService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
		return this._inventarioService.getById(+route.paramMap.get('id'));
	}

}
