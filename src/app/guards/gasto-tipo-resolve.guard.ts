import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { GastoTipoService } from '../services/gasto-tipo.service';

@Injectable({
	providedIn: 'root'
})
export class GastoTipoResolveGuard implements Resolve<any> {
	
	constructor(
		private _gastoTipoService: GastoTipoService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		if (route.paramMap.get('id') != null) {
			let id = route.paramMap.get('id');
			return this._gastoTipoService.getById(id);
		} else {
			return this._gastoTipoService.getAll();
		}
	}

}
