import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CompraService } from '../services/compra.service';

@Injectable({
	providedIn: 'root'
})
export class CompraResolveGuard implements Resolve<any> {

	constructor(
		private _compraService: CompraService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>  {
		return this._compraService.getById(+route.paramMap.get('id'));
	}

}
