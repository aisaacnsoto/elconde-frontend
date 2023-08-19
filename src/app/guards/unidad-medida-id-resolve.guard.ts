import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UnidadMedidaService } from '../services/unidad-medida.service';

@Injectable({
	providedIn: 'root'
})
export class UnidadMedidaIDResolveGuard implements Resolve<any> {
	
	constructor(
		private _UnidadMedidaService: UnidadMedidaService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this._UnidadMedidaService.getById(+route.paramMap.get('id'));
		// let id = ;
		// if (id != null) {
		// } else {
		// }
	}

}
