import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PagoAdicionalService } from '../services/pago-adicional.service';

@Injectable({
	providedIn: 'root'
})
export class PagoAdicionalResolveGuard implements Resolve<any> {
	
	constructor(
		private _pagoService: PagoAdicionalService
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		if (route.paramMap.get('id')) {
			let id = +route.paramMap.get('id');
			return this._pagoService.getById(id);
		} else {
			return this._pagoService.getAll();
		}
	}

}
