import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UnidadMedidaService } from '../services/unidad-medida.service';

@Injectable({
	providedIn: 'root'
})
export class UnidadMedidaResolveGuard implements Resolve<any> {
	
	constructor(
		private _UnidadMedidaService: UnidadMedidaService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this._UnidadMedidaService.getAll();
		// let id = route.paramMap.get('id');
		// if (id != null) {
		// 	return this._UnidadMedidaService.getById(+id);
		// } else {
		// }
	}

}
