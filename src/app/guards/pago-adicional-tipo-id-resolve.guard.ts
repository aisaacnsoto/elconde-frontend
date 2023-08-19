import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PagoAdicionalTipoService } from '../services/pago-adicional-tipo.service';

@Injectable({
	providedIn: 'root'
})
export class PagoAdicionalTipoIdResolveGuard implements Resolve<any> {
	
	constructor(
		private _pagoService: PagoAdicionalTipoService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		if (route.paramMap.get('id') != undefined) {
			let id = +route.paramMap.get('id');
			return this._pagoService.getById(id);
		} else {
			return this._pagoService.getAll();
		}
	}

}
